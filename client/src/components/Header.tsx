import { useState } from 'react';
import { Link } from 'wouter';
import profileImage from '../assets/IMG_2457.png';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-black border-b border-gold-dark sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <img src={profileImage} alt="RENNSZ" className="w-10 h-10 rounded-full object-cover border-2 border-gold" />
              <span className="text-2xl font-heading font-bold gold-gradient">RENNSZ</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="font-heading font-semibold text-gold hover:text-gold-light transition-colors">Home</a>
            <a href="#about" className="font-heading font-semibold text-white hover:text-gold transition-colors">About</a>
            <a href="#streams" className="font-heading font-semibold text-white hover:text-gold transition-colors">Streams</a>
            <a href="#gallery" className="font-heading font-semibold text-white hover:text-gold transition-colors">Gallery</a>
            <a href="#announcements" className="font-heading font-semibold text-white hover:text-gold transition-colors">Announcements</a>
            <a href="#contact" className="font-heading font-semibold text-white hover:text-gold transition-colors">Contact</a>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gold focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} pb-4 border-t border-gold-dark mt-1`}>
          <a href="#home" className="block py-3 px-4 text-gold font-heading font-semibold hover:bg-gray-900">Home</a>
          <a href="#about" className="block py-3 px-4 text-white font-heading font-semibold hover:bg-gray-900">About</a>
          <a href="#streams" className="block py-3 px-4 text-white font-heading font-semibold hover:bg-gray-900">Streams</a>
          <a href="#gallery" className="block py-3 px-4 text-white font-heading font-semibold hover:bg-gray-900">Gallery</a>
          <a href="#announcements" className="block py-3 px-4 text-white font-heading font-semibold hover:bg-gray-900">Announcements</a>
          <a href="#contact" className="block py-3 px-4 text-white font-heading font-semibold hover:bg-gray-900">Contact</a>
        </div>
      </div>
    </header>
  );
}
