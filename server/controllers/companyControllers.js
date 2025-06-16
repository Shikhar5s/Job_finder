

// Registetr a new company
import Company from "../models/Company.js";

import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'

import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js"

export const registerCompany=async(req,res)=>{
  console.log("Hello")

const {name,email,password}=req.body

const imageFile=req.file;

if(!name || !email || !password || !imageFile){

    return res.json({success:false,message:"Missing details"})


}

try{
    const companyExists=await Company.findOne({email})

    if(companyExists){

        return res.json({success:false,message:"company already registered"})
    }
    const salt=await bcrypt.genSalt(10);
  const hashPassword=await bcrypt.hash(password,salt)

  const imageUpload=await cloudinary.uploader.upload(imageFile.path)

  const company=await Company.create({
    name,
    email,
    image:imageUpload.secure_url,
    password:hashPassword,

  })
res.json({
    success:true,
    company:{
        _id:company._id,
        name:company.name,

        email:company.email,
    
        image:company.image
    },
    token:generateToken(company._id)

})
 
}
catch(error){
    res.json({
        success:'false',
        message:error.message
    })

}
}


//LOGIN 
export const loginCompany = async (req, res) => {
  try {
    console.log("Incoming login body:", req.body); // 🐞 Debug this

    const { email, password } = req.body || {}; //


    const company = await Company.findOne({ email });
    if (!company) {
      return res.json({ success: false, message: "Company not found" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    return res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
// get company data
  
export const getCompanyData=async(req,res)=>{

  const company=req.company
  try{

    res.json({success:true,company})

  }
  catch(error){

    res.json({
      success:false,
      message:error.message
    })
  }

}


export const postJob=async(req,res)=>{

  const {title, description,location,salary,level,category}=req.body

   const companyId=req.company._id;

   try{
      const newJob=new Job({
      title,
      description,
      location,
      salary,
      level,
      category,
      companyId, 
      visible: true,
      date: new Date().toISOString() 
      })
      await newJob.save()

      res.json({
        success:true,
         message: "Job posted successfully!",
        newJob
      })
   }
catch(error){
  res.json({
    success:false,
    message:error.message
})

}
}

export const getCompanyPostedJobs=async(req,res)=>{
  
try{
  console.log(req.company);
   const companyId=req.company._id;

   const jobs=await Job.find({companyId})


   //Adding applicant

   const jobsData=await Promise.all(jobs.map(async(job)=>{

    const applicants=await JobApplication.find({jobId:job._id});
    return {...job.toObject(),applicants:applicants.length}
   }));

   
  
   res.json({
    success:true,
    jobsData
   })


}
catch(err){
  res.json({
    success:false,
    message:err.message || "Server error"
  });
}

}





export const changeJobApplicantsStatus=async(req,res)=>{

  





}


export const changeVisibility=async(req,res)=>{

  try{

    const {id}=req.body;
    const companyId=req.company._id
  

    const job=await Job.findById(id)

    if(companyId.toString()==job.companyId.toString()){

      job.visible=!job.visible
    }
    await job.save()
    res.json({
      success:true,
      job
    })
  }
    catch(err){

      res.json({
        success:false,
        message:err.message
      })
    }




}