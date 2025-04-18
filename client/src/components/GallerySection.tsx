import img1 from '../assets/IMG_2456.png';
import img2 from '../assets/IMG_2457.png';

export default function GallerySection() {
  // Gallery items using your actual photos
  const galleryItems = [
    {
      id: 1,
      image: img1,
      title: "Exclusive Photoshoot",
      location: "Orange Beach Luxury"
    },
    {
      id: 2,
      image: img2,
      title: "Urban Lifestyle",
      location: "Downtown Skyline"
    },
    {
      id: 3,
      image: img1,
      title: "Oceanside Escape",
      location: "Premium Experience"
    },
    {
      id: 4,
      image: img2,
      title: "City Adventures",
      location: "Metropolitan View"
    }
  ];

  return (
    <section id="gallery" className="py-16" style={{ backgroundColor: 'var(--dark-bg)' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-accent font-bold mb-2 gold-gradient inline-block">Travel Gallery</h2>
          <div className="w-24 h-0.5 bg-gold mx-auto mb-4"></div>
          <p className="mt-4 text-lg text-gold-light max-w-3xl mx-auto">Exclusive moments from my luxury travels</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="luxury-card overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="font-heading font-bold text-xl mb-1 text-white">{item.title}</h3>
                      <p className="text-gold text-sm">{item.location}</p>
                    </div>
                    <div className="bg-gold text-black text-xs px-3 py-1 rounded-full uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Premium
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-black transition-colors duration-300 px-8 py-3 rounded-lg font-heading font-semibold">
            View More
          </button>
        </div>
      </div>
    </section>
  );
}
