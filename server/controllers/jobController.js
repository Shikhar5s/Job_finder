import Job from "../models/Job.js"
export const getJobs=async()=>{

try{
    const jobs=await Job.find({visible:true})

    .populate({path:'companyId',select:'-password'})

    res.json({success:true,jobs})
}
catch(err){
    res.json({
        success:false,
        message:err.message
    })


}
}

export const getJobById=async(req,res)=>{
try{
    const {id}=req.params.id;
const job=await Job.FindById(id);

populate({
    path:'companyId',
    select:'-password'
})
if(!job){

    return res.json({
        success:false,
        message:'not found'
    })

}
res.json({
    success:true,
})
}
catch(err){

    res.json({
        success:false,
        message:message.err
    
    })



}


}