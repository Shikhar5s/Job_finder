import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

export const Dashboard = () => {

    return (
        <div className="min-h-screen">
        {/* Navbar for recruiter panel */}
        <div className="shadow py-4">
          <div className="px-5 flex justify-between items-center">
            <img
              onClick={() => navigate('/')}
              className="max-sm:w-32 cursor-pointer"
              src={assets.logo}
              alt="Logo"
            />
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden">Welcome</p>
              <div className="relative group">
                <img
                  className="w-8 border rounded-full"
                  src={assets.company_icon}
                  alt="Company Icon"
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border">
                    <li className="py-2 px-2 cursor-pointer pr-10">Log out</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        {/* Main Layout with Sidebar and Content */}
        <div className="flex items-start">
          {/* Left Sidebar */}
          <div className="w-1/4 min-h-screen border-r-2">
            <ul className="flex flex-col items-start pt-5 text-gray-800">
              <NavLink
                to="add-job"
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''
                  }`
                }
              >
                <img className='min-w-4' src={assets.add_icon} alt="Add Job Icon" />
                <p className='max-sm:hidden'>Add Job</p>
              </NavLink>
      
              <NavLink
                to="manage-jobs"
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''
                  }`
                }
              >
                <img   className='min-w-4' src={assets.home_icon} alt="Manage Jobs Icon" />
                <p className='max-sm:hidden'>Manage Jobs</p>
              </NavLink>
      
              <NavLink
                to="view-applications"
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''
                  }`
                }
              >
                <img src={assets.person_tick_icon} alt="View Applications Icon" />
                <p className='max-sm:hidden'>View Applications</p>
              </NavLink>
            </ul>
          </div>
          <div>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      
 
 




    )
        
}

