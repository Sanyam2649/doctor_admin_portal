'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import { useRouter } from 'next/navigation';

// Card component as provided
function Card({ title, icon, children, className = "" }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      <div className="px-4 py-3 bg-[#2EB4B4] rounded-t-lg">
        <h3 className="text-sm font-semibold text-white flex flex-row gap-1 items-center">
          {icon}
          {title}
        </h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

// Sample radiology reports data
const radiologyReports = [
  {
    id: 1,
    patientName: "John Smith",
    reportType: "Complete Blood Count",
    status: "Completed",
    date: "2025-11-08",
    urgent: false,
    image: null,
    patientInfo: {
      name: "John Smith",
      age: "45 Years",
      gender: "Male",
      allergies: "Penicillin, Shellfish",
    }
  },
  {
    id: 2,
    patientName: "John Smith", 
    reportType: "Complete Blood Count",
    status: "In Progress",
    date: "2025-11-05",
    urgent: false,
    image: null,
    patientInfo: {
      name: "John Smith",
      age: "45 Years", 
      gender: "Male",
      allergies: "Penicillin, Shellfish",
    }
  },
  {
    id: 3,
    patientName: "Sarah Davis",
    reportType: "Complete Blood Count",
    status: "Completed",
    date: "2025-11-08",
    urgent: true,
    image: null,
    patientInfo: {
      name: "Sarah Davis",
      age: "38 Years",
      gender: "Female",
      allergies: "No known allergies",
    }
  },
  {
    id: 4,
    patientName: "John Smith",
    reportType: "Complete Blood Count", 
    status: "Completed",
    date: "2019-11-05",
    urgent: false,
    image: null,
    patientInfo: {
      name: "John Smith",
      age: "45 Years",
      gender: "Male",
      allergies: "Penicillin, Shellfish",
    }
  },
  {
    id: 5,
    patientName: "John Smith",
    reportType: "Complete Blood Count",
    status: "In Progress", 
    date: "2025-11-05",
    urgent: false,
    image: null,
    patientInfo: {
      name: "John Smith",
      age: "45 Years",
      gender: "Male",
      allergies: "Penicillin, Shellfish",
    }
  },
  {
    id: 6,
    patientName: "Sarah Davis",
    reportType: "Complete Blood Count",
    status: "Completed",
    date: "2025-11-08",
    urgent: true,
    image: null,
    alerts: 5,
    patientInfo: {
      name: "Sarah Davis",
      age: "38 Years",
      gender: "Female",
      allergies: "No known allergies",
    }
  },
  {
    id: 7,
    patientName: "Sarah Davis", 
    reportType: "Complete Blood Count",
    status: "Completed",
    date: "2025-11-05",
    urgent: true,
    image: null,
    patientInfo: {
      name: "Sarah Davis",
      age: "38 Years",
      gender: "Female",
      allergies: "No known allergies",
    }
  }
];

// Patient avatar component
function PatientAvatar({ name, imageUrl, isUrgent }) {
  const initials = name.split(' ').map(n => n[0]).join('');
  const colors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500'
  ];
  const colorIndex = name.length % colors.length;
  
  // If image URL is provided, use the image
  if (imageUrl) {
    return (
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        {isUrgent && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
        )}
      </div>
    );
  }
  
  // Otherwise use colored initials
  return (
    <div className={`w-10 h-10 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-semibold text-sm`}>
      {initials}
    </div>
  );
}

// Report row component
function ReportRow({ report }) {
  const router = useRouter();
  
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
        <span className="bg-red-400 text-white px-3 py-2 rounded-lg text-xs font-semibold inline-flex items-center justify-center min-w-[100px] sm:min-w-[126px] h-[40px]">
          Cancel
        </span>
      );
    }
  };
  
const handleViewReport = (report) => {
  const queryString = new URLSearchParams({
    report: JSON.stringify(report)
  }).toString();
  
  router.push(`/liquid_report?${queryString}`);
};

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 gap-3 sm:gap-0">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <PatientAvatar name={report.patientName} imageUrl={report.image} isUrgent={report.urgent}/>
        <div className="flex flex-col min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <div className="font-semibold text-gray-900 text-sm truncate">
              {report.patientName}
            </div>
            {report.alerts > 0 && (
              <span className="text-xs px-2 py-1 rounded-lg bg-[#FF5B61] text-white whitespace-nowrap flex-shrink-0 self-start sm:self-auto">
                {report.alerts} Alert{report.alerts > 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div className="text-gray-600 text-sm flex flex-col sm:flex-row sm:items-center gap-1 truncate">
            <span className="truncate">{report.reportType}</span>
            <span className="hidden sm:flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                <circle cx="2" cy="2" r="2" fill="#A5ADC2" />
              </svg>
            </span>
            <span className="truncate">Ordered - {report.date}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 justify-between sm:justify-end w-full sm:w-auto">
        {getStatusBadge(report.status)}
        <button 
          onClick={() => handleViewReport(report)}
          className="border border-[1px] border-gray-900 bg-white rounded-lg px-3 sm:px-4 py-2 text-xs font-medium text-gray-700 transition-colors duration-200 h-[40px] whitespace-nowrap flex-shrink-0"
        >
          View Report
        </button>
      </div>
    </div>
  );
}

function Page() {
  const [selected, setSelected] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

         const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  const handleCreateRadiologyTest = () => {
    alert('Creating new radiology test. This would open a new test form in a real application.');
  };

  return (
    <div className="flex h-screen bg-[#DEDEDE] overflow-hidden">
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

        {!selected ? (
          <main className="flex-1 overflow-y-auto mt-16 p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div className="min-w-0">
                <h1 className="font-poppins font-semibold text-xl sm:text-2xl lg:text-3xl text-gray-800 mb-1 truncate">
                  Radiology Reports
                </h1>
                <p className="text-gray-500 text-sm sm:text-base">Complete Medical History And Visit</p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <button 
                  onClick={handleCreateRadiologyTest}
                  className="bg-[#2EB4B4] text-white font-semibold px-3 sm:px-5 py-2 rounded-lg shadow-md hover:bg-[#259999] transition-colors duration-200 text-sm sm:text-base whitespace-nowrap flex flex-row items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5C8 3.93913 8.42143 2.92172 9.17157 2.17157C9.92172 1.42143 10.9391 1 12 1C13.0609 1 14.0783 1.42143 14.8284 2.17157C15.5786 2.92172 16 3.93913 16 5V10.255C17.223 11.1066 18.1423 12.3262 18.6241 13.7365C19.1059 15.1467 19.125 16.6739 18.6788 18.0958C18.2325 19.5176 17.3441 20.76 16.1429 21.642C14.9416 22.524 13.4903 22.9996 12 22.9996C10.5097 22.9996 9.05837 22.524 7.85714 21.642C6.6559 20.76 5.7675 19.5176 5.32123 18.0958C4.87496 16.6739 4.89412 15.1467 5.37592 13.7365C5.85772 12.3262 6.77702 11.1066 8 10.255V5ZM9.144 11.895C8.27017 12.5031 7.61325 13.3742 7.26885 14.3816C6.92446 15.3889 6.91058 16.4799 7.22924 17.4957C7.5479 18.5115 8.18245 19.399 9.04053 20.0291C9.89861 20.6593 10.9354 20.9991 12 20.9991C13.0646 20.9991 14.1014 20.6593 14.9595 20.0291C15.8175 19.399 16.4521 18.5115 16.7708 17.4957C17.0894 16.4799 17.0755 15.3889 16.7311 14.3816C16.3868 13.3742 15.7298 12.5031 14.856 11.895L14 11.298V5C14 4.46957 13.7893 3.96086 13.4142 3.58579C13.0391 3.21071 12.5304 3 12 3C11.4696 3 10.9609 3.21071 10.5858 3.58579C10.2107 3.96086 10 4.46957 10 5V11.298L9.144 11.895ZM8 16H16C16 17.0609 15.5786 18.0783 14.8284 18.8284C14.0783 19.5786 13.0609 20 12 20C10.9391 20 9.92172 19.5786 9.17157 18.8284C8.42143 18.0783 8 17.0609 8 16Z" fill="white"/>
                  </svg>
                  <span className="hidden sm:inline">Order Radiology Test</span>
                  <span className="sm:hidden">Order Test</span>
                </button>
              </div>
            </div>

            {/* Recent Radiology Reports Card */}
            <Card 
              title="Recent Radiology Reports"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <g clipPath="url(#clip0_26_1625)">
                    <path d="M22.4131 18.855L15.0001 6.5025V1.5H15.7501C16.1626 1.5 16.5001 1.1625 16.5001 0.75C16.5001 0.3375 16.1626 0 15.7501 0H8.25013C7.83763 0 7.50013 0.3375 7.50013 0.75C7.50013 1.1625 7.83763 1.5 8.25013 1.5H9.00013V6.5025L1.58713 18.855C-0.110873 21.684 1.20013 24 4.50013 24H19.5001C22.8001 24 24.1111 21.6855 22.4131 18.855ZM5.64913 15L10.5001 6.915V1.5H13.5001V6.915L18.3511 15H5.64913Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_26_1625">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
              className="w-full"
            >
              <div className="space-y-0">
                {radiologyReports.map((report) => (
                  <ReportRow key={report.id} report={report} />
                ))}
              </div>
              
              {/* Empty State */}
              {radiologyReports.length === 0 && (
                <div className="p-8 text-center">
                  <div className="text-gray-400 text-sm">No radiology reports found</div>
                  <button 
                    onClick={handleCreateRadiologyTest}
                    className="mt-2 bg-[#2EB4B4] hover:bg-[#259999] text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
                  >
                    Create First Report
                  </button>
                </div>
              )}
            </Card>
          </main>
        ) : (
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            {/* Detail view would go here */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Report Details</h2>
              <p>Selected report details would be displayed here.</p>
              <button 
                onClick={() => setSelected(null)}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Back to Reports
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;