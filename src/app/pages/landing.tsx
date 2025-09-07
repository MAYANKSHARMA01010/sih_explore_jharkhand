import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#3b2b20] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-teal-500 text-white font-bold text-lg px-2 py-1 rounded-lg">EJ</div>
            <h2 className="text-xl font-bold">Explore Jharkhand</h2>
          </div>
          <p className="text-sm leading-6 mb-4">
            Discover the hidden gems of Jharkhand with AI-powered travel planning,
            authentic cultural experiences, and sustainable eco-tourism that
            empowers local communities.
          </p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2"><MapPin size={16}/> Ranchi, Jharkhand, India</p>
            <p className="flex items-center gap-2"><Phone size={16}/> +91 12345 67890</p>
            <p className="flex items-center gap-2"><Mail size={16}/> hello@explorejharkhand.com</p>
          </div>
          <div className="flex gap-3 mt-4">
            <a href="#" className="p-2 bg-[#4b3a2f] rounded-lg hover:bg-teal-600"><Facebook size={16}/></a>
            <a href="#" className="p-2 bg-[#4b3a2f] rounded-lg hover:bg-teal-600"><Twitter size={16}/></a>
            <a href="#" className="p-2 bg-[#4b3a2f] rounded-lg hover:bg-teal-600"><Instagram size={16}/></a>
            <a href="#" className="p-2 bg-[#4b3a2f] rounded-lg hover:bg-teal-600"><Youtube size={16}/></a>
          </div>
        </div>

        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline hover:text-green-400 hover:scale-105 transform transition-all duration-200 inline-block">Our Story</a></li>
            <li><a href="#" className="hover:underline hover:text-green-400 hover:scale-105 transform transition-all duration-200 inline-block">Team</a></li>
            <li><a href="#" className="hover:underline hover:text-green-400 hover:scale-105 transform transition-all duration-200 inline-block">Careers</a></li>
            <li><a href="#" className="hover:underline hover:text-green-400 hover:scale-105 transform transition-all duration-200 inline-block">Press Kit</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline hover:text-green-400 hover:scale-105 transform transition-all duration-200 inline-block">AI Trip Planner</a></li>
            <li><a href="#" className="hover:underline hover:text-green-400 hover:scale-105 transform transition-all duration-200 inline-block">Local Guides</a></li>
            <li><a href="#" className="hover:underline hover:text-green-400 hover:scale-105 transform transition-all duration-200 inline-block">Homestays</a></li>
            <li><a href="#" className="hover:underline hover:text-green-400 hover:scale-105 transform transition-all duration-200 inline-block">Marketplace</a></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Community</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline hover:text-green-400 hover:scale-105 transform transition-all duration-200 inline-block">Become a Guide</a></li>
            <li><a href="#" className="hover:underline hover:text-green-400 hover:scale-105 transform transition-all duration-200 inline-block">Sell Handicrafts</a></li>
            <li><a href="#" className="hover:underline hover:text-green-400 hover:scale-105 transform transition-all duration-200 inline-block">Host Travelers</a></li>
            <li><a href="#" className="hover:underline hover:text-green-400 hover:scale-105 transform transition-all duration-200 inline-block">Partner with Us</a></li>
          </ul>
        </div>
      </div>

      {/* Government Partnerships */}
      <div className="border-t border-gray-600 mt-10 pt-6 text-center text-gray-300">
        <h3 className="font-semibold mb-2">Government Partnerships</h3>
        <p className="text-sm space-x-4">
          <span>Jharkhand Tourism Board</span> • 
          <span>Ministry of Tourism, India</span> • 
          <span>Digital India Initiative</span> • 
          <span>Startup India</span>
        </p>
      </div>

      {/* Tagline + Policies */}
      <div className="border-t border-gray-600 mt-6 pt-6 max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between text-sm text-gray-300">
        <p>© {new Date().getFullYear()} Explore Jharkhand. All rights reserved.</p>
        <p className="text-green-500">Explore Jharkhand — where culture meets technology</p>
        <div className="flex gap-6">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
