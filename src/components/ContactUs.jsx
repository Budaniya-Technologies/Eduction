"use client";
import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { apiPost } from "../../Utils/http";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, subject, message } = formData;
    const payload = {
      name: `${firstName} ${lastName}`.trim(),
      email,
      subject,
      message,
    };

    try {
      const res = await apiPost("api/contact-messages/", payload);
      if (res.data.success) {
        toast.success(res.data.message || "Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      toast.error("Failed to send message.");
      console.error(err);
    }
  };

  return (
    <section className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex justify-center items-center">
      <Toaster position="top-right" />
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden max-w-6xl w-full mb-10">
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-64 sm:h-80 md:h-auto">
          <Image
            src="/assets/contactImg.jpeg"
            alt="Contact"
            fill
            className="object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-6 text-center drop-shadow-md">
            Contact Us
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm sm:text-base font-semibold mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 sm:py-2.5 focus:outline-none text-black text-sm sm:text-base"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm sm:text-base font-semibold mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 sm:py-2.5 focus:outline-none text-black text-sm sm:text-base"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm sm:text-base font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 sm:py-2.5 focus:outline-none text-black text-sm sm:text-base"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-semibold mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 sm:py-2.5 focus:outline-none text-black text-sm sm:text-base"
                placeholder="Subject"
                required
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-semibold mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 sm:py-2.5 focus:outline-none text-black text-sm sm:text-base"
                placeholder="Your message..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
