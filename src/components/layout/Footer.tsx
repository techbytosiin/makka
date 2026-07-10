import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, Settings } from 'lucide-react';
import Logo from '../ui/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text-main text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10">
                <Logo variant="light" className="w-full h-full" />
              </div>
              <span className="font-heading font-bold text-2xl text-white">Excel International</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Raising Future Leaders Through Excellence. We provide world-class education that shapes character and inspires academic brilliance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/admissions" className="text-gray-400 hover:text-white transition-colors text-sm">Admissions</Link></li>
              <li><Link to="/academics" className="text-gray-400 hover:text-white transition-colors text-sm">Academics</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white transition-colors text-sm">Gallery</Link></li>
              <li><Link to="/mission" className="text-gray-400 hover:text-white transition-colors text-sm">Mission</Link></li>
              <li><Link to="/vision" className="text-gray-400 hover:text-white transition-colors text-sm">Vision</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                <span>Benin City<br />Edo State<br />Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={20} className="text-primary shrink-0" />
                <span>07062213688</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={20} className="text-primary shrink-0" />
                <span>info@excelinternationalschool.edu.ng</span>
              </li>
            </ul>
          </div>

          {/* Map Placeholder */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Location</h3>
            <div className="w-full h-40 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center border border-gray-700">
              <MapPin size={32} className="text-gray-600 mb-2" />
              <span className="text-xs text-gray-500 absolute mt-12">Map Display</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Excel International School. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-gray-700 hover:text-gray-400 transition-colors" title="Admin Login">
              <Settings size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
