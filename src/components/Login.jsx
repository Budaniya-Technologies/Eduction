'use client'
import React from 'react';
import Image from 'next/image';
import SchoolGirl from "../../public/assets/SchoolGirl.jpeg"

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gray-100 font-sans">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden">

        {/* Side Shoe Image */}
        <Image
          src={SchoolGirl}
          alt="School Girl"
          className="hidden md:block w-full h-full object-cover"
        />

        {/* Login Form */}
        <div className="p-10 sm:p-16 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
            Log in to your account
          </h2>

          <form className="space-y-6">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email address"
                className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
              />
              <label
                htmlFor="email"
                className="absolute left-1 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm"
              >
                Email address
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Password"
                className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
              />
              <label
                htmlFor="password"
                className="absolute left-1 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm"
              >
                Password
              </label>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-blue-600" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-4">
            <button className="flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-xl bg-white text-black hover:bg-gray-100 transition">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>           
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
