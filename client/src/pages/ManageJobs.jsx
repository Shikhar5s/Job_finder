import React, { useContext, useEffect } from 'react'
import { jobsApplied, manageJobsData } from '../assets/assets'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
export const ManageJobs=() => {
  const navigate=useNavigate();

  const [jobs,setJobs]=useState([])

  // function to fetch company job application data


  const{companyToken}=useContext(AppContext)

  const fetchCompanyJobs=async()=>{

    try{

      const {data}=await axios.get('http://localhost:5000/api/company/list-job'
    
    ,{
        headers:{token:companyToken}
      })
      if(data.success){
        setJobs(data.jobsData.reverse())
        console.log(data.jobsData)
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.message)
    }


  }
  
  // function to change job visibility

  const changeJobVisiblity=async(id)=>{
      
   try{
    

    const {data} =await axios.post("http://localhost:5000/api/company/change-visiblity",
      {id
       },{ headers:{token:companyToken}
      
       })

       if(data.success){
        toast.success(data.message);
        fetchCompanyJobs();
       }else{
        toast.error(data.message)
       }
  

   }
   catch(error){
    toast.error(error.message)
   }
  }

  useEffect(()=>{

   if(companyToken){
    fetchCompanyJobs()
   }

  },[companyToken])

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
            {jobs.map((job,index)=>(
                 <tr key={index} className='text-gray-700'>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{index+1}</td>
                  <td className='py-2 px-4 border-b'>{job.title}</td>
                  <td className='py-2 px-4 border-b'>{moment(job.date).format('LL')}</td>
                  <td className='py-2 px-4 border-b'>{job.location}</td>
                  <td className='py-2 px-4 border-b text-center'>{job.applicants}</td>
                  <td  className='py-2 px-4 border-b'>
                  <input type="checkbox" onChange={()=>changeJobVisiblity(job._id)} className='scale-125 ml-4' checked={job.visible} /></td>

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
