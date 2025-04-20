
import express from 'express'
import { changeJobApplicantsStatus, getCompanyData, getCompanyJobApplicants, loginCompany } from '../controllers/companyControllers'


const router=express.Router()


router.post('/register',upload.single(),registerCompany)


router.post('/login',loginCompany)

router.get('/company',getCompanyData)

router.post("/post-job",postJob)


router.get('/applicants',getCompanyJobApplicants)

router.get('/list-job',getCompanyPostedJobs)


router.post('/change-status',changeJobApplicantsStatus)


router.post('/change-visiblity',changeVisiblity)


export default Router