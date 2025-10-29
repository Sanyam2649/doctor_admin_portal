import React, { useState, useEffect } from 'react';
import Logo from './logo';
import { BriefcaseMedical, FlaskConical, NotebookText, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Sidebar = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('');

  const menuItems = [
    {
      id: 'appointments',
      label: 'Appointments',
      icon: BriefcaseMedical,
      count: 12,
      path: '/appointments'
    },
    {
      id: 'patient-records',
      label: 'Patient Records',
      icon: NotebookText,
      count: 5,
      path: '/patient-record'
    },
    {
      id: 'radiology',
      label: 'Radiology',
      icon: FlaskConical,
      count: 5,
      path: '/lab_report'
    }
  ];

  // Set active item based on current route
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentItem = menuItems.find(item => 
      currentPath === item.path || currentPath.startsWith(item.path + '/')
    );
    if (currentItem) {
      setActiveItem(currentItem.id);
    } else {
      setActiveItem('appointments');
    }
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    router.push(item.path);
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && window.innerWidth < 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(event.target)) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        id="sidebar"
        className={`
          fixed md:static top-0 left-0 z-50
          w-64 min-h-screen bg-white shadow-md border-r border-blue-200 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header with close button for mobile */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <div className="flex items-center gap-2">
            <Logo width={40} height={40} />
            <span className="font-bold text-lg text-gray-800">Arogya AI</span>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col mt-2 space-y-2 p-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`
                  flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-cyan-50' 
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                <IconComponent 
                  className={`w-5 h-5 mr-3 ${
                    isActive ? 'text-cyan-400' : 'text-gray-500'
                  }`} 
                />
                <span className={`
                  font-medium flex-1 text-left
                  ${isActive ? 'text-cyan-400 font-semibold' : 'text-gray-700'}
                `}>
                  {item.label}
                </span>
                {item.count !== null && (
                  <span className={`
                    text-xs rounded-md px-2 py-1 font-bold
                    ${isActive 
                      ? 'bg-cyan-400 bg-opacity-10 text-white' 
                      : 'bg-gray-200 text-gray-400'
                    }
                  `}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;