import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function MyPicturesApp() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'slideshow'>('grid');

  // Portfolio photos with relevant categories and placeholder images
  const photos = [
    // Photography Portfolio (16 pieces)
    { id: '1', title: 'Urban Reflections', url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop', description: '[Portfolio Placeholder] Street photography capturing city life dynamics', category: 'Photography' },
    { id: '2', title: 'Portrait Study #1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', description: '[Portfolio Placeholder] Contemporary portrait with natural lighting', category: 'Photography' },
    { id: '3', title: 'Architectural Lines', url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop', description: 'Modern architecture emphasizing geometric forms', category: 'Photography' },
    { id: '4', title: 'Natural Textures', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop', description: 'Macro photography exploring organic patterns', category: 'Photography' },
    { id: '5', title: 'Golden Hour Series', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', description: 'Landscape photography during optimal lighting', category: 'Photography' },
    { id: '6', title: 'Street Art Documentation', url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop', description: 'Urban culture and artistic expression', category: 'Photography' },
    { id: '7', title: 'Minimal Composition', url: 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?w=400&h=300&fit=crop', description: 'Clean geometric photography with negative space', category: 'Photography' },
    { id: '8', title: 'Event Photography', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop', description: 'Live music event documentation', category: 'Photography' },
    { id: '9', title: 'Product Showcase', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop', description: 'Commercial product photography with styling', category: 'Photography' },
    { id: '10', title: 'Nature Abstract', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop', description: 'Abstract interpretation of natural forms', category: 'Photography' },
    { id: '11', title: 'Fashion Editorial', url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop', description: 'Studio fashion photography with dramatic lighting', category: 'Photography' },
    { id: '12', title: 'Documentary Series', url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop', description: 'Social documentary capturing human stories', category: 'Photography' },
    { id: '13', title: 'Architectural Details', url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop', description: 'Close-up architectural elements and patterns', category: 'Photography' },
    { id: '14', title: 'Urban Landscape', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop', description: 'Cityscape photography from elevated perspective', category: 'Photography' },
    { id: '15', title: 'Black & White Series', url: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=300&fit=crop', description: 'Monochrome photography emphasizing contrast', category: 'Photography' },
    { id: '16', title: 'Conceptual Portrait', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop', description: 'Creative portrait with conceptual elements', category: 'Photography' },
    
    // 3D Design Portfolio (8 pieces)
    { id: '17', title: '3D Character Model', url: 'https://images.unsplash.com/photo-1551651653-c5beb8c63edc?w=400&h=300&fit=crop', description: '[Portfolio Placeholder] Stylized character design for animation', category: '3D Design' },
    { id: '18', title: 'Product Visualization', url: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop', description: 'Photorealistic product rendering', category: '3D Design' },
    { id: '19', title: 'Architectural Render', url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop', description: 'Interior design visualization', category: '3D Design' },
    { id: '20', title: 'Abstract Sculpture', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop', description: 'Digital sculpture exploring form and space', category: '3D Design' },
    { id: '21', title: 'Environment Design', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop', description: 'Game environment concept and modeling', category: '3D Design' },
    { id: '22', title: 'Motion Graphics Asset', url: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop', description: '3D elements for motion design projects', category: '3D Design' },
    { id: '23', title: 'Lighting Study', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', description: '3D scene showcasing advanced lighting techniques', category: '3D Design' },
    { id: '24', title: 'Technical Illustration', url: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=300&fit=crop', description: '3D technical visualization for instruction', category: '3D Design' },
    
    // 2D Design Portfolio (16 pieces)
    { id: '25', title: 'Brand Identity System', url: 'https://images.unsplash.com/photo-1541963463532-d68292c34d19?w=400&h=300&fit=crop', description: '[Portfolio Placeholder] Complete brand identity with logo and guidelines', category: '2D Design' },
    { id: '26', title: 'Editorial Layout', url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop', description: 'Magazine layout design with typography focus', category: '2D Design' },
    { id: '27', title: 'Poster Design Series', url: 'https://images.unsplash.com/photo-1586474932048-0ad1f285b0dc?w=400&h=300&fit=crop', description: 'Event poster with bold graphic elements', category: '2D Design' },
    { id: '28', title: 'Web Interface Design', url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop', description: 'User interface design for web application', category: '2D Design' },
    { id: '29', title: 'Packaging Design', url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', description: 'Product packaging with sustainable approach', category: '2D Design' },
    { id: '30', title: 'Illustration Series', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop', description: 'Digital illustration with narrative elements', category: '2D Design' },
    { id: '31', title: 'Typography Exploration', url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop', description: 'Custom typography design and application', category: '2D Design' },
    { id: '32', title: 'Social Media Campaign', url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=300&fit=crop', description: 'Cohesive social media visual identity', category: '2D Design' },
    { id: '33', title: 'Icon System Design', url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop', description: 'Comprehensive icon set with consistent style', category: '2D Design' },
    { id: '34', title: 'Print Advertisement', url: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=400&h=300&fit=crop', description: 'Print ad design with compelling visual hierarchy', category: '2D Design' },
    { id: '35', title: 'Book Cover Design', url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop', description: 'Literary book cover with conceptual approach', category: '2D Design' },
    { id: '36', title: 'Mobile App Interface', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop', description: 'Mobile application UI/UX design', category: '2D Design' },
    { id: '37', title: 'Annual Report Design', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop', description: 'Corporate annual report with data visualization', category: '2D Design' },
    { id: '38', title: 'Brochure Layout', url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop', description: 'Tri-fold brochure with product information', category: '2D Design' },
    { id: '39', title: 'Digital Art Piece', url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=300&fit=crop', description: 'Original digital artwork with mixed techniques', category: '2D Design' },
    { id: '40', title: 'Infographic Design', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop', description: 'Complex data visualization and infographic', category: '2D Design' }
  ];

  const selectedPhoto = photos.find(photo => photo.id === selectedImage);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    if (selectedPhoto) {
      const currentIdx = photos.findIndex(p => p.id === selectedPhoto.id);
      const nextIdx = (currentIdx + 1) % photos.length;
      setSelectedImage(photos[nextIdx].id);
      setCurrentIndex(nextIdx);
    }
  };

  const prevImage = () => {
    if (selectedPhoto) {
      const currentIdx = photos.findIndex(p => p.id === selectedPhoto.id);
      const prevIdx = currentIdx === 0 ? photos.length - 1 : currentIdx - 1;
      setSelectedImage(photos[prevIdx].id);
      setCurrentIndex(prevIdx);
    }
  };

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
      {/* Toolbar */}
      <div 
        className="h-10 border-b flex items-center px-3 space-x-3"
        style={{ 
          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
          borderColor: '#c0c0c0'
        }}
      >
        <button 
          onClick={() => setViewMode('grid')}
          className={`px-3 py-1 text-xs border ${viewMode === 'grid' ? 'shadow-inner' : ''}`}
          style={{
            background: viewMode === 'grid' 
              ? 'linear-gradient(180deg, #e0e0e0 0%, #f0f0f0 100%)'
              : 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
            borderColor: '#999999'
          }}
        >
          🔲 Grid View
        </button>
        <button 
          onClick={() => setViewMode('slideshow')}
          className={`px-3 py-1 text-xs border ${viewMode === 'slideshow' ? 'shadow-inner' : ''}`}
          style={{
            background: viewMode === 'slideshow' 
              ? 'linear-gradient(180deg, #e0e0e0 0%, #f0f0f0 100%)'
              : 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
            borderColor: '#999999'
          }}
        >
          🎞️ Slideshow
        </button>
        <div className="flex-1"></div>
        <span className="text-xs text-gray-600">{photos.length} items</span>
        {selectedPhoto && (
          <span className="text-xs text-blue-600">
            Selected: {selectedPhoto.category}
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'grid' ? (
          <div className="h-full overflow-y-auto p-4 xp-scrollbar">
            <div className="grid grid-cols-5 gap-3">
              {photos.map((photo) => (
                <div 
                  key={photo.id}
                  className="border-2 cursor-pointer hover:shadow-lg transition-all duration-200"
                  style={{ 
                    background: 'white',
                    borderColor: selectedImage === photo.id ? '#0066cc' : '#c0c0c0'
                  }}
                  onClick={() => setSelectedImage(photo.id)}
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-24 object-cover"
                    />
                    <div 
                      className="absolute top-1 right-1 px-1 text-xs rounded"
                      style={{ 
                        background: 'rgba(0, 0, 0, 0.7)', 
                        color: 'white',
                        fontSize: '10px'
                      }}
                    >
                      {photo.category}
                    </div>
                  </div>
                  <div className="p-2">
                    <h4 className="text-xs font-medium truncate">{photo.title}</h4>
                    <p className="text-xs text-gray-600 truncate">{photo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex">
            {/* Slideshow View */}
            <div className="flex-1 flex flex-col items-center justify-center bg-black relative">
              {selectedPhoto ? (
                <div className="text-center relative w-full h-full flex flex-col justify-center">
                  <div className="relative flex-1 flex items-center justify-center">
                    <ImageWithFallback
                      src={selectedPhoto.url}
                      alt={selectedPhoto.title}
                      className="max-w-full max-h-full object-contain"
                    />
                    
                    {/* Navigation Arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
                    >
                      →
                    </button>
                  </div>
                  
                  <div className="mt-4 text-white p-4">
                    <h3 className="text-base font-medium">{selectedPhoto.title}</h3>
                    <p className="text-sm opacity-80">{selectedPhoto.description}</p>
                    <p className="text-xs opacity-60 mt-1">
                      Image {photos.findIndex(p => p.id === selectedPhoto.id) + 1} of {photos.length}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-white text-center">
                  <p className="text-base mb-2">Select a photo to view</p>
                  <p className="text-sm opacity-60">Click on a thumbnail to start slideshow</p>
                </div>
              )}
            </div>
            
            {/* Thumbnail Strip */}
            <div 
              className="w-32 border-l overflow-y-auto xp-scrollbar"
              style={{ 
                background: 'linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%)',
                borderColor: '#c0c0c0'
              }}
            >
              <div className="p-2 space-y-2">
                {photos.map((photo) => (
                  <div 
                    key={photo.id}
                    className={`cursor-pointer border-2 transition-all duration-200 ${
                      selectedImage === photo.id ? 'shadow-lg scale-105' : 'hover:shadow-md'
                    }`}
                    style={{ 
                      borderColor: selectedImage === photo.id ? '#0066cc' : '#c0c0c0'
                    }}
                    onClick={() => setSelectedImage(photo.id)}
                  >
                    <div className="relative">
                      <ImageWithFallback
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-16 object-cover"
                      />
                      <div 
                        className="absolute top-0 right-0 px-1 text-xs"
                        style={{ 
                          background: 'rgba(0, 0, 0, 0.6)', 
                          color: 'white',
                          fontSize: '8px'
                        }}
                      >
                        {photo.id}
                      </div>
                    </div>
                    <div className="p-1">
                      <p className="text-xs truncate">{photo.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div 
        className="h-6 border-t flex items-center px-3 text-xs"
        style={{ 
          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
          borderColor: '#c0c0c0',
          color: '#666666'
        }}
      >
        {selectedPhoto ? (
          <span>Selected: {selectedPhoto.title} | Category: {selectedPhoto.category}</span>
        ) : (
          <span>My Pictures - {photos.length} photos | Categories: Nature, Landscape, Architecture, Abstract, City</span>
        )}
        <div className="flex-1"></div>
        <span>{viewMode === 'grid' ? 'Grid View' : 'Slideshow Mode'}</span>
      </div>
    </div>
  );
}