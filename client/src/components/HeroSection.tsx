import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import heroImage from '../assets/IMG_2456.png';

export default function HeroSection() {
  const [activeStream, setActiveStream] = useState<'rennsz' | 'rennszino'>('rennsz');

  // Fetch active stream setting from the server
  useEffect(() => {
    async function fetchActiveStream() {
      try {
        const response = await fetch('/api/settings/stream');
        if (response.ok) {
          const data = await response.json();
          setActiveStream(data.activeStream);
        }
      } catch (error) {
        console.error('Failed to fetch active stream setting:', error);
      }
    }

    fetchActiveStream();
  }, []);

  const switchToMainStream = () => {
    setActiveStream('rennsz');
  };

  const switchToGamingStream = () => {
    setActiveStream('rennszino');
  };

  return (
    <section id="home" className="relative overflow-hidden h-[700px] bg-dark">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${heroImage})` 
        }}
      >
        <div className="absolute inset-0 hero-overlay"></div>
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-accent font-bold mb-4">Exploring The World With RENNSZ</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-heading">Join the journey as we discover the world's most luxurious destinations</p>
        </div>
        
        <div className="w-full max-w-5xl aspect-video bg-black rounded-lg shadow-2xl overflow-hidden">
          {/* Direct Twitch iframe embed */}
          <div className="w-full h-full relative">
            <div className="aspect-video w-full h-full">
              <iframe
                src={`https://player.twitch.tv/?channel=${activeStream}&parent=${window.location.hostname.split(':')[0]}&parent=replit.com&parent=replit.dev&parent=janeway.replit.dev`}
                frameBorder="0"
                allowFullScreen={true}
                scrolling="no"
                width="100%"
                height="100%"
                title={`${activeStream} Twitch stream`}
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
            
            {/* Fallback link if iframe fails */}
            <div className="absolute bottom-4 right-4">
              <a
                href={`https://twitch.tv/${activeStream}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary hover:bg-primary/90 text-white text-sm font-bold py-1 px-3 rounded transition-colors shadow-lg"
              >
                Watch on Twitch
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button 
            onClick={switchToMainStream}
            className={`px-6 py-3 font-heading font-bold rounded-lg transition-colors ${
              activeStream === 'rennsz' 
                ? 'bg-gold text-black hover:bg-gold/90' 
                : 'bg-black border border-gold text-gold hover:bg-gold hover:text-black'
            }`}
          >
            Watch IRL Stream
          </Button>
          <Button 
            onClick={switchToGamingStream}
            className={`px-6 py-3 font-heading font-bold rounded-lg transition-colors ${
              activeStream === 'rennszino' 
                ? 'bg-gold text-black hover:bg-gold/90' 
                : 'bg-black border border-gold text-gold hover:bg-gold hover:text-black'
            }`}
          >
            Watch Gaming Stream
          </Button>
        </div>
      </div>
    </section>
  );
}
