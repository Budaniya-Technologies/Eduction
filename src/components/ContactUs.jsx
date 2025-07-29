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
    <section className="min-h-screen bg-gray-200 p-2 flex justify-center items-center">
      <Toaster position="top-right" />
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden max-w-6xl w-full">
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-96 md:h-auto">
          <Image
            src="/assets/contactImg.jpeg"
            alt="Happy School Girl"
            fill
            className="object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 drop-shadow-md text-center">
            Contact Us
          </h2>

          <form className="space-y-4 p-6" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4 ">
              <div className="flex-1">
                <label className="block font-semibold mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 focus:outline-none text-black"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 focus:outline-none text-black"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2 focus:outline-none text-black"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2 focus:outline-none text-black"
                placeholder="Subject"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Message</label>
              <textarea
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2 focus:outline-none text-black"
                placeholder="Your message..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-600 transition"
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
