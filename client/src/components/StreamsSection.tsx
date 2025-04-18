import { useState } from 'react';

export default function StreamsSection() {
  return (
    <section id="streams" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-accent font-bold text-primary mb-2">My Stream Channels</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Follow both channels to never miss a stream, whether I'm traveling the world or gaming at home!</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* IRL Streaming Card */}
          <div className="relative rounded-xl overflow-hidden shadow-xl transition-all duration-300 card-hover stream-card h-96">
            <img 
              src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="IRL Streaming" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-600 text-white text-sm font-bold mb-2 self-start">
                <span className="w-2 h-2 bg-white rounded-full mr-2 live-indicator"></span>
                IRL STREAM
              </span>
              <h3 className="text-2xl font-heading font-bold text-white">RENNSZ</h3>
              <p className="text-gray-200 mt-1">Join me as I explore new destinations, cultures, and experiences around the world.</p>
              <a 
                href="https://www.twitch.tv/rennsz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-4 inline-flex items-center px-5 py-2 bg-primary hover:bg-primary/90 text-white font-heading font-semibold rounded-lg transition-colors"
              >
                <span>Follow on Twitch</span>
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Gaming/Chilling Card */}
          <div className="relative rounded-xl overflow-hidden shadow-xl transition-all duration-300 card-hover stream-card h-96">
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Gaming Stream" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-white text-sm font-bold mb-2 self-start">
                GAMING STREAM
              </span>
              <h3 className="text-2xl font-heading font-bold text-white">RENNSZINO</h3>
              <p className="text-gray-200 mt-1">When I'm not traveling, join me for gaming sessions and chill conversations.</p>
              <a 
                href="https://www.twitch.tv/rennszino" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-4 inline-flex items-center px-5 py-2 bg-secondary hover:bg-secondary/90 text-white font-heading font-semibold rounded-lg transition-colors"
              >
                <span>Follow on Twitch</span>
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
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
