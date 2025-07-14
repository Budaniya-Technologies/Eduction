"use client";
import React, { useState } from "react";
import Link from "next/link";

const plans = [
    {
        title: "Starter",
        price: "$0",
        period: "/mo",
        description: "Ideal for beginners to test and build ideas.",
        buttonText: "Join Starter",
        features: [
            "1 landing page",
            "1,000 visits/month",
            "Access to UI blocks",
            "50 conversion actions",
            "5% payment commission",
            "Real-time analytics",
        ],
    },
    {
        title: "Superior",
        price: "$8",
        period: "/mo",
        description: "For creators managing multiple projects.",
        buttonText: "Join Superior",
        features: [
            "All Starter features",
            "5 landing pages",
            "50,000 visits/month",
            "1,000 conversions",
            "1% payment commission",
        ],
    },
    {
        title: "Shipper",
        price: "$15",
        period: "/mo",
        description: "Perfect for businesses scaling operations.",
        buttonText: "Join Shipper",
        features: [
            "All Superior features",
            "20 landing pages",
            "200,000 visits/month",
            "5,000 conversions",
            "0% payment commission",
        ],
    },
];

const Price = () => {
    //   const [billing, setBilling] = useState("monthly");

    return (
        <section className="bg-white py-16 px-6 sm:px-12">
            {/* Billing Toggle */}

            {/* Pricing Cards */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className="border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
                    >
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900">{plan.title}</h3>
                            <p className="mt-2 text-sm text-gray-500">{plan.description}</p>

                            <div className="mt-6">
                                <span className="text-4xl font-bold text-indigo-600">
                                    {plan.price}
                                </span>
                                <span className="text-sm text-gray-500">{plan.period}</span>
                            </div>

                            <Link
                                href="/sign-up"
                                className="mt-6 block w-full text-center bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                            >
                                {plan.buttonText}
                            </Link>
                        </div>

                        <div className="border-t px-6 py-6 bg-gray-50 rounded-b-2xl">
                            <h4 className="text-sm font-semibold text-gray-700 mb-4">
                                What's Included
                            </h4>
                            <ul className="space-y-3 text-sm text-gray-600">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <svg
                                            className="h-5 w-5 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Price;
