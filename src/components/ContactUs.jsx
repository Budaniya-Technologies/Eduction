import Image from "next/image";

const ContactUs = () => {
  return (
    <section className="min-h-screen bg-gray-200 p-2 flex justify-center items-center">
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

          <form className="space-y-4 p-6">
            {/* First & Last Name */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1">First Name</label>
                <input
                  type="text"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none"
                  placeholder="First Name"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1">Last Name</label>
                <input
                  type="text"
                  className="w-full border rounded-md px-4 py-2 focus:outline-none"
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                className="w-full border rounded-md px-4 py-2 focus:outline-none"
                placeholder="Email"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block font-semibold mb-1">Subject</label>
              <input
                type="text"
                className="w-full border rounded-md px-4 py-2 focus:outline-none"
                placeholder="Subject"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block font-semibold mb-1">Message</label>
              <textarea
                rows="3"
                className="w-full border rounded-md px-4 py-2 focus:outline-none"
                placeholder="Your message..."
              ></textarea>
            </div>

            {/* Button */}
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
