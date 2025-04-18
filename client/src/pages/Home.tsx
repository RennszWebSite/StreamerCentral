import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import AnnouncementsSection from '../components/AnnouncementsSection';
import StreamsSection from '../components/StreamsSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'wouter';

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const onAuthSuccess = () => {
    closeAuthModal();
    setLocation('/admin');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <AnnouncementsSection />
        <StreamsSection />
        <AboutSection />
        <ContactSection />
      </main>
      
      <Footer onAdminClick={openAuthModal} />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        onSuccess={onAuthSuccess}
      />
    </div>
  );
}
