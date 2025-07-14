"use client";
import React from "react";

const Feature = () => {
  return (
    <section className="w-full flex flex-col md:flex-row py-24 bg-white">
      <div className="flex flex-col md:flex-row md:w-4/5 xl:w-3/5 mx-auto">
        {/* Left Section with 3 Images */}
        <div className="w-full px-4 md:px-0 md:w-8/12">
          <div className="flex flex-col md:flex-row w-full items-center">
            <img
              src="https://i.pinimg.com/736x/81/a6/19/81a619afcfed4a3acff290c92fb338e1.jpg"
              alt="Image 1"
              className="w-full md:w-1/3 md:pr-4 rounded-md"
            />
            <img
              src="https://i.pinimg.com/736x/7f/7c/a5/7f7ca5edce69dcca7dbc36e515aa752e.jpg"
              alt="Image 2"
              className="hidden md:inline w-full md:w-1/3 md:pr-4 rounded-md"
            />
            <img
              src="https://i.pinimg.com/736x/53/e6/ae/53e6aee539111d7e3825dce410661d10.jpg"
              alt="Image 3"
              className="hidden md:inline w-full md:w-1/3 rounded-md"
            />
          </div>

          {/* Description + Image */}
          <div className="w-[90%] md:w-full mx-auto flex flex-col mt-4 md:mt-0 md:flex-row">
            <div className="w-full lg:w-8/12 my-6 pr-4">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
                The <span className="text-emerald-600">Feature</span> component
              </h1>
              <h3 className="text-xl mt-6 text-gray-700">
                Use this component as a feature or showcase block.
              </h3>
              <p className="text-md mt-2 mb-4 text-gray-500">
                You can copy and paste it or modify it however you want. Feel free
                to customize or adapt it to your project’s needs.
              </p>
              <button className="rounded-md border border-emerald-500 bg-emerald-500 px-5 py-2 text-sm text-white hover:bg-white hover:text-emerald-600 hover:border-emerald-600 transition">
                Explore Now
              </button>
            </div>

            <div className="hidden lg:inline w-4/12 pl-6 my-6">
              <img
                src="https://i.pinimg.com/736x/13/0e/70/130e70b3e5eab454e0cc896f5a8ad659.jpg"
                alt="Showcase"
                className="w-full rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="w-full px-4 md:px-0 md:w-4/12 md:pl-8">
          <h1 className="text-3xl mt-2 font-semibold text-gray-800">
            The <span className="text-emerald-600">Feature</span> component
          </h1>
          <h3 className="text-xl mt-3 text-gray-700">
            Use it as a feature or showcase block.
          </h3>
          <p className="text-md mt-2 text-gray-500">
            This layout is perfect for highlighting functionality or key visuals
            in a clean and modern layout. Fully customizable and easy to adapt.
          </p>

          <img
            src="https://i.pinimg.com/736x/d5/8f/70/d58f70493cb90dcfda275661f47609f3.jpg"
            alt="Supporting Visual"
            className="w-full mt-4 rounded-sm"
          />

          <div className="flex justify-center gap-4 mt-6">
            <button className="rounded-md border border-emerald-500 bg-emerald-500 px-4 py-2 text-sm text-white hover:bg-white hover:text-emerald-600 hover:border-emerald-600 transition">
              Explore Previous
            </button>
            <button className="rounded-md border border-emerald-500 bg-emerald-500 px-4 py-2 text-sm text-white hover:bg-white hover:text-emerald-600 hover:border-emerald-600 transition">
              Explore Current
            </button>
            <button className="rounded-md border border-emerald-500 bg-emerald-500 px-4 py-2 text-sm text-white hover:bg-white hover:text-emerald-600 hover:border-emerald-600 transition">
              Explore Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
