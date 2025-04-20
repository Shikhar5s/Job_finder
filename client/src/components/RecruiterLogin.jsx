import React from 'react'
import { useState,useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext} from '../context/AppContext';
import { useContext } from 'react';

export const RecruiterLogin = () => {

  const[state,setState]=useState('Login');
  const[name,setName]=useState('')
  const[password,setPassword]=useState('');
  const[email,setEmail]=useState('')
  const[image,setImage]=useState(false)

  const[isTextDataSubmitted,setIsTextDataSubmitted]=useState(false);
  const{setShowRecruiterLogin}=useContext(AppContext)

  const onSubmitHandler=async(e)=>{
    e.preventDefault();

    if(state =='Sign up' && !isTextDataSubmitted){

      if(!name || !email || !password){
        alert("Please All feilds")
        return;
      }
       setIsTextDataSubmitted(true)
    }
  }
// donot scroll page via recruiter login

useEffect(()=>{
 document.body.style.overflow='hidden'
  
 return()=>{
  document.body.style.overflow='unset'
 }


},[])
    
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>

        <p className='text-lg text-center text-gray-600 mt-2'>
  Welcome back, please <span className="font-semibold text-blue-600">sign in</span> to continue.
</p>

        {state ==='Sign up' && isTextDataSubmitted ?
        <>
            <div className='flex items-center gap-4 my-10'>
              <label htmlFor="image">
                <img  className='w-16 rounded-full' src={image ? URL.createObjectURL(image) :assets.upload_area} alt="" />
                <input onChange={e=>{setImage(e.target.files[0])}} type="file" id='image' hidden/>
              </label>
              <p>Upload Company <br />Logo</p>
            </div>
        </> :
        <>
        
         {state !=='Login' && (
          <div className='border px-4 py-2 flex items-center gap-2 rounded-full mb-4'>
          <img src={assets.person_icon} alt="" />
          
            <input className='outline-none text-sm' onChange={e=>setName(e.target.value)} type="text"  placeholder='Name' value={name}/>
            </div>
       ) }
      
     <div className='border px-4 py-2 flex items-center gap-2 rounded-full mb-4'>
       <img src={assets.email_icon} alt="" />
       
         <input  className='outline-none text-sm'  onChange={e=>setEmail(e.target.value)} type="text"  placeholder='Email id' value={email}/>
         </div>
     <div className='border px-4 py-2 flex items-center gap-2 rounded-full mb-4'>
       <img src={assets.lock_icon} alt="" />
       
        
         <input  className='outline-none text-sm' onChange={e=>setPassword(e.target.value)} type="password"  placeholder='company Name' value={password}/>
         </div>
         </>
        }
        <>
       
          {state=='Login' &&
          <p className='text-sm text-blue-600 my-4 cursor-pointer mt-4'>Forget Password</p>}
        </>

        <button type='submit'onClick={onSubmitHandler} className="bg-blue-600 w-full text-white py-2 rounded-full hover:bg-blue-700 transition mt-4">
  {state === 'Login' ? 'Login' : isTextDataSubmitted? 'Create Account' :'Next'}
</button>
        {state==='Login' ?
         <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign up')}>Sign Up</span></p>
          : 
         <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Login')}>Login</span></p>
         }
       <img src={assets.cross_icon} onClick={()=>setShowRecruiterLogin(false)}className='absolute top-5 right-5 cursor-pointer ' alt="" />
       
      </form>
    </div>
  )
}

