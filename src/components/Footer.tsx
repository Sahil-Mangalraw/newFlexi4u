import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/assets/flexi4ulogo.jpg" alt="Flexi4U logo" className="w-10 h-10 rounded-lg object-contain bg-white" />
              <span className="text-2xl font-bold">Flexi4U</span>
            </div>
            <p className="text-amber-100 mb-4 max-w-md">
              Your Personal Physiotherapy & Wellness Partner. Experience the future of healthcare with 
              AI-powered diagnosis, professional home sessions, and dedicated intern support.
            </p>
            <p className="text-amber-200 text-sm">Technology meets Compassion.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-amber-100 hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="text-amber-100 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/doctor-registration" className="text-amber-100 hover:text-white transition-colors">Join as Doctor</a></li>
              <li><a href="/patient-registration" className="text-amber-100 hover:text-white transition-colors">Book Appointment</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-amber-100">piyushkumar54197@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-amber-100">+91 9135033924</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-amber-100">Jaipur, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-8 text-center">
          <p className="text-amber-100">&copy; 2025 Flexi4U. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;