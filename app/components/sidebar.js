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
      path: ['/appointments', '/appointment-details']
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
      path: ['/lab_report', '/liquid_report']    
    }
  ];

  // Set active item based on current route - FIXED version
  useEffect(() => {
    const currentItem = menuItems.find(item => {
      if (Array.isArray(item.path)) {
        // Check if current path matches any of the paths in the array
        return item.path.some(path => pathname === path || pathname.startsWith(path));
      } else {
        // Single path check
        return pathname === item.path || pathname.startsWith(item.path);
      }
    });
    
    if (currentItem) {
      setActiveItem(currentItem.id);
    } else {
      setActiveItem(''); // or set to default item if you have one
    }
  }, [pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    // Handle array path - use the first path as default
    const targetPath = Array.isArray(item.path) ? item.path[0] : item.path;
    router.push(targetPath);
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
          lg:static inset-y-0 left-0 z-50
          w-full  flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header with close button for mobile */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
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
                    ? 'text-[#2EB4B4]  border-l-4 border-[#2EB4B4] border-b-none' 
                    : ' border-transparent'
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
                      ? 'bg-[#2EB4B4] text-white' 
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