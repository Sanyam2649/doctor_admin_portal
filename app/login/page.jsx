'use client';
import Logo from '../components/logo';
import React, { useState } from 'react'
import doctorPic from '@/public/Mask group.png'
import Image from 'next/image';
import GoogleLogin from '../components/googleLogin';
import Link from 'next/link';
import { LockKeyhole, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Dummy user data
const dummyUsers = [
  {
    id: 1,
    email: "john@example.com",
    password: "password123",
    name: "John Doe"
  },
  {
    id: 2,
    email: "jane@example.com",
    password: "password123",
    name: "Jane Smith"
  },
  {
    id: 3,
    email: "doctor@arogya.com",
    password: "healthcare",
    name: "Dr. Sharma"
  }
];

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = () => {
    alert("You are login by google");
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const user = dummyUsers.find(
        user => user.email === formData.email && user.password === formData.password
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/appointments');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Image Section - Hidden on mobile, visible on medium screens and up */}
      <div className="hidden sm:flex lg:w-1/2 items-center justify-center p-4 bg-gray-50">
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src={doctorPic}
            alt="Doctor illustration"
            width={500}
            height={400}
            priority
            className="object-contain w-auto h-auto max-w-full max-h-[70vh] lg:max-h-[80vh]"
            style={{ 
              maxWidth: 'min(100%, 500px)',
              maxHeight: 'min(70vh, 400px)'
            }}
          />
        </div>
      </div>

      {/* Mobile Image - Only show on very small screens if needed */}
      <div className="sm:hidden flex justify-center pt-6 pb-2 bg-gray-50">
        <Image
          src={doctorPic}
          alt="Doctor illustration"
          width={200}
          height={150}
          priority
          className="object-contain"
        />
      </div>

      {/* Form Section - Full width on mobile, half on desktop */}
      <div className="flex-1 flex items-center justify-center p-4 xs:p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-[400px] mx-auto">
          {/* Logo */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-3">
              <Logo width={45} height={45} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Arogya AI</h1>
            <p className="font-semibold text-lg sm:text-xl text-gray-700">LOGIN WITH US</p>
          </div>

          {/* Google Login */}
          <div className="mb-5 sm:mb-6">
            <GoogleLogin 
              width="w-full" 
              height="h-12 sm:h-14" 
              textSize="text-base sm:text-lg" 
              onClick={handleGoogleLogin} 
            />
          </div>

          {/* Divider */}
          <div className="flex items-center mb-5 sm:mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-3 sm:px-4 text-gray-500 text-sm sm:text-base font-medium">OR</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Enter Email address
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 sm:py-4 bg-white focus-within:ring-2 focus-within:ring-[#2EB4B4] focus-within:border-transparent transition-all duration-200">
                <span className="text-gray-500 mr-3">
                  <Mail size={20} className="sm:w-5 sm:h-5" />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Johndoe@gmail.com"
                  className="w-full outline-none bg-transparent text-base sm:text-lg placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Your Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 sm:py-4 bg-white focus-within:ring-2 focus-within:ring-[#2EB4B4] focus-within:border-transparent transition-all duration-200">
                <span className="text-gray-500 mr-3">
                  <LockKeyhole size={20} className="sm:w-5 sm:h-5" />
                </span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full outline-none bg-transparent tracking-widest text-base sm:text-lg placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-sm sm:text-base underline transition-colors duration-200 font-medium">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2EB4B4] text-white py-3 sm:py-4 px-4 rounded-lg font-semibold text-lg sm:text-xl hover:bg-[#269999] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  LOGGING IN...
                </>
              ) : (
                'LOGIN'
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center mt-6 sm:mt-8">
            <p className="text-gray-600 text-base sm:text-lg">
              Don&apos;t have Account?{' '}
              <Link href="/register" className="text-red-500 font-semibold transition-colors duration-200">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;