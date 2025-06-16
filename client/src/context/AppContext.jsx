import React, { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { jobsData } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios"
export const AppContext=createContext();

export const AppContextProvider=(props)=>{

    const backenedUrl=import.meta.env.VITE_BACKENED_URL

    const [searchFilter,setSearchFilter]=useState({
        title:'',
        location:''


})



const[jobs,setJobs]=useState([])
const [isSearched,setIsSearched]=useState(false);
const[showRecruiterLogin,setShowRecruiterLogin]=useState(false)
const[companyToken,setCompanyToken]=useState(null);
const[companyData,setCompanyData]=useState(null)





// function to fetch job data
const fetchJobs=async()=>{
setJobs(jobsData)



}

// function to feth company data

const fetchCompanyData=async()=>{


    try{
        const {data}=await axios.get('http://localhost:5001/api/company/company',{headers:{token:companyToken}})
        if(data.success){
            setCompanyData(data.company)
            console.log(data);
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

fetchJobs();

const storedCompanyToken=localStorage.getItem('companyToken')

if(storedCompanyToken){
    setCompanyToken(storedCompanyToken);
}
},[])

useEffect(()=>{
    if(companyToken){
        fetchCompanyData();

    }

},[companyToken])

    const value={
       setSearchFilter,searchFilter,
       isSearched,setIsSearched,
       jobs,setJobs,
       showRecruiterLogin,setShowRecruiterLogin,
       companyData,setCompanyData,
       companyToken,setCompanyToken,
       backenedUrl
        
    }

    return (<AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>)
} 