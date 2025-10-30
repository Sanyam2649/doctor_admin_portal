import React, { useState, useEffect } from 'react';
import Logo from './logo';
import { BriefcaseMedical, FlaskConical, NotebookText, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = ({ isOpen, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();
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

  // Set active item based on current route - FIXED version
  useEffect(() => {
    const currentItem = menuItems.find(item => 
      pathname === item.path || pathname.startsWith(item.path)
    );
    if (currentItem) {
      setActiveItem(currentItem.id);
    } else {
      setActiveItem('appointments');
    }
  }, [pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    router.push(item.path);
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header with close button for mobile */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Logo width={40} height={40} />
            <span className="font-bold text-lg text-gray-800">Arogya AI</span>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`
                  flex items-center w-full px-4 py-3
                  ${isActive 
                    ? 'text-[#2EB4B4]  border-l-4 border-[#2EB4B4] shadow-sm' 
                    : 'hover:bg-gray-50 border border-transparent'
                  }
                `}
              >
                <IconComponent 
                  className={`w-5 h-5 mr-3 ${
                    isActive ? 'text-[#2EB4B4]' : 'text-gray-500'
                  }`} 
                />
                <span className={`
                  font-medium flex-1 text-left
                  ${isActive ? 'text-[#2EB4B4] font-semibold' : 'text-gray-700'}
                `}>
                  {item.label}
                </span>
                {item.count !== null && (
                  <span className={`
                    text-xs rounded-full px-2 py-1 min-w-6 text-center font-semibold
                    ${isActive 
                      ? 'bg-[#2EB4B4]  text-white' 
                      : 'bg-gray-100 text-gray-600'
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