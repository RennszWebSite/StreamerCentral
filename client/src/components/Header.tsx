import { useState } from 'react';
import { Link } from 'wouter';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-heading font-bold text-primary">RENNSZ</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="font-heading font-semibold text-primary hover:text-secondary transition-colors">Home</a>
            <a href="#about" className="font-heading font-semibold text-dark hover:text-primary transition-colors">About</a>
            <a href="#streams" className="font-heading font-semibold text-dark hover:text-primary transition-colors">Streams</a>
            <a href="#gallery" className="font-heading font-semibold text-dark hover:text-primary transition-colors">Gallery</a>
            <a href="#announcements" className="font-heading font-semibold text-dark hover:text-primary transition-colors">Announcements</a>
            <a href="#contact" className="font-heading font-semibold text-dark hover:text-primary transition-colors">Contact</a>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-dark focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} pb-4`}>
          <a href="#home" className="block py-2 px-4 text-primary font-heading font-semibold hover:bg-gray-50">Home</a>
          <a href="#about" className="block py-2 px-4 text-dark font-heading font-semibold hover:bg-gray-50">About</a>
          <a href="#streams" className="block py-2 px-4 text-dark font-heading font-semibold hover:bg-gray-50">Streams</a>
          <a href="#gallery" className="block py-2 px-4 text-dark font-heading font-semibold hover:bg-gray-50">Gallery</a>
          <a href="#announcements" className="block py-2 px-4 text-dark font-heading font-semibold hover:bg-gray-50">Announcements</a>
          <a href="#contact" className="block py-2 px-4 text-dark font-heading font-semibold hover:bg-gray-50">Contact</a>
        </div>
      </div>
    </header>
  );
}
