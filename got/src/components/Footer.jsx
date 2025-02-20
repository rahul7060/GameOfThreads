import React from 'react'

   
const Footer = () => {
  
    
      return (
        <footer className="bg-black text-white  py-10 px-6 md:px-16">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Support Section */}
            <div>
              <h3 className="font-semibold font-creep mb-2">SUPPORT</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Return Policy</li>
                <li>Shipping FAQ</li>
                <li>Contact Us</li>
              </ul>
            </div>
    
            {/* Shop Now Section */}
            <div>
              <h3 className="font-semibold mb-2">SHOP NOW</h3>
              <ul className="space-y-2 text-gray-400">
                <li>New Drop</li>
                <li>Tops</li>
                <li>Bottoms</li>
              </ul>
            </div>
    
            {/* Insider Signup Section */}
            <div>
              <h3 className="font-semibold mb-2">BECOME AN INSIDER</h3>
              <p className="text-gray-400 text-sm mb-4">
                Get 10% OFF your first order when you join EDGE.
              </p>
            
          </div>
    </div>
          {/* Bottom Section */}
          <div className="mt-8 text-center text-gray-400 text-sm">
            <div className="flex justify-center items-center gap-2 cursor-pointer">
              <span className="flex items-center gap-1">
                <span className="inline-block w-5 h-5 bg-[url('/us-flag.svg')] bg-cover"></span>
         
              </span>

            </div>
            <p className="mt-2"> 2025 Game Of Threads</p>
        
          </div>
        </footer>
      );
    }
    



export default Footer;