'use client';
import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import { useRouter } from 'next/navigation';

const patients = [
  { id: 1, name: 'John Smith', condition: 'Hypertension', last: '2025-11-09', alerts: 0, initials: 'JS' },
  { id: 2, name: 'Emma Wilson', condition: 'Diabetes Type-2', last: '2025-11-09', alerts: 2, initials: 'EW' },
  { id: 3, name: 'Michael Brown', condition: 'Hypertension', last: '2025-11-09', alerts: 0, initials: 'MB' },
  { id: 4, name: 'Sarah Johnson', condition: 'Asthma', last: '2025-11-08', alerts: 1, initials: 'SJ' },
  { id: 5, name: 'David Miller', condition: 'Arthritis', last: '2025-11-07', alerts: 0, initials: 'DM' },
  { id: 6, name: 'Lisa Anderson', condition: 'Migraine', last: '2025-11-06', alerts: 3, initials: 'LA' },
];

function Row({ p, onOpen }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-lg border border-gray-100 bg-white hover:bg-gray-50 transition-colors duration-150 overflow-y-auto">
      {/* Patient Data Container */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="h-10 w-10 rounded-full bg-emerald-100 text-[#2EB4B4] grid place-items-center text-sm font-semibold flex-shrink-0">
          {p.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-800 truncate">{p.name}</span>
          </div>
          <div className="text-xs text-gray-500 truncate">
            {p.condition} • Last Visit — {p.last}
          </div>
        </div>
      </div>

      {/* Alert and Button Container */}
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
        {p.alerts > 0 && (
          <span className="text-xs px-3 py-2 rounded-lg bg-[#FF5B61] text-white whitespace-nowrap flex-shrink-0">
            {p.alerts} Alert{p.alerts > 1 ? 's' : ''}
          </span>
        )}
        <button
          onClick={() => onOpen(p)}
          className="shrink-0 text-sm px-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors duration-200 w-full sm:w-auto"
        >
          View Record
        </button>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-gray-50 border border-gray-100 px-3 py-2">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="font-medium text-gray-800 text-sm">{value}</span>
    </div>
  );
}

// Main Card Component
function Card({ title, icon, children, className = "", headerClassName = "", showHeader = true }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {showHeader && (
        <div className={`px-4 py-3 bg-[#2EB4B4] rounded-t-lg ${headerClassName}`}>
          <h3 className="text-sm font-semibold text-white flex flex-row gap-1 items-center">
            {icon}
            {title}
          </h3>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

// White Header Card Component for inner cards
function WhiteHeaderCard({ title, icon, children, className = "", actionButton }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      <div className="px-4 py-3 border-b border-gray-200 bg-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800 flex flex-row gap-1 items-center">
            {icon}
            {title}
          </h3>
          {actionButton}
        </div>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

function PatientDetail({ data, onClose }) {
  const router = useRouter();
  
  const record = {
    ...data,
    primaryCondition: data.condition,
    provider: { 
      name: 'Dr Brown', 
      org: 'Diabetes Care Center', 
      addr: '789 Medical Plaza, Floor 3, Health City, HC54321' 
    },
    diagnosis: ['Type2 Diabetes - Well Controlled'],
    vitals: { 
      bp: '125/80 mmHg', 
      hr: '70 bpm', 
      temp: '98.2°F', 
      weight: '165 lbs' 
    },
    labs: { 
      hba1c: '6.8%', 
      fastingGlucose: '110 mg/dL' 
    },
    meds: ['Metformin 1000mg Twice Daily', 'Glipizide 5mg Daily'],
    history: ['Diabetes', 'Obesity'],
    allergies: 'No Known Allergies',
  };

   const handleViewDetails = () => {
    //write your logic here.
         router.push('/liquid_report');
     };
  
  const handlePrescribeMeds = () => {
    alert(`Prescribing medications for ${data.name}. This would open a prescription form in a real application.`);
  };

  const handleViewFullHistory = () => {
    alert('Viewing full visit history...');
  };

  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-[#DEDEDE]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-emerald-100 text-[#2EB4B4] grid place-items-center font-semibold text-sm sm:text-base flex-shrink-0">
            {record.initials}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">{record.name}</h1>
            <p className="text-gray-500 text-xs sm:text-sm">Complete Medical History And Visit</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-3 rounded-[10px] border border-gray-200 bg-gray-50 text-sm w-full sm:w-[352px] h-[53px] flex items-center justify-between">
            <span className="text-gray-800">Primary Condition</span>
            <span className="font-semibold text-gray-600">{record.primaryCondition}</span>
          </div>

          <div className="px-4 py-3 rounded-[10px] border border-gray-200 bg-gray-50 text-sm w-full sm:w-auto h-[53px] flex items-center gap-2 min-w-[160px]">
            <span className="text-gray-800">Last Visit</span>
            <span className="font-semibold text-gray-600">{record.last}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 10L12 15L17 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content Grid - 1.5 Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr,400px] gap-6">
        
        {/* Left Column - Visit History (2/3 width) */}
        <div className="space-y-6">
          {/* Visit History Card */}
          <Card 
            title="Visit History" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19.903 8.586C19.8555 8.4775 19.7892 8.37829 19.707 8.293L13.707 2.293C13.6217 2.21083 13.5225 2.14447 13.414 2.097C13.384 2.083 13.352 2.075 13.32 2.064C13.2363 2.03563 13.1492 2.01848 13.061 2.013C13.04 2.011 13.021 2 13 2H6C4.897 2 4 2.897 4 4V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V9C20 8.979 19.989 8.96 19.987 8.938C19.9815 8.84979 19.9644 8.7627 19.936 8.679C19.9267 8.647 19.9157 8.616 19.903 8.586ZM16.586 8H14V5.414L16.586 8ZM6 20V4H12V9C12 9.26522 12.1054 9.51957 12.2929 9.70711C12.4804 9.89464 12.7348 10 13 10H18L18.002 20H6Z" fill="white"/>
                <path d="M8 12H16V14H8V12ZM8 16H16V18H8V16ZM8 8H10V10H8V8Z" fill="white"/>
              </svg>
            }
          >
            {/* Recent Visit Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-sm flex flex-col gap-1 text-gray-700">
                  <span className="font-medium text-gray-800">{record.last}</span>
                  <span className="text-gray-600">Diabetes Management And HbA1c Review</span>
                </div>
                <div className="text-sm flex flex-col gap-1 text-gray-700">
                  <span className="font-medium text-gray-800">{record.provider.name}, {record.provider.org}</span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 23 23" fill="none" className="flex-shrink-0">
                      <path d="M11.5 12.4583C13.0878 12.4583 14.375 11.1711 14.375 9.58333C14.375 7.99551 13.0878 6.70833 11.5 6.70833C9.91218 6.70833 8.625 7.99551 8.625 9.58333C8.625 11.1711 9.91218 12.4583 11.5 12.4583Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11.5002 1.91666C9.46684 1.91666 7.51679 2.72440 6.07901 4.16218C4.64123 5.59996 3.8335 7.55 3.8335 9.58333C3.8335 11.3965 4.21875 12.5829 5.271 13.8958L11.5002 21.0833L17.7293 13.8958C18.7816 12.5829 19.1668 11.3965 19.1668 9.58333C19.1668 7.55 18.3591 5.59996 16.9213 4.16218C15.4835 2.72440 13.5335 1.91666 11.5002 1.91666Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {record.provider.addr}
                  </span>
                </div>
              </div>
            </div>

            {/* Inner Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              {/* Diagnosis Card */}
              <WhiteHeaderCard 
                title="Diagnosis" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M19.903 8.586C19.8555 8.4775 19.7892 8.37829 19.707 8.293L13.707 2.293C13.6217 2.21083 13.5225 2.14447 13.414 2.097C13.384 2.083 13.352 2.075 13.32 2.064C13.2363 2.03563 13.1492 2.01848 13.061 2.013C13.04 2.011 13.021 2 13 2H6C4.897 2 4 2.897 4 4V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V9C20 8.979 19.989 8.96 19.987 8.938C19.9815 8.84979 19.9644 8.7627 19.936 8.679C19.9267 8.647 19.9157 8.616 19.903 8.586ZM16.586 8H14V5.414L16.586 8ZM6 20V4H12V9C12 9.26522 12.1054 9.51957 12.2929 9.70711C12.4804 9.89464 12.7348 10 13 10H18L18.002 20H6Z" fill="#2EB4B4"/>
                    <path d="M8 12H16V14H8V12ZM8 16H16V18H8V16ZM8 8H10V10H8V8Z" fill="#2EB4B4"/>
                  </svg>
                }
                className="h-full"
              >
                  <ul className="space-y-2 text-sm text-gray-700">
                  {record.diagnosis.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
<circle cx="7.5" cy="7.5" r="7.5" fill="#2EB4B4"/>
<path d="M6.5101 9.82834C6.38855 9.82832 6.27199 9.78001 6.18606 9.69405L4.42606 7.93405C4.38228 7.89177 4.34736 7.8412 4.32334 7.78528C4.29932 7.72936 4.28668 7.66922 4.28615 7.60836C4.28562 7.5475 4.29722 7.48715 4.32026 7.43082C4.34331 7.37449 4.37734 7.32332 4.42038 7.28029C4.46341 7.23725 4.51458 7.20322 4.57091 7.18017C4.62724 7.15713 4.68759 7.14553 4.74845 7.14606C4.80931 7.14659 4.86945 7.15923 4.92537 7.18325C4.98129 7.20727 5.03186 7.24219 5.07414 7.28597L6.5101 8.72193L9.92606 5.30597C10.0125 5.22248 10.1283 5.17628 10.2484 5.17732C10.3686 5.17837 10.4836 5.22657 10.5686 5.31155C10.6535 5.39653 10.7017 5.51148 10.7028 5.63166C10.7038 5.75183 10.6576 5.86761 10.5741 5.95405L6.83414 9.69405C6.74821 9.78001 6.63165 9.82832 6.5101 9.82834Z" fill="white"/>
</svg></span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </WhiteHeaderCard>

              {/* Vitals Card */}
              <WhiteHeaderCard 
                title="Vitals" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M19.5 12H17.5L15 17L11 7L8.5 12H6.5" stroke="#2EB4B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
                className="h-full"
              >
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Info label="BP" value={record.vitals.bp} />
                  <Info label="HR" value={record.vitals.hr} />
                  <Info label="Temp" value={record.vitals.temp} />
                  <Info label="Weight" value={record.vitals.weight} />
                </div>
              </WhiteHeaderCard>

              {/* Lab Results Card */}
              <WhiteHeaderCard 
                title="Lab Results"  
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <g clipPath="url(#clip0_26_1261)">
                      <path d="M19.6115 19.4981L13.1251 8.68969V4.3125H13.7814C14.1423 4.3125 14.4376 4.01719 14.4376 3.65625C14.4376 3.29531 14.1423 3 13.7814 3H7.21886C6.85792 3 6.56261 3.29531 6.56261 3.65625C6.56261 4.01719 6.85792 4.3125 7.21886 4.3125H7.87511V8.68969L1.38874 19.4981C-0.0970135 21.9735 1.05011 24 3.93761 24H17.0626C19.9501 24 21.0972 21.9748 19.6115 19.4981ZM4.94299 16.125L9.18761 9.05063V4.3125H11.8126V9.05063L16.0572 16.125H4.94299Z" fill="#2EB4B4"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_26_1261">
                        <rect width="21" height="21" fill="white" transform="translate(0 3)" />
                      </clipPath>
                    </defs>
                  </svg>
                }
                className="h-full"
                actionButton={
                  <button 
                    onClick={handleViewDetails}
                    className="text-xs bg-[#2EB4B4] p-2 rounded-lg text-white font-medium"
                  >
                    View Details
                  </button>
                }
              >
                <div className="space-y-2 text-sm">
                  <Info label="HbA1c" value={record.labs.hba1c} />
                  <Info label="Fasting Glucose" value={record.labs.fastingGlucose} />
                </div>
              </WhiteHeaderCard>

              {/* Medications Card */}
              <WhiteHeaderCard 
                title="Medications" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6V12L16 14" stroke="#2EB4B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#2EB4B4" strokeWidth="2"/>
                  </svg>
                }
                className="h-full"
              >
                <ul className="space-y-2 text-sm text-gray-700">
                  {record.meds.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
<circle cx="7.5" cy="7.5" r="7.5" fill="#2EB4B4"/>
<path d="M6.5101 9.82834C6.38855 9.82832 6.27199 9.78001 6.18606 9.69405L4.42606 7.93405C4.38228 7.89177 4.34736 7.8412 4.32334 7.78528C4.29932 7.72936 4.28668 7.66922 4.28615 7.60836C4.28562 7.5475 4.29722 7.48715 4.32026 7.43082C4.34331 7.37449 4.37734 7.32332 4.42038 7.28029C4.46341 7.23725 4.51458 7.20322 4.57091 7.18017C4.62724 7.15713 4.68759 7.14553 4.74845 7.14606C4.80931 7.14659 4.86945 7.15923 4.92537 7.18325C4.98129 7.20727 5.03186 7.24219 5.07414 7.28597L6.5101 8.72193L9.92606 5.30597C10.0125 5.22248 10.1283 5.17628 10.2484 5.17732C10.3686 5.17837 10.4836 5.22657 10.5686 5.31155C10.6535 5.39653 10.7017 5.51148 10.7028 5.63166C10.7038 5.75183 10.6576 5.86761 10.5741 5.95405L6.83414 9.69405C6.74821 9.78001 6.63165 9.82832 6.5101 9.82834Z" fill="white"/>
</svg></span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </WhiteHeaderCard>
            </div>
          </Card>
        </div>

        <div className="space-y-3 grid grid-cols-2 *:h-full gap-x-4">
          {/* Medical History Card */}
          <Card 
            title="Medical History" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          >
            <ul className="space-y-2 text-sm text-gray-700">
              {record.history.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-teal-500 flex-shrink-0"></span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Allergies Card */}
          <Card 
            title="Allergies" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2"/>
                <path d="M12 8V12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 16H12.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
          >
            <p className="text-sm text-gray-700">{record.allergies}</p>
          </Card>
        </div>
      </div>
    </main>
  );
}

function Page() {
  const [selected, setSelected] = useState(null);
  const handleNewRecord = () => {
    alert('Creating new patient record. This would open a new record form in a real application.');
  };

  const handleSearch = (e) => {
    // Basic search functionality
    const searchTerm = e.target.value.toLowerCase();
    console.log('Searching for:', searchTerm);
    // In a real app, you would filter the patients array here
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        {!selected ? (
          <main className="p-4 sm:p-6 lg:p-8 bg-[#DEDEDE]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="font-poppins font-semibold text-xl sm:text-2xl lg:text-3xl text-gray-800 mb-1">
                  Patient Record & EMR
                </h1>
                <p className="text-gray-500 text-sm sm:text-base">Electronic medical records management</p>
              </div>
              <div className="gap-3">
                <button 
                  onClick={handleNewRecord}
                  className="bg-[#2EB4B4] text-white font-semibold px-4 sm:px-5 py-2 rounded-lg shadow-md transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
                >
                  + New Record
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#2EB4B4] px-4 sm:px-5 py-3 sm:py-3.5 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 10.5C12.7956 10.5 13.5587 10.1839 14.1213 9.62132C14.6839 9.05871 15 8.29565 15 7.5C15 6.70435 14.6839 5.94129 14.1213 5.37868C13.5587 4.81607 12.7956 4.5 12 4.5C11.2044 4.5 10.4413 4.81607 9.87868 5.37868C9.31607 5.94129 9 6.70435 9 7.5C9 8.29565 9.31607 9.05871 9.87868 9.62132C10.4413 10.1839 11.2044 10.5 12 10.5ZM12 9C11.6022 9 11.2206 8.84196 10.9393 8.56066C10.658 8.27936 10.5 7.89782 10.5 7.5C10.5 7.10218 10.658 6.72064 10.9393 6.43934C11.2206 6.15804 11.6022 6 12 6C12.3978 6 12.7794 6.15804 13.0607 6.43934C13.342 6.72064 13.5 7.10218 13.5 7.5C13.5 7.89782 13.342 8.27936 13.0607 8.56066C12.7794 8.84196 12.3978 9 12 9ZM7.5 18C7.30109 18 7.11032 18.079 6.96967 18.2197C6.82902 18.3603 6.75 18.5511 6.75 18.75C6.75 18.9489 6.82902 19.1397 6.96967 19.2803C7.11032 19.421 7.30109 19.5 7.5 19.5H16.5C16.6989 19.5 16.8897 19.421 17.0303 19.2803C17.171 19.1397 17.25 18.9489 17.25 18.75C17.25 18.5511 17.171 18.3603 17.0303 18.2197C16.8897 18.079 16.6989 18 16.5 18H7.5ZM3.75 4.125C3.75 3.42881 4.02656 2.76113 4.51884 2.26884C5.01113 1.77656 5.67881 1.5 6.375 1.5H17.625C18.3212 1.5 18.9889 1.77656 19.4812 2.26884C19.9734 2.76113 20.25 3.42881 20.25 4.125V19.875C20.25 20.5712 19.9734 21.2389 19.4812 21.7312C18.9889 22.2234 18.3212 22.5 17.625 22.5H6.375C5.67881 22.5 5.01113 22.2234 4.51884 21.7312C4.02656 21.2389 3.75 20.5712 3.75 19.875V4.125ZM6.375 3C6.07663 3 5.79048 3.11853 5.5795 3.3295C5.36853 3.54048 5.25 3.82663 5.25 4.125V15H7.5V12.75C7.5 12.3522 7.65804 11.9706 7.93934 11.6893C8.22064 11.408 8.60218 11.25 9 11.25H15C15.3978 11.25 15.7794 11.408 16.0607 11.6893C16.342 11.9706 16.5 12.3522 16.5 12.75V15H18.75V4.125C18.75 3.82663 18.6315 3.54048 18.4205 3.3295C18.2095 3.11853 17.9234 3 17.625 3H6.375ZM5.25 19.875C5.25 20.1734 5.36853 20.4595 5.5795 20.6705C5.79048 20.8815 6.07663 21 6.375 21H17.625C17.9234 21 18.2095 20.8815 18.4205 20.6705C18.6315 20.4595 18.75 20.1734 18.75 19.875V16.5H5.25V19.875ZM15 12.75H9V15H15V12.75Z" fill="white"/>
                </svg>
                <span className="text-white font-semibold text-sm sm:text-base">Patient Records</span>
              </div>

              <div className="p-3 sm:p-4 space-y-3 bg-white">
                {patients.map((p) => (
                  <Row key={p.id} p={p} onOpen={setSelected} />
                ))}
              </div>

              {/* Empty State */}
              {patients.length === 0 && (
                <div className="p-8 text-center">
                  <div className="text-gray-400 text-sm">No patient records found</div>
                  <button 
                    onClick={handleNewRecord}
                    className="mt-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
                  >
                    Create First Record
                  </button>
                </div>
              )}
            </div>
          </main>
        ) : (
          <PatientDetail data={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </div>
  );
}

export default Page;