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
      <div className="min-h-screen flex">
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

        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-1">
                <Logo width={40} height={40} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Arogya AI</h1>
              <p className="font-semibold text-lg">REGISTER WITH US</p>
            </div>
            <div className="mb-6">
              <GoogleLogin 
                width="w-full" 
                height="h-12" 
                textSize="text-base" 
                onClick={handleGoogleLogin} 
              />
            </div>
            <div className="flex items-center mb-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-4 text-gray-500 text-sm">OR</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Registration Form */}
            <form className="space-y-4">
                  <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Email address
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                  <span className="text-gray-500 mr-2"><Mail /></span>
                  <input
                    type="email"
                    placeholder="Johndoe@gmail.com"
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                 Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                  <span className="text-gray-500 mr-2"><LockKeyhole /></span>
                  <input
                    type="password"
                    placeholder="•••• •••• ••••"
                    className="w-full outline-none bg-transparent tracking-widest"
                  />
                </div>
              </div>
              
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                  <span className="text-gray-500 mr-2"><LockKeyhole /></span>
                  <input
                    type="password"
                    placeholder="•••• •••• ••••"
                    className="w-full outline-none bg-transparent tracking-widest"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#2EB4B4] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#2EB4B4] transition-colors duration-200"
              >
                SIGN UP
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an  Account{' '}
                <Link href="/login" className="text-red-500 hover:text-red-500 font-medium">
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