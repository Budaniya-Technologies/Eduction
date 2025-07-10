"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import SchoolGirl from "../../public/assets/SchoolGirl.jpeg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center overflow-hidden px-4">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-3xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* Left Image Section (Desktop only) */}
        <div className="hidden md:block relative">
          <Image
            src={SchoolGirl}
            alt="School Girl"
            layout="fill"
            objectFit="cover"
            className="rounded-l-3xl"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full px-6 py-10 sm:px-10 sm:py-14 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
            {isLogin ? "Log in to your account" : "Create your account"}
          </h2>

          <form className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
                />
                <label className="absolute left-1 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm">
                  Full Name
                </label>
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
              />
              <label className="absolute left-1 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm">
                Email address
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
              />
              <label className="absolute left-1 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm">
                Password
              </label>
            </div>

            {!isLogin && (
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Confirm Password"
                  className="peer w-full border-b-2 border-gray-300 placeholder-transparent focus:outline-none focus:border-blue-500 text-gray-900 py-3 px-1"
                />
                <label className="absolute left-1 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm">
                  Confirm Password
                </label>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input type="checkbox" className="accent-blue-600" />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social */}
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

          {/* Toggle Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:underline"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
