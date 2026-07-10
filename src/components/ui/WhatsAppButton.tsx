import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      {isHovered && (
        <div className="mr-4 bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-text-main animate-fade-in">
          Chat with Us
        </div>
      )}
      <a
        href="https://wa.me/2347062213688"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center justify-center w-14 h-14 bg-success text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat on WhatsApp"
      >
        <div className="absolute inset-0 rounded-full bg-success opacity-50 animate-ping group-hover:animate-none"></div>
        <MessageCircle size={28} className="relative z-10" />
      </a>
    </div>
  );
}
