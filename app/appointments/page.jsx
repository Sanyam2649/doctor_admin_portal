'use client';
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      time: '9:00AM',
      duration: '30 Mins',
      status: 'Completed',
      dotColor: 'bg-green-500',
      name: 'John Smith',
      role: 'Consultation --- Room 1',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      // Additional details for appointment-details page
      patientInfo: {
        name: 'John Smith',
        age: '45 Years',
        gender: 'Male',
        allergies: 'Penicillin, Shellfish',
        medicalHistory: ['Hypertension', 'High Cholesterol'],
        currentMedications: ['Lisinopril 10mg Daily', 'Atorvastatin 20mg Daily'],
        reasonForVisit: 'Routine checkup and blood pressure monitoring'
      },
      transcription: 'Patient reports feeling well. Blood pressure is controlled with current medication. No new complaints.',
      diagnosis: 'Controlled Hypertension',
      nextSteps: 'Continue current medication, follow up in 3 months',
      treatment: 'Maintain current dosage of Lisinopril and Atorvastatin'
    },
    {
      id: 2,
      time: '10:00AM',
      duration: '30 Mins',
      status: 'In Progress',
      dotColor: 'bg-yellow-500',
      name: 'Emma Wilson',
      role: 'Consultation --- Room 1',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      // Additional details for appointment-details page
      patientInfo: {
        name: 'Emma Wilson',
        age: '32 Years',
        gender: 'Female',
        allergies: 'No known allergies',
        medicalHistory: ['Diabetes', 'Obesity'],
        currentMedications: ['Metformin 1000mg Twice Daily', 'Glipizide 5mg Daily'],
        reasonForVisit: 'Follow-up for diabetes management, reports good glucose control'
      },
      transcription: '',
      diagnosis: '',
      nextSteps: '',
      treatment: ''
    },
    {
      id: 3,
      time: '10:30AM',
      duration: '30 Mins',
      status: 'Cancel',
      dotColor: 'bg-red-500',
      name: 'Michael Brown',
      role: 'Consultation --- Room 1',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
      patientInfo: {
        name: 'Michael Brown',
        age: '28 Years',
        gender: 'Male',
        allergies: 'Ibuprofen',
        medicalHistory: ['Asthma'],
        currentMedications: ['Albuterol inhaler as needed'],
        reasonForVisit: 'Annual physical examination'
      },
      transcription: '',
      diagnosis: '',
      nextSteps: '',
      treatment: ''
    },
  ]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
      const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  const getStatusDot = (status) => {
        if (status === 'Completed') {
      return (
        <span className="bg-[#2EB4B4] rounded-full w-2 h-2"/>
      );
    } else if (status === 'In Progress'){
      return (
        <span className="bg-[#F9C566] rounded-full w-2 h-2"/>
      );
    }
    else if (status === 'Cancel'){
      return (
        <span className="bg-[#FF5B61] rounded-full w-2 h-2"/>
      );
    }
  }
  
    const getStatusBadge = (status) => {
    if (status === 'Completed') {
      return (
        <span className="bg-[#2EB4B4] text-white px-3 py-2 rounded-lg text-xs font-semibold inline-flex items-center justify-center min-w-[100px] sm:min-w-[126px] h-[40px]">
          Completed
        </span>
      );
    } else if (status === 'In Progress'){
      return (
        <span className="bg-[#F9C566] text-white px-3 py-2 rounded-lg text-xs font-semibold inline-flex items-center justify-center min-w-[100px] sm:min-w-[126px] h-[40px]">
          In Progress
        </span>
      );
    }
    else if (status === 'Cancel'){
      return (
        <span className="bg-[#FF5B61] text-white px-3 py-2 rounded-lg text-xs font-semibold inline-flex items-center justify-center min-w-[100px] sm:min-w-[126px] h-[40px]">
          Cancel
        </span>
      );
    }
  };

  const handleViewDetails = (appointment) => {
    // Store the appointment data in localStorage or pass as query params
    localStorage.setItem('currentAppointment', JSON.stringify(appointment));
    // Redirect to appointment-details page
    router.push('/appointment-details');
  };

  const handleNewAppointment = () => {
    alert('New appointment button clicked! This would open a form in a real app.');
  };

  return (
    <div className="flex min-h-screen bg-[#DEDEDE] overflow-hidden">
               <div
      className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md
        transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </div>

    {/* Overlay for mobile */}
    {isSidebarOpen && (
      <div
        onClick={closeSidebar}
        className="fixed inset-0 bg-black/40 z-20 lg:hidden"
      />
    )}
      <div className="flex-1 flex flex-col lg:ml-64">
         <div className="fixed top-0 left-0 lg:left-64 right-0 z-20 bg-white shadow-sm h-16 flex items-center">
                                <Navbar onToggleSidebar={toggleSidebar} />
                              </div>
        <main className="flex-1 overflow-y-auto mt-16 p-4 sm:p-6 lg:p-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="font-poppins font-semibold text-2xl sm:text-3xl text-gray-800 mb-2">
                Appointment Management
              </h1>
              <p className="text-gray-500 text-base sm:text-lg">
                AI-Powered Scheduling And Management System
              </p>
            </div>
            <button 
              onClick={handleNewAppointment}
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-md transition-colors duration-200 whitespace-nowrap"
            >
              + New Appointment
            </button>
          </div>

          {/* Today's Appointments Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="bg-[#2EB4B4] px-4 sm:px-6 py-3 sm:py-4 flex items-center">
              <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke="currentColor" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span className="text-white font-semibold text-lg">Today&apos;s Appointments</span>
            </div>

            {/* Appointments List */}
            <div className="divide-y divide-gray-100">
              {appointments.map((appointment, index) => (
                <div key={appointment.id} className="flex flex-col sm:flex-row items-start sm:items-center px-4 sm:px-6 py-4 sm:py-5 hover:bg-gray-50 transition-colors duration-150 gap-3 sm:gap-0">
                  {/* Time Indicator */}
                  <div className="flex items-center gap-3 w-full sm:w-20">
                    <div className="flex sm:flex-col">
                      <span className="font-semibold text-gray-800 text-sm mr-2 sm:mr-0">{appointment.time}</span>
                      <span className="text-xs text-gray-500 sm:mt-1">{appointment.duration}</span>
                    </div>
                    <span className="text-gray-300 mx-2">|</span>
                  
                      {getStatusDot(appointment.status)}

                  </div>

                  {/* Avatar */}
                  <img
                    src={appointment.avatar}
                    alt={appointment.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4 border-2 border-gray-100"
                  />

                  {/* Patient Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-base">{appointment.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{appointment.role}</p>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    {getStatusBadge(appointment.status)}
                    <button
                      onClick={() => handleViewDetails(appointment)}
                      className="border border-gray-300 bg-white hover:bg-gray-50 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;