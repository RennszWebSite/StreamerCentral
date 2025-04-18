export default function GallerySection() {
  // Gallery images are luxury travel locations
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Paris cityscape with Eiffel Tower"
    },
    {
      src: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "London skyline with London Eye"
    },
    {
      src: "https://images.unsplash.com/photo-1576924542622-772ebe327ae5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Bali luxury resort"
    },
    {
      src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Dubai skyline with Burj Khalifa"
    },
    {
      src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Tokyo night cityscape"
    },
    {
      src: "https://images.unsplash.com/photo-1506665531195-3566af98b0aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      alt: "Venice canal with gondolas"
    }
  ];

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-accent font-bold text-primary mb-2">Travel Gallery</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Moments captured from my travels around the world</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="overflow-hidden rounded-xl shadow-lg transition-all duration-300 card-hover h-80"
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
