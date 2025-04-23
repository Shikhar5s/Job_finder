

// Registetr a new company


export const registerCompany=async(req,res)=>{

const {name,email,password}=req.body

const imageFile=req.file;

if(!name || !email || !password || !imageFile){

    return res.json({success:false,message:"Missing details"})


}

try{
    const companyExists=await Company.findOne({email})

    if(companyExists){

        return res.json({succes:false,message:"company already registered"})
    }
  const salt=await bcrypt.hash(password,salt)

  const imageUpload=await cloudinary.uploader.upload(imageFile)

  const company=await ompan


}
catch(err){

}
}

// company login

export const loginCompany=async(req,res)=>{



}

// get company data

export const getCompanyData=async(req,res)=>{





}


export const postJob=async(req,res)=>{





}
export const getCompanyJobApplicants=async(req,res)=>{





}
export const changeJobApplicantsStatus=async(req,res)=>{





}

export const changeVisibility=async(req,res)=>{



}