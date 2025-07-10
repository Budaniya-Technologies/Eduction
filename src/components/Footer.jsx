import { FaFacebookF, FaYoutube, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="hidden md:block bg-blue-600 text-white px-6 py-20">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <h2 className="text-3xl font-bold mb-2">🎓 GURUKUL</h2>
            <p className="text-sm leading-relaxed text-white/90">
              Lorem Ipsum available, but the majority have suffered alteration
              in some form, by injected humour, or randomised words.
            </p>
          </div>

          {/* Gurukul Links */}
          <div>
            <h3 className="text-lg font-semibold border-b-2 border-cyan-300 inline-block mb-2">GURUKUL</h3>
            <ul className="space-y-1 mt-3 text-white/90">
              <li><a href="#" className="hover:text-cyan-200">Home</a></li>
              <li><a href="#" className="hover:text-cyan-200">About Us</a></li>
              <li><a href="#" className="hover:text-cyan-200">Features</a></li>
              <li><a href="#" className="hover:text-cyan-200">Courses</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold border-b-2 border-cyan-300 inline-block mb-2">Resources</h3>
            <ul className="space-y-1 mt-3 text-white/90">
              <li><a href="#" className="hover:text-cyan-200">Documentation</a></li>
              <li><a href="#" className="hover:text-cyan-200">Tutorials</a></li>
              <li><a href="#" className="hover:text-cyan-200">Support</a></li>
              <li><a href="#" className="hover:text-cyan-200">Courses</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold border-b-2 border-cyan-300 inline-block mb-2">CONTACT US</h3>
            <div className="mt-3 text-sm leading-6 text-white/90">
              <p>127 North Stt<br />Suite 420<br />Carrington NC 27601</p>
              <p className="mt-2">Phone: 919-555-3333</p>
              <p>Fax: 919-555-3344</p>
              <p>Email: shopname@ourbrand.com</p>
            </div>
          </div>
        </div>

        {/* Social Icons & Copyright */}
        <div className="border-t border-white/30 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 text-black">
            <div className="bg-white p-2 rounded-full hover:bg-cyan-200">
              <FaFacebookF />
            </div>
            <div className="bg-white p-2 rounded-full hover:bg-cyan-200">
              <FaYoutube />
            </div>
            <div className="bg-white p-2 rounded-full hover:bg-cyan-200">
              <FaXTwitter />
            </div>
            <div className="bg-white p-2 rounded-full hover:bg-cyan-200">
              <FaLinkedinIn />
            </div>
          </div>

          <p className="text-white/70 text-sm">
            © Copyright 2025. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
