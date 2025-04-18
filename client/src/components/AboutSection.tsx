import { Button } from '@/components/ui/button';
import profileImage from '../assets/IMG_2458.jpeg';

export default function AboutSection() {
  return (
    <section id="about" className="py-20" style={{ backgroundColor: 'var(--dark-bg)' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src={profileImage} 
                alt="RENNSZ Travel Streamer" 
                className="rounded-xl shadow-2xl w-full h-auto border border-gold/30"
              />
              <div className="absolute -bottom-4 -right-4 bg-black border border-gold px-4 py-2 rounded-lg">
                <span className="text-gold font-heading">Luxury Travel & Lifestyle</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-accent font-bold gold-gradient inline-block mb-6">About RENNSZ</h2>
            <p className="text-lg text-gold-light mb-6">
              Hey there! I'm a travel streamer who's passionate about exploring the world's most breathtaking destinations and sharing those experiences live with my community.
            </p>
            <p className="text-lg text-white mb-6">
              From bustling city streets to remote natural wonders, my streams take you along for the journey as I discover new cultures, try local cuisine, and meet amazing people along the way.
            </p>
            <p className="text-lg text-white mb-6">
              When I'm not on the road, you can find me on my gaming channel, where I unwind with some of my favorite games and chat with viewers.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a 
                href="https://discord.gg/hUTXCaSdKC" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center px-5 py-3 border border-gold bg-black text-gold font-heading font-semibold rounded-lg hover:bg-gold hover:text-black transition-colors"
              >
                <span>Join Discord</span>
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 127.14 96.36">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                </svg>
              </a>
              <a 
                href="https://x.com/rennsz96?s=21" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center px-5 py-3 border border-gold bg-black text-gold font-heading font-semibold rounded-lg hover:bg-gold hover:text-black transition-colors"
              >
                <span>Follow on X</span>
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/rennsz?igsh=MWhjYjg2ZDV4dHc0bw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center px-5 py-3 border border-gold bg-black text-gold font-heading font-semibold rounded-lg hover:bg-gold hover:text-black transition-colors"
              >
                <span>Instagram</span>
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a 
                href="https://www.twitch.tv/rennszino" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center px-5 py-3 border border-gold bg-black text-gold font-heading font-semibold rounded-lg hover:bg-gold hover:text-black transition-colors"
              >
                <span>Gaming Channel</span>
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}