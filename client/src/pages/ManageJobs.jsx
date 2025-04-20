import React from 'react'
import { jobsApplied, manageJobsData } from '../assets/assets'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
export const ManageJobs=() => {
  const navigate=useNavigate();

  return (
    <div className='container p-4 max-w-5xl'>
      <div className='overflow-x-auto'>
        <table>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 border-b text-left'>Job title</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 border-b text-left'>Applicants</th>
              <th className='py-2 px-4 border-b text-left'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job,index)=>(
                 <tr key={index} className='text-gray-700'>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{index+1}</td>
                  <td className='py-2 px-4 border-b'>{job.title}</td>
                  <td className='py-2 px-4 border-b'>{moment(job.date).format('11')}</td>
                  <td className='py-2 px-4 border-b'>{job.location}</td>
                  <td className='py-2 px-4 border-b text-center'>{job.applicants}</td>
                  <td  className='py-2 px-4 border-b'>
                  <input type="checkbox" className='scale-125 ml-4' /></td>

                 </tr> 
            ))}
          </tbody>
        </table>
     <div className='mt-4 flex justify-end'>
      <button className='bg-black text-white py-2 px-4 rounded cursor-pointer' onClick={()=>navigate('/dashboard/add-job')}>Add new job</button>
    </div>
    </div>
    </div>
  )
}
