'use client';
import Logo from '../components/logo';
import React from 'react'
import doctorPic from '@/public/Mask group.png'
import Image from 'next/image';
import GoogleLogin from '../components/googleLogin';
import Link from 'next/link';
import { LockKeyhole, Mail, User } from 'lucide-react';


const Register = () => {
    const handleGoogleLogin = () => {
        alert("You are login by google");
    }
    
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-white">
        <div className="md:flex md:w-1/2 items-center justify-center p-4">
          <Image
            src={doctorPic}
            alt="Doctor illustration"
            width={600}
            height={500}
            priority
            className="object-contain max-w-full max-h-full"
          />
        </div>

        <div className="flex-1 flex items-center justify-center p-4 xs:p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-[400px] mx-auto">
            {/* Logo */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex justify-center mb-3">
                <Logo width={45} height={45} />
              </div>
              <h1 className="text-2xl font-bold sm:text-3xl text-gray-900 mb-4">Arogya AI</h1>
              <p className="font-semibold text-lg sn:text-xl">REGISTER WITH US</p>
            </div>
            <div className="mb-5 sm:mb-6">
              <GoogleLogin 
                width="w-full" 
                height="h-12 sm:h-14" 
                textSize="text-base" 
                onClick={handleGoogleLogin} 
              />
            </div>
          <div className="flex items-center mb-5 sm:mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-3 sm:px-4 text-gray-500 text-sm sm:text-base font-medium">OR</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

            {/* Registration Form */}
            <form className="space-y-4 sm:space-y-6">
                  <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                  <span className="text-gray-500 mr-2"><User /></span>
                  <input
                    type="text"
                    placeholder="Johndoe@gmail.com"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                  Enter Email address
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 sm:py-4 bg-white focus-within:ring-2 focus-within:ring-[#2EB4B4] focus-within:border-transparent transition-all duration-200">
                  <span className="text-gray-500 mr-3"><Mail  className="sm:w-5 sm:h-5"/></span>
                  <input
                    type="email"
                    placeholder="Johndoe@gmail.com"
                  className="w-full outline-none bg-transparent text-base sm:text-lg placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                 Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 sm:py-4 bg-white focus-within:ring-2 focus-within:ring-[#2EB4B4] focus-within:border-transparent transition-all duration-200">
                  <span className="text-gray-500 mr-3"><LockKeyhole className="sm:w-5 sm:h-5"/></span>
                  <input
                    type="password"
                    placeholder="•••• •••• ••••"
                  className="w-full outline-none bg-transparent tracking-widest text-base sm:text-lg placeholder-gray-400"
                  />
                </div>
              </div>
              
               <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Confirm Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 sm:py-4 bg-white focus-within:ring-2 focus-within:ring-[#2EB4B4] focus-within:border-transparent transition-all duration-200">
                  <span className="text-gray-500 mr-3"><LockKeyhole className="sm:w-5 sm:h-5" /></span>
                  <input
                    type="password"
                    placeholder="•••• •••• ••••"
                  className="w-full outline-none bg-transparent tracking-widest text-base sm:text-lg placeholder-gray-400"
                  />
                </div>
              </div>
              
              <button
                type="submit"
              className="w-full bg-[#2EB4B4] text-white py-3 sm:py-4 px-4 rounded-lg font-semibold text-lg sm:text-xl hover:bg-[#269999] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
              >
                SIGN UP
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6 sm:mt-8">
            <p className="text-gray-600 text-base sm:text-lg">
                Already have an  Account{' '}
                <Link href="/login" className="text-red-500 font-semibold transition-colors duration-200">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Register;