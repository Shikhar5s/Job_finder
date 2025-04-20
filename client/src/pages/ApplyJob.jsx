import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { AppContext } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import JobCard from '../components/JobCard';
import Loading from '../components/Loading';
import { Footer } from '../components/Footer';
import { assets } from '../assets/assets';

export const ApplyJob = () => {
  const { id } = useParams();
  const [JobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  const fetchJob = () => {
    const data = jobs.find(job => job._id === id);
    if (data) {
      setJobData(data);
    }
  };

  useEffect(() => {
    if (jobs?.length > 0) {
      fetchJob();
    }
  }, [id, jobs]);


  
  return JobData ? (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-8 py-12">
        {/* Job Header */}
        <div className="bg-white text-black rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
            <div className="flex items-center gap-6">
              <img
                className="h-24 bg-white rounded-lg p-3 shadow-md"
                src={assets.company_icon}
                alt="Company Logo"
              />
              <div className="text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">
                  {JobData.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-gray-600 mt-3">
                  <span className="flex items-center gap-2">
                    <img src={assets.suitcase_icon} alt="Company" />
                    <span className="text-blue-600 font-medium">
                      {JobData.companyId.name}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <img src={assets.location_icon} alt="Location" />
                    <span className="text-gray-700">{JobData.location}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <img src={assets.person_icon} alt="Level" />
                    <span className="text-gray-700">{JobData.level}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <img src={assets.money_icon} alt="Salary" />
                    <span className="text-green-600 font-medium">
                      CTC: {JobData.salary}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-all">
                Apply Now
              </button>
              <p className="mt-2 text-gray-500 text-sm">
                Posted {moment(JobData.date).fromNow()}
              </p>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Job Description */}
          <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-md p-8">
            <h2 className="font-bold text-2xl text-gray-800 mb-4">
              Job Description
            </h2>
            <div
              className="text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: JobData.description }}
            ></div>
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition-all">
              Apply Now
            </button>
          </div>

          {/* More Jobs from the Same Company */}
          <div className="w-full lg:w-1/3">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              More jobs from {JobData.companyId.name}
            </h2>
            <div className="space-y-5">
              {jobs
                .filter(
                  job =>
                    job._id !== JobData._id &&
                    job.companyId._id === JobData.companyId._id
                )
                .slice(0, 4)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
               
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loading />
  );
};
