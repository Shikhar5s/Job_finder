import express from 'express'

import { getJobById, getJobs } from '../controllers/jobController.js'

const router=express.Router()

// route to get all jobs

router.get('/',getJobs)

router.get('/:id',getJobById)









export default router