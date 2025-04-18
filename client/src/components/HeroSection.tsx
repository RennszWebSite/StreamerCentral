import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const [activeStream, setActiveStream] = useState<'rennsz' | 'rennszino'>('rennsz');
  const twitchEmbedRef = useRef<HTMLDivElement>(null);
  const [playerCreated, setPlayerCreated] = useState(false);

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

  // Initialize and update Twitch player
  useEffect(() => {
    if (!twitchEmbedRef.current || typeof window.Twitch === 'undefined') {
      return;
    }

    // Clear previous embed if it exists
    if (twitchEmbedRef.current.innerHTML !== '') {
      twitchEmbedRef.current.innerHTML = '';
    }

    // Create new player
    const options = {
      width: '100%',
      height: '100%',
      channel: activeStream,
      parent: window.location.hostname.split(':')[0],
      autoplay: true,
    };

    try {
      const player = new window.Twitch.Embed(twitchEmbedRef.current, options);
      setPlayerCreated(true);
      
      player.addEventListener(window.Twitch.Embed.VIDEO_READY, () => {
        console.log('Player is ready');
      });
    } catch (error) {
      console.error('Failed to initialize Twitch player:', error);
    }
  }, [activeStream]);

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
          backgroundImage: "url('https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" 
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
          {/* Twitch embed container */}
          <div id="twitch-embed" ref={twitchEmbedRef} className="w-full h-full">
            {!playerCreated && (
              <div className="flex items-center justify-center h-full bg-gray-900">
                <div className="text-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-white text-sm font-bold mb-4">
                    <span className="w-2 h-2 bg-white rounded-full mr-2 live-indicator"></span>
                    LOADING STREAM
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white">
                    {activeStream === 'rennsz' 
                      ? "Loading RENNSZ's IRL stream..." 
                      : "Loading RENNSZINO's gaming stream..."}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button 
            onClick={switchToMainStream}
            className={`px-6 py-3 font-heading font-bold rounded-lg transition-colors ${
              activeStream === 'rennsz' ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90'
            }`}
          >
            Watch IRL Stream
          </Button>
          <Button 
            onClick={switchToGamingStream}
            className={`px-6 py-3 font-heading font-bold rounded-lg transition-colors ${
              activeStream === 'rennszino' ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90'
            }`}
          >
            Watch Gaming Stream
          </Button>
        </div>
      </div>
    </section>
  );
}
