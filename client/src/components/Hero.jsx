import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useRef } from 'react'
export const Hero = () => {
  const{setSearchFilter,setIsSearched}=useContext(AppContext)

const titleRef=useRef(null)
const locationRef=useRef(null)

const onSearch=()=>{
  setSearchFilter({
    title:titleRef.current.value,
    location:locationRef.current.value

  })
  setIsSearched(true)
}

  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
      <div className='bg-gradient-to-r from-purple-800 to-purple-900 text-white py-16 text-center mx-2 rounded-xl'>
       <h2 className='text-2xl md:text-3xl lg:text-4xl'>Over 10,000+ jobs to apply</h2>
       <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'> Your next big carrier starts Right Here</p>
       <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
         <div className='flex items-center '>
            <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
            <input type="text" 
            placeholder='Search for job' 
            ref={titleRef} 
              className='max-sm:text-xs p-2 rounded outline-none w-full' />
        </div>
        <div className='flex items-center'>
            <img className='h-4 sm:h-5' src={assets.location_icon} alt="" />
            <input type="text" 
            placeholder='Location'
            ref={locationRef} 
                          className='max-sm:text-xs p-2 rounded outline-none w-full' />
        </div>
        <button className='bg-blue-600 px-6 py-2 rounded text-white m-1' onClick={(e)=>onSearch(e)}>Search</button>
       </div>
      </div>
      <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded md-flex'>
        <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
        <p>Trusted by</p>
        <img className='h-6'src={assets.microsoft_logo} alt=""></img>
        <img className='h-6' src={assets.walmart_logo} alt=""></img>
        <img className='h-6' src={assets.adobe_logo} alt=""></img>
        <img className='h-6'src={assets.samsung_logo_icon} alt=""></img>
        <img className='h-6'src={assets.amazon_logo} alt=""></img>
        <img className='h-6' src={assets.accenture_logo} alt=""></img>
      </div>
      </div>
    </div>
  
  )
}

