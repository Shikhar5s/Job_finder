import React, { useState } from 'react'
import { assets, jobsApplied } from '../assets/assets'
import { Navbar } from '../components/Navbar'
import moment from 'moment'

export const Applications = () => {
  const[isEdit,setIsEdit]=useState(false)
   const[resume,setResume]=useState(null)

  return (
    <>
    <Navbar></Navbar>
    <div className='container px-4 min-h-[65vh] 2xl:px-20'>
      <h2 className='text-xl font-semibold'>Your Resume</h2>
      <div className='flex gap-2 mb-6 mt-3'>
        {
          isEdit?
          <>
          <label className='flex items-center' htmlFor="resumeUpload">
            <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>
              Select Resume
            </p>
            <input id='resumeUpload' onChange={(e)=>setResume(e.target.files)} accept='application/pdf' type="file" />
            <img src={assets.profile_upload_icon} alt="" />
          </label>
          <button onClick={(e)=>setIsEdit(false)} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>Save</button>
          </>
    /**is edit is false */
          :<div className='flex gap-2'>
            <a  className='bg-blue-100 text-blue-600'  href="">
              Resume
            </a>
          <button onClick={()=>setIsEdit(true)} className='text-gray-500 border border'>
            Edit
          </button>
            </div>

        }

      </div>
      <h2>Job Applied</h2>
      <table className='min-w-full bg-white border rounded-lg'>
        <thead>
          <tr>
            <th className='py-3 px-4 border-b text-left'>Company</th>
            <th className='py-3 px-4 border-b text-left'>Job title</th>
            <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
            <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
            <th className='py-3 px-4 border-b text-left'>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobsApplied.map((job)=>true?(
            <tr>
              <td className='py-3 px-4 flex items-center gap-2 border-b'>
                <img className='w-8 h-8' src={job.logo} alt="" />
                {job.company}
              </td>
              <td className='py-2 px-4 border-b'>{job.title}</td>
              <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
              <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('11')}</td>
              <td className='py-2 px-4 border-b'>
                <span className={`${job.status==='Accepted'? 'bg-green-100':job.status==='Rejected'?'bg-red-100':'bg-blue-100'} px-4 py-1.5 rounded`}>{job.status}</span></td>
            </tr>
          ):(null))}
        </tbody>
      </table>
    </div>
    </>
  )
}
