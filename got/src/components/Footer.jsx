import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white p-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
        {/* Support Section */}
        <div>
          <h4 className="text-lg font-creep   mb-2">SUPPORT</h4>
          <p>Mon - Sat | 9:00AM to 9:00PM (EST)</p>
          <p>Excludes Public Holidays</p>
          <p>Chat with us or send an email. We respond within 24-48 hours.</p>
        </div>

        {/* Order Section */}
        <div>
          <h4 className="text-lg font-creep   mb-2">ORDER</h4>
          <ul className="space-y-1">
            <li><a href="#">Track</a></li>
            <li><a href="#">Exchange & Return</a></li>
            <li><a href="#">Become Insider</a></li>
          </ul>
        </div>

        {/* Information Section */}
        <div>
          <h4 className="text-lg font-creep  font-bold mb-2">INFORMATION</h4>
          <ul className="space-y-1">
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Get 20% OFF</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h4 className="text-lg font-creep  font-bold mb-2">SOCIAL MEDIA</h4>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://www.instagram.com/">
              <img src="image/Instagram.png" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="https://wa.me/message">
              <img src="image/WhatsApp.png" alt="WhatsApp" className="w-6 h-6" />
            </a>
          </div>
          <p className="mt-4">All rights reserved</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-black text-white font-creep  text-center mt-6 p-4 border-t border-gray-700">
        <p>© 2025 GAME OF THREAD</p>
      </div>
    </footer>
  );
};

export default Footer;
