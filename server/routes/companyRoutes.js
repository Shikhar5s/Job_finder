
import express from 'express'
import { changeJobApplicantsStatus,registerCompany, getCompanyData,getCompanyPostedJobs, loginCompany,postJob,changeVisibility } from '../controllers/companyControllers.js'
import upload from '../config/multer.js'; // make sure the path is correct
import { protectCompany } from '../middlewares/authmiddleware.js';

const router=express.Router();


router.post('/register',upload.single('image'),registerCompany)


router.post('/login',loginCompany)

router.get('/company',protectCompany,getCompanyData)

router.post("/post-job",protectCompany,postJob)


//router.get('/applicants',protectCompany,getCompanyJobApplicants)

router.get('/list-job',protectCompany,getCompanyPostedJobs)


router.post('/change-status',protectCompany,changeJobApplicantsStatus)

router.post('/change-visiblity',protectCompany,changeVisibility)


export default router;