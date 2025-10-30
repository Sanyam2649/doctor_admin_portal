'use client';
import Image from "next/image";
import { Bell, Mic, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Navbar({ onToggleSidebar }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Debug: Check if prop is received
  useEffect(() => {
    console.log('Navbar mounted, onToggleSidebar function:', !!onToggleSidebar);
  }, [onToggleSidebar]);

  // Get user data from localStorage (set during login)
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser({
          name: "Dr. Sharma",
          email: "doctor@arogya.com"
        });
      }
    } else {
      setUser({
        name: "Dr. Sharma",
        email: "doctor@arogya.com"
      });
    }

    setNotifications([
      { id: 1, text: "New appointment booked", time: "5 min ago", read: false },
      { id: 2, text: "Lab results are ready", time: "1 hour ago", read: false },
      { id: 3, text: "Patient message received", time: "2 hours ago", read: true }
    ]);
  }, []);

  const handleMenuClick = () => {
    console.log('Menu button clicked');
    if (onToggleSidebar && typeof onToggleSidebar === 'function') {
      onToggleSidebar();
    } else {
      console.error('onToggleSidebar is not a function or not provided');
      console.log('onToggleSidebar value:', onToggleSidebar);
    }
  };

  const handleAskAI = () => {
    const questions = [
      "How can I help with patient diagnosis?",
      "Need medication recommendations?",
      "Looking for treatment plans?",
      "Want to analyze symptoms?"
    ];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    alert(`AI Assistant: ${randomQuestion}\n\nThis is a demo. In a real app, this would open an AI chat interface.`);
  };

  const handleNotificationClick = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const getUserInitials = (name) => {
    if (!name) return "U";
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };
  
  const handleAppointment = () => {
    router.push('./appointments')
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadNotificationsCount = notifications.filter(notif => !notif.read).length;

  return (
    <nav className="w-full flex items-center justify-between px-3 xs:px-4 sm:px-6 py-2 sm:py-3 bg-white">
      {/* Left Side - Menu Button */}
      <div className="flex items-center">
        <button 
          className="focus:outline-none p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={handleMenuClick} // Use the new handler
        >
          <span className="flex flex-col space-y-1">
            <span className="block w-5 sm:w-6 h-0.5 sm:h-1 bg-gray-700 rounded transition-all"></span>
            <span className="block w-4 sm:w-4 h-0.5 sm:h-1 bg-gray-700 rounded transition-all"></span>
            <span className="block w-3 sm:w-3 h-0.5 sm:h-1 bg-gray-700 rounded transition-all"></span>
          </span>
        </button>
      </div>

      {/* Rest of your navbar code remains the same */}
      <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4">
        {/* Ask AI Button */}
        <button 
          onClick={handleAskAI}
          className="flex items-center px-2 xs:px-3 py-1.5 xs:py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-[#2EB4B4] to-[#39B54A] text-white text-xs xs:text-sm font-semibold rounded-md sm:rounded-lg shadow hover:shadow-md transition-all duration-200 whitespace-nowrap"
        >
          <Mic className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 mr-1 xs:mr-2" />
          <span className="xs:inline">Ask AI Anything</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="bg-white border border-gray-200 p-1.5 xs:p-2 rounded-md sm:rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors relative"
          >
            <Bell className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] xs:text-xs rounded-full w-4 h-4 xs:w-5 xs:h-5 flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="    absolute sm:right-0 mt-2
    w-72 sm:w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50
    left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0">
              <div className="p-3 xs:p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 text-sm xs:text-base">Notifications</h3>
              </div>
              <div className="max-h-64 xs:max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`p-3 xs:p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <p className="text-xs xs:text-sm text-gray-800">{notification.text}</p>
                      <p className="text-[10px] xs:text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No notifications
                  </div>
                )}
              </div>
              <div className="p-2 border-t border-gray-200">
                <button 
                  onClick={markAllAsRead}
                  className="w-full text-center text-xs xs:text-sm text-[#2EB4B4] hover:text-[#269999] py-2"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User avatar and dropdown */}
        <div className="relative">
  <div className="flex items-center space-x-1 xs:space-x-2 p-1 xs:p-2">
    {/* User Avatar with fallback to initials */}
    <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full bg-[#2EB4B4] flex items-center justify-center border-2 border-white shadow">
      {user?.image ? (
        <Image
          src={user.image}
          alt={user?.name || 'User'}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      ) : (
        <span className="text-white font-semibold text-xs xs:text-sm sm:text-base">
          {getUserInitials(user?.name)}
        </span>
      )}
    </div>
    <span className="text-gray-800 font-medium text-sm xs:block">
      {user?.name || 'User'}
    </span>
    
    {/* Dropdown toggle button - only on the SVG icon */}
    <button 
      onClick={() => setShowDropdown(!showDropdown)}
      className="flex items-center justify-center p-1 rounded-md hover:bg-gray-200 transition-colors"
    >
      <svg
        className="w-4 h-4 xs:w-4 xs:h-4 text-gray-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>

  {/* User Dropdown Menu */}
  {showDropdown && (
    <div className="absolute right-0 mt-2 w-44 xs:w-48 sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <div className="p-3 xs:p-4 border-b border-gray-200">
        <p className="font-semibold text-gray-800 text-sm xs:text-base">{user?.name}</p>
        <p className="text-xs xs:text-sm text-gray-600 truncate">{user?.email}</p>
      </div>
      <div className="p-1 xs:p-2">
        <button className="w-full text-left px-2 xs:px-3 py-2 text-xs xs:text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          Profile Settings
        </button>
        <button 
     onClick={handleAppointment}
     className="w-full text-left px-2 xs:px-3 py-2 text-xs xs:text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          My Appointments
        </button>
        <button className="w-full text-left px-2 xs:px-3 py-2 text-xs xs:text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          Help & Support
        </button>
      </div>
      <div className="p-1 xs:p-2 border-t border-gray-200">
        <button 
          onClick={handleLogout}
          className="w-full text-left px-2 xs:px-3 py-2 text-xs xs:text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )}
</div>
      </div>
    </nav>
  );
}