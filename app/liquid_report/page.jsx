'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

// Card component
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

function Page() {
  const [dragActive, setDragActive] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Get appointment data from localStorage
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
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setUploadedFiles(prev => [...prev, ...files]);
      console.log('Files dropped:', files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
      console.log('Files selected:', files);
    }
  };

  const handleDownloadDicom = () => {
    alert('Downloading DICOM image...');
    // Implement actual DICOM download logic
  };

  const handleDownloadReport = () => {
    alert('Downloading generated report...');
    // Implement actual report download logic
  };

  const handleAddToPatientRecord = () => {
    alert('Adding report to patient record...');
  };

  if (!appointment) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-8 bg-[#E8EEF3] flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">No report data found</h2>
              <p className="text-gray-500 mt-2">Please select a report from the radiology reports page.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col">
        <Navbar onToggleSidebar={toggleSidebar} />
        <main className="p-4 sm:p-6 lg:p-8 bg-[#E8EEF3]">
          {/* Header Section */}
          <div className="p-2 mb-4 sm:mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Lipid Panel</h1>
                <span className="bg-[#F9C566] text-white text-xs font-semibold px-3 py-1 rounded whitespace-nowrap">
                  In Progress
                </span>
              </div>
              <div className="text-left lg:text-right">
                <div className="text-sm font-semibold text-gray-800">Mike Brown Wellness Family Practice</div>
                <div className="text-xs text-gray-600 hidden sm:block">
                  70 Washington Square South, New York, NY 10012, United States
                </div>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span>
                Patient: <span className="text-[#2EB4B4] font-semibold">
                  {appointment.patientInfo?.name || appointment.patientName} 
                  {appointment.patientInfo && ` (${appointment.patientInfo.age}, ${appointment.patientInfo.gender?.charAt(0)})`}
                </span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span>ReportID: Lab-00{appointment.id}</span>
            </div>
          </div>

          {/* Upload Section */}
          <div
            className={`bg-white rounded-lg border-2 border-dashed ${
              dragActive ? 'border-[#2EB4B4] bg-teal-50' : 'border-gray-300'
            } p-6 sm:p-8 lg:p-12 mb-4 sm:mb-6 text-center transition-all duration-200`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 text-center">
                Drag & Drop Files Here Or Click To Upload
              </h3>
              <p className="text-sm text-gray-500 mb-4 text-center">
                PDFs, Lab Reports, Local Schedules, docs
              </p>
            </div>
          </div>

          {/* Uploaded Files Preview */}
          {uploadedFiles.length > 0 && (
            <div className="bg-white rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Uploaded Files:</h4>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700 truncate">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6 justify-center">
            <button 
              onClick={handleDownloadDicom}
              className="bg-[#2EB4B4] text-white px-4 sm:px-6 py-2.5 rounded-lg font-semibold hover:bg-[#259999] transition-colors duration-200 whitespace-nowrap"
            >
              Download Dicom Image
            </button>
            <button 
              onClick={handleDownloadReport}
              className="bg-white border border-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 whitespace-nowrap"
            >
              Download Generated Report
            </button>
          </div>

          {/* Analysis Card */}
          <Card
            title="Analysis"
            icon={
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            }
            className="w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Clinical Findings */}
              <div className="lg:border-r lg:border-gray-200 lg:pr-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h4 className="font-semibold text-gray-900">Clinical Findings</h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  There Is A Large 5.0 Cm Cavitary Mass Located In The Right Lower Lobe Consolidation, Ground-Glass Opacities, Pleural Effusion. 
                  Pneumothorax Or Lymph Adenopathy Are Also Observed.
                </p>

                <div className="flex items-center gap-2 mb-2 mt-6">
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <h4 className="font-semibold text-gray-900">Urgency Level</h4>
                </div>
                <span className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">
                  PRIORITY
                </span>
              </div>

              {/* Diagnosis */}
              <div className="lg:pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <h4 className="font-semibold text-gray-900">Diagnosis</h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Suggestive Cavitary Mass In The Right Lower Lobe, Differential Includes Malignancy (e.g. primary lung cancer) Or Infectious Pathology (abscess).
                </p>

                <div className="flex items-center gap-2 mb-2 mt-6">
                  <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <h4 className="font-semibold text-gray-900">Recommended Actions</h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Immediate Clinical Correlation, Urgent Referral To Pulmonology Or Microbiological Studies To Determine Aetiology. Consider PET-CT For Staging If Malignancy Is Suspected. Close Clinical Follow-Up And Possible Initiation Of Empiric Antibiotics If Infection Is Suspected.
                </p>
              </div>
            </div>
          </Card>

          {/* Add to Patient Record Button */}
          <div className="flex justify-end mt-4 sm:mt-6">
            <button 
              onClick={handleAddToPatientRecord}
              className="bg-[#2EB4B4] text-white px-4 sm:px-6 py-2.5 rounded-lg font-semibold hover:bg-[#259999] transition-colors duration-200 w-full sm:w-auto text-center"
            >
              Add To Patient Record
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;