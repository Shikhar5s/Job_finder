import React, { useContext } from 'react'
import { useState,useRef,useEffect } from 'react';
import Quill from 'quill'
import { JobCategories } from '../assets/assets';
import { JobLocations } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
export const AddJob = () => {

  const[title,setTitle]=useState('');

  const[location,setLocation]=useState('Bangalore');
  const[category,setCategory]=useState('Programming')
  const[level,setLevel]=useState('Begineer level');
  const[salary,setSalary]=useState(0);
  const editorRef=useRef(null)
  const quillRef=useRef(null)

  const {companyToken}=useContext(AppContext)

  const onSubmitHandler=async(e)=>{

    e.preventDefault();


try{

  const description=quillRef.current.root.innerHTML

  const {data}=await axios.post("http://localhost:5000/api/company/post-job",
    {
  title,description,category,location,level,salary
  },{
    headers:{token:companyToken}

  })
  if(data.success){
    toast.success(data.message)
    console.log(data)
    setTitle('')
    setSalary(0);
    quillRef.current.root.innerHTML=""
  }
  else{
    toast.error(data.message)
  }


}
catch(error){
  toast.error(error.message)

}
   


  }

  useEffect(()=>{
//Intiat quoll only once
if(!quillRef.current && editorRef.current){
  quillRef.current=new Quill(editorRef.current,{
    theme:'snow'
  });
}
 
  },[]);

  return (
  <form onSubmit={onSubmitHandler} className='container p-4 flex flex-col w-full items-start gap-3'>
    <div className='w-full'>
      <p className='mb-2'>Job title</p>
      <input type="text" placeholder='Type here'
      onChange={(e)=>setTitle(e.target.value)}
      value={title} className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded' />
    
    </div>
    <div className='w-full max-w-lg'>
      <p>Job description</p>
      <div ref={editorRef}>

      </div>
    </div>
    <div className='flex flex-col sm:flex-row gap-2 '>
      <div>
        <p className='mb-2'>Job category</p>
        <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={(e)=>setCategory(e.target.value)} >
        {JobCategories.map((category,index)=>(
          <option value={category} key={index}>{category}</option>

        ))}
        </select>
        <p className='mb-2'>Job location</p>
        <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={(e)=>setLocation(e.target.value)} >
        {JobLocations.map((location,index)=>(
          <option value={location} key={index}>{location}</option>

        ))}
        </select>
      
      </div>
      <div>
        <p className='mb-2'>Job level</p>
        <select onChange={(e)=>setLevel(e.target.value)} className='w-full px-3 py-2 border-2 border-gray-300 rounded' >
         <option value="Beginner level">Beginner level</option>
         <option value="Intermedate level">Intermediate level</option>
         <option value="Senior level">Senior level</option>
        
        </select>
      </div>

    </div>
    
    <div>
      <p className='mb-2'>Job salary</p>
      <input type="number" className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]' value={salary} onChange={(e)=>setSalary(e.target.value)}  placeholder='2500'/>
    </div>
    <button className='w-28 py-3 mt-4 bg-black text-white rounded'>ADD</button>
  </form>
  )
}
