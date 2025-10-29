'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import { Mic, NotepadText, Stethoscope, TriangleAlert, User } from 'lucide-react';

// Simple inline SVG icon to keep everything in JS
const AnalysisIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path strokeWidth="2" d="M9 3v4l-5.5 9.5A2 2 0 0 0 5.3 19H18.7a2 2 0 0 0 1.8-2.5L15 7V3" />
    <path strokeWidth="2" d="M9 7h6" />
  </svg>
);

function Pill({ text }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
      {text}
    </span>
  );
}

function InfoField({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-500 font-bold">{label}</label>
      <input
        readOnly
        value={value}
        className="h-10 px-3 rounded-md border border-gray-200 bg-gray-50 text-sm text-gray-700"
      />
    </div>
  );
}

// Common Card Component
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

// Custom Icons
const ReasonForVisitIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M16.996 9.013H17.004M17.004 7.009V4.505M7.50199 22H4.71799C4.39499 22 4.06999 21.954 3.77299 21.827C2.80699 21.412 2.31599 20.863 2.08799 20.52C2.02611 20.425 1.99571 20.3129 2.0011 20.1997C2.00648 20.0864 2.04738 19.9777 2.11799 19.889C3.23799 18.401 5.83399 17.503 7.50199 17.503M7.50699 22H10.29C10.614 22 10.938 21.954 11.235 21.827C12.202 21.412 12.692 20.863 12.921 20.52C12.9829 20.425 13.0133 20.3129 13.0079 20.1997C13.0025 20.0864 12.9616 19.9777 12.891 19.889C11.771 18.401 9.17499 17.503 7.50699 17.503M22 6.792C22 9.438 19.76 11.584 16.996 11.584C16.6707 11.584 16.348 11.554 16.028 11.494C15.798 11.451 15.684 11.43 15.603 11.442C15.523 11.454 15.409 11.514 15.183 11.636C14.5357 11.9811 13.7906 12.0971 13.069 11.965C13.343 11.627 13.529 11.222 13.612 10.788C13.662 10.523 13.538 10.265 13.352 10.076C12.4835 9.20339 11.9947 8.02314 11.992 6.792C11.992 4.146 14.232 2 16.996 2C19.76 2 22 4.146 22 6.792ZM10.285 12.289C10.2839 13.0249 9.99072 13.7303 9.4698 14.2501C8.94888 14.7698 8.24289 15.0615 7.50699 15.061C7.14244 15.0615 6.78136 14.9902 6.44436 14.8512C6.10736 14.7122 5.80104 14.5082 5.54289 14.2508C5.28475 13.9934 5.07983 13.6876 4.93983 13.351C4.79984 13.0144 4.72752 12.6535 4.72699 12.289C4.72739 11.9244 4.79961 11.5634 4.93955 11.2267C5.07948 10.89 5.28438 10.5841 5.54254 10.3266C5.8007 10.0691 6.10706 9.86496 6.44413 9.72587C6.78119 9.58679 7.14236 9.51547 7.50699 9.516C8.24306 9.51547 8.94921 9.80729 9.47015 10.3273C9.9911 10.8473 10.2842 11.5529 10.285 12.289Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TranscriptionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 27 27" fill="none">
    <path d="M13.2491 11.25L18.6829 12.7057M12.375 14.5102L15.6352 15.3832M22.851 14.2279C22.1704 16.7647 21.8306 18.0337 21.06 18.8561C20.4519 19.5054 19.665 19.9599 18.7987 20.1622C18.69 20.1877 18.5794 20.2072 18.4669 20.2207C17.4375 20.3479 16.1809 20.0115 13.8949 19.3995C11.358 18.7189 10.089 18.3791 9.26662 17.6085C8.61711 17.0001 8.16258 16.2128 7.96049 15.3461C7.70399 14.2481 8.04374 12.9802 8.72437 10.4434L9.30599 8.26987L9.58049 7.25174C10.0924 5.37749 10.4366 4.34587 11.097 3.64049C11.7052 2.99159 12.4921 2.53748 13.3582 2.33549C14.4562 2.07899 15.7252 2.41874 18.2632 3.09937C20.799 3.77887 22.068 4.11862 22.8904 4.88812C23.5401 5.4968 23.9946 6.28453 24.1965 7.15162C24.3776 7.92787 24.2606 8.78962 23.9366 10.125" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3.68103 18.7279C4.36053 21.2648 4.7014 22.5338 5.47203 23.3561C6.08011 24.0055 6.86699 24.46 7.73328 24.6623C8.83128 24.9176 10.1003 24.5779 12.6383 23.8984C15.174 23.2189 16.443 22.8791 17.2654 22.1085C17.8185 21.5905 18.2317 20.9411 18.4669 20.2208M9.58053 7.25064C9.18528 7.35339 8.7484 7.46964 8.2699 7.59939C5.73303 8.27889 4.46403 8.61864 3.64165 9.38814C2.99196 9.99683 2.53741 10.7846 2.33553 11.6516C2.1544 12.4279 2.2714 13.2896 2.5954 14.625" stroke="white" strokeWidth="1.6875" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DiagnosisIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
    <path d="M16.5887 6.96815C16.6362 6.77208 16.7457 6.59655 16.9008 6.46764C17.056 6.33872 17.2486 6.26329 17.45 6.25255C17.6515 6.24181 17.851 6.29634 18.019 6.40803C18.187 6.51972 18.3145 6.68261 18.3825 6.87252L20.9469 14.0625C21.86 14.0613 22.4394 13.8925 23.0531 13.4325C23.2332 13.2087 23.4506 13.0175 23.6956 12.8675L23.75 12.8125V12.8344C24.1301 12.6152 24.5611 12.4999 24.9999 12.5C25.4386 12.5002 25.8696 12.6158 26.2495 12.8352C26.6294 13.0547 26.9449 13.3703 27.1642 13.7503C27.3836 14.1303 27.499 14.5613 27.499 15C27.499 15.4388 27.3836 15.8698 27.1642 16.2498C26.9449 16.6298 26.6294 16.9453 26.2495 17.1648C25.8696 17.3843 25.4386 17.4999 24.9999 17.5C24.5611 17.5002 24.1301 17.3849 23.75 17.1657V17.1875L23.6944 17.1325C23.4631 16.9907 23.2569 16.8119 23.0831 16.605C22.5144 16.1925 21.98 16.0519 21.1888 16.0288H20.3175C20.1242 16.0287 19.9356 15.9688 19.7776 15.8574C19.6196 15.7459 19.5 15.5884 19.435 15.4063L17.6744 10.4688L14.6506 23.0319C14.6031 23.2286 14.4932 23.4047 14.3374 23.5338C14.1815 23.6629 13.988 23.7381 13.7859 23.7482C13.5838 23.7582 13.3838 23.7026 13.2159 23.5896C13.048 23.4766 12.9212 23.3123 12.8544 23.1213L9.32375 13.01L8.3725 15.4338C8.30368 15.6091 8.18363 15.7597 8.028 15.8658C7.87237 15.9719 7.68837 16.0287 7.5 16.0288H2.5V14.1538H6.86063L8.5025 9.97002C8.57253 9.79192 8.69539 9.63951 8.85457 9.53327C9.01376 9.42703 9.20164 9.37206 9.39299 9.37573C9.58433 9.37941 9.76997 9.44155 9.92496 9.55382C10.0799 9.66609 10.1969 9.82311 10.26 10.0038L13.5738 19.4944L16.5887 6.96815Z" fill="white"/>
  </svg>
);

function Page() {
  const [appointment, setAppointment] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedAppointment = localStorage.getItem('currentAppointment');
    if (storedAppointment) {
      setAppointment(JSON.parse(storedAppointment));
    }
  }, []);

       const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (!appointment) {
    return (
      <div className="flex min-h-screen bg-gray-50">
              <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <div className="flex-1 flex flex-col">
                  <Navbar onToggleSidebar={toggleSidebar} />

          <main className="p-6 md:p-8 bg-[#DEDEDE] flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">No appointment data found</h2>
              <p className="text-gray-500 mt-2">Please select an appointment from the appointments page.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 md:p-8 bg-[#DEDEDE]">
          <section className="p-2 mb-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start gap-4">
                <img 
                  src={appointment.avatar} 
                  alt={appointment.patientInfo.name}
                  className="h-11 w-11 rounded-full border-2 border-gray-100"
                />
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-lg md:text-xl font-semibold text-gray-900">{appointment.patientInfo.name}</h1>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${appointment.statusColor}`}>
                      {appointment.status}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                    {appointment.time} • {appointment.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-md bg-[#2EB4B4] text-white px-4 py-2 text-sm transition-colors duration-200">
                  <Mic size={16} /> Start Conversation
                </button>
              </div>
            </div>
          </section>

          {/* Top info grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Patient Information */}
            <Card 
              title="Patient Information" 
              icon={<User size={16} />}
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoField label="Name" value={appointment.patientInfo.name} />
                <InfoField label="Age" value={appointment.patientInfo.age} />
                <InfoField label="Gender" value={appointment.patientInfo.gender} />
              </div>
            </Card>

            {/* Allergies */}
            <Card title="Allergies" icon={<TriangleAlert size={16} />}>
              <div className="min-h-[56px] rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                <span className="text-gray-400 text-sm">{appointment.patientInfo.allergies}</span>
              </div>
            </Card>

            {/* Medical History */}
            <Card title="Medical History" icon={<NotepadText size={16} />}>
              <ul className="space-y-2 text-sm">
                {appointment.patientInfo.medicalHistory.map((condition, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <circle cx="7.5" cy="7.5" r="7.5" fill="#2EB4B4" />
                      <path d="M6.5101 9.82834C6.38855 9.82832 6.27199 9.78001 6.18606 9.69405L4.42606 7.93405C4.38228 7.89177 4.34736 7.8412 4.32334 7.78528C4.29932 7.72936 4.28668 7.66922 4.28615 7.60836C4.28562 7.5475 4.29722 7.48715 4.32026 7.43082C4.34331 7.37449 4.37734 7.32332 4.42038 7.28029C4.46341 7.23725 4.51458 7.20322 4.57091 7.18017C4.62724 7.15713 4.68759 7.14553 4.74845 7.14606C4.80931 7.14659 4.86945 7.15923 4.92537 7.18325C4.98129 7.20727 5.03186 7.24219 5.07414 7.28597L6.5101 8.72193L9.92606 5.30597C10.0125 5.22248 10.1283 5.17628 10.2484 5.17732C10.3686 5.17837 10.4836 5.22657 10.5686 5.31155C10.6535 5.39653 10.7017 5.51148 10.7028 5.63166C10.7038 5.75183 10.6576 5.86761 10.5741 5.95405L6.83414 9.69405C6.74821 9.78001 6.63165 9.82832 6.5101 9.82834Z" fill="white" />
                    </svg>
                    {condition}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Current Medications */}
            <Card title="Current Medications" icon={<Stethoscope size={16} />}>
              <ul className="space-y-2 text-sm">
                {appointment.patientInfo.currentMedications.map((medication, index) => (
                  <li key={index} className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <circle cx="7.5" cy="7.5" r="7.5" fill="#2EB4B4" />
                      <path d="M6.5101 9.82834C6.38855 9.82832 6.27199 9.78001 6.18606 9.69405L4.42606 7.93405C4.38228 7.89177 4.34736 7.8412 4.32334 7.78528C4.29932 7.72936 4.28668 7.66922 4.28615 7.60836C4.28562 7.5475 4.29722 7.48715 4.32026 7.43082C4.34331 7.37449 4.37734 7.32332 4.42038 7.28029C4.46341 7.23725 4.51458 7.20322 4.57091 7.18017C4.62724 7.15713 4.68759 7.14553 4.74845 7.14606C4.80931 7.14659 4.86945 7.15923 4.92537 7.18325C4.98129 7.20727 5.03186 7.24219 5.07414 7.28597L6.5101 8.72193L9.92606 5.30597C10.0125 5.22248 10.1283 5.17628 10.2484 5.17732C10.3686 5.17837 10.4836 5.22657 10.5686 5.31155C10.6535 5.39653 10.7017 5.51148 10.7028 5.63166C10.7038 5.75183 10.6576 5.86761 10.5741 5.95405L6.83414 9.69405C6.74821 9.78001 6.63165 9.82832 6.5101 9.82834Z" fill="white" />
                    </svg>
                    {medication}</li>
                ))}
              </ul>
            </Card>

            {/* Reason For Visit */}
            <Card title="Reason For Visit" icon={<ReasonForVisitIcon />}>
              <div className="text-sm text-gray-700">
                {appointment.patientInfo.reasonForVisit}
              </div>
            </Card>
          </section>

          {/* Transcription and Diagnosis */}
          <section className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Transcription */}
            <Card title="Transcription" icon={<TranscriptionIcon />}>
              <textarea readOnly
                value={appointment.transcription || ''}
                className="min-h-[240px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="Enter Clinical Notes Here Or Use Voice Dictation.."
              />
            </Card>

            {/* Diagnosis & Next Steps */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-4 py-3 bg-[#2EB4B4] rounded-t-lg">
                <h3 className="text-sm font-semibold text-white flex flex-row gap-1 items-center">
                  <DiagnosisIcon />
                  Diagnosis & Next Steps
                </h3>
              </div>
              <div className="p-4 grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-bold flex flex-row gap-1 items-center">
                    Diagnosis:
                  </label>
                  <input readOnly
                    value={appointment.diagnosis || ''}
                      placeholder="Enter Diagnosis"
                    className="h-10 px-3 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-bold">Next Steps</label>
                  <input readOnly
                    value={appointment.nextSteps || ''}
                    placeholder="Enter Next Steps"
                    className="h-10 px-3 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500 font-bold">Treatment</label>
                  <input readOnly
                    value={appointment.treatment || ''}
                    placeholder="Enter Treatment Plan"
                    className="h-10 px-3 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Footer actions */}
          <section className="mt-4 flex items-center justify-end gap-3">
            <button className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 text-sm transition-colors duration-200">
              Order Lab Tests
            </button>
            <button className="inline-flex items-center gap-2 rounded-md bg-[#2EB4B4] text-white px-4 py-2 text-sm transition-colors duration-200">
              Complete Visit
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Page;