import { useState, useEffect } from 'react';
import PageHeader from '../components/ui/PageHeader';
import { motion, AnimatePresence } from 'motion/react';
import { getGalleryImages, GalleryImage } from '../utils/galleryStore';
import { X, ZoomIn } from 'lucide-react';

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const loadImages = async () => {
      const fetchedImages = await getGalleryImages();
      setImages(fetchedImages);
    };
    
    loadImages();
  }, []);

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category))).filter(Boolean)];
  
  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <PageHeader 
        title="School Gallery" 
        subtitle="Explore memorable moments and facilities at Excel International School."
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {images.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xl text-gray-500">
                Gallery images will appear here after being uploaded by the administrator.
              </p>
            </div>
          ) : (
            <>
              {/* Filters */}
              {categories.length > 1 && (
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${
                        filter === cat 
                          ? 'bg-primary text-white shadow-md' 
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {/* Grid */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
                <AnimatePresence>
                  {filteredImages.map((img) => (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="relative group rounded-xl overflow-hidden cursor-pointer break-inside-avoid bg-gray-200 mb-6"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img 
                        src={img.url} 
                        alt={img.title} 
                        className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <ZoomIn className="text-white mb-2" />
                        <h3 className="text-white font-bold text-lg">{img.title}</h3>
                        {img.category && (
                          <span className="text-white/80 text-sm">{img.category}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-full flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white text-2xl font-bold">{selectedImage.title}</h3>
                {selectedImage.category && (
                  <p className="text-white/70 mt-1">{selectedImage.category}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
