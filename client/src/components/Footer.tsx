import { Link } from 'wouter';

interface FooterProps {
  onAdminClick: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  return (
    <footer className="bg-black border-t border-gold text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-2xl font-heading font-bold gold-gradient">RENNSZ</span>
            </Link>
            <span className="text-xs text-gold-light px-2 py-1 border border-gold rounded">LUXURY TRAVEL</span>
          </div>

          <div className="flex space-x-8 mb-6 md:mb-0">
            <a 
              href="https://www.twitch.tv/rennsz" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-gold transition-colors transform hover:-translate-y-1 duration-200" 
              aria-label="Twitch"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
              </svg>
            </a>
            <a 
              href="https://discord.gg/hUTXCaSdKC" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-gold transition-colors transform hover:-translate-y-1 duration-200" 
              aria-label="Discord"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.39-.444.879-.608 1.27-.184-.028-3.671-.028-3.855 0-.164-.391-.397-.88-.608-1.27a.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 10.147-.32 15.71.099 21.198a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.995a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-10.674-3.549-15.06a.061.061 0 0 0-.031-.03z"/>
              </svg>
            </a>
            <a 
              href="https://x.com/rennsz96?s=21" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-gold transition-colors transform hover:-translate-y-1 duration-200" 
              aria-label="X / Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/rennsz?igsh=MWhjYjg2ZDV4dHc0bw==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-gold transition-colors transform hover:-translate-y-1 duration-200" 
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>

          <div className="flex items-center flex-col md:flex-row">
            <a 
              href="/admin?key=admin_secret_123"
              className="text-gold border border-gold px-4 py-1 rounded hover:bg-gold hover:text-black transition-colors mb-4 md:mb-0 md:mr-6"
            >
              Admin
            </a>
            <p className="text-gold-light font-light">Made with <span className="text-red-500">❤️</span> by <span className="text-gold">sf.xenn</span> on discord</p>
          </div>
        </div>
      </div>
    </footer>
  );
}