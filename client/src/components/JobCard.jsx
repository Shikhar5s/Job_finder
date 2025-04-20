import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  
  return (
    <div className='border p-6 shadow-lg rounded-2xl bg-white hover:shadow-2xl transition-shadow duration-300'>
      <div className='flex justify-between items-center'>
        <img className='h-8' src={assets.company_icon} alt="Company Logo" />
      </div>
      
      {/* Job Title */}
      <h4 className='text-gray-800 font-semibold text-xl mt-2'>{job.title}</h4>
      
      {/* Job Tags */}
      <div className='flex items-center gap-3 mt-2 text-xs font-medium'>
        <span className='bg-blue-100 text-blue-700 border border-blue-300 px-4 py-1.5 rounded-md shadow-sm'>
          {job.location}
        </span>
        <span className='bg-red-100 text-red-700 border border-red-300 px-4 py-1.5 rounded-md shadow-sm'>
          {job.level}
        </span>
      </div>
      
      {/* Job Description */}
      <p className='text-gray-600 text-sm mt-4 leading-relaxed' 
         dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}></p>
      
      {/* Buttons */}
      <div className='mt-4 flex gap-4 text-sm'>
        <button 
          onClick={() => { navigate(`/apply-job/${job._id}`); scroll(0,0) }} 
          className='bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-md'
        >
          Apply now
        </button>
        <button 
          onClick={() => { navigate(`/apply-job/${job._id}`); scroll(0,0) }} 
          className='text-gray-700 border border-gray-400 rounded-lg px-5 py-2 font-medium hover:bg-gray-200 transition-all duration-200 shadow-sm'
        >
          Learn more
        </button>
      </div>
    </div>
  )
}

export default JobCard;

