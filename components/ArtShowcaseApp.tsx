import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PortfolioShowcaseProps {
  id: string;
  title: string;
  category: string;
  type: string;
  year: string;
  description: string;
  detailDescription: string;
  technique: string;
  equipment: string;
  digitalTools: string;
  physicalTools: string;
  originalSize: string;
  medium: string;
  assignmentStatus: string;
  designIntentions: string;
  imageUrl1: string;
  imageUrl2: string;
  featuredImageUrl: string;
}

export default function ArtShowcaseApp(props: PortfolioShowcaseProps) {
  const [selectedView, setSelectedView] = useState<'overview' | 'featured' | 'detail1' | 'detail2'>('overview');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [zoomScale, setZoomScale] = useState(1);

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'photography':
        return { icon: '📸', color: '#4a90e2', label: 'Photography' };
      case '3d':
        return { icon: '🎯', color: '#7ed321', label: '3D Design' };
      case '2d':
        return { icon: '🎨', color: '#f5a623', label: '2D Design' };
      default:
        return { icon: '📁', color: '#9013fe', label: 'Portfolio' };
    }
  };

  const categoryInfo = getCategoryInfo(props.category);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (selectedView === 'overview') {
      // If in overview, clicking the featured image takes you to featured view
      setSelectedView('featured');
      return;
    }
    
    if (selectedView === 'featured' || selectedView === 'detail1' || selectedView === 'detail2') {
      // Calculate the click position relative to the image
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      // Convert to percentage based on the image dimensions
      const percentageX = (clickX / rect.width) * 100;
      const percentageY = (clickY / rect.height) * 100;
      
      // Clamp values to reasonable bounds for better zoom experience
      const clampedX = Math.max(15, Math.min(85, percentageX));
      const clampedY = Math.max(15, Math.min(85, percentageY));
      
      setZoomPosition({ x: clampedX, y: clampedY });
      setIsZoomed(!isZoomed);
      setZoomScale(isZoomed ? 1 : 3);
    }
  };

  const handleThumbnailClick = (view: 'detail1' | 'detail2') => {
    setSelectedView(view);
    setIsZoomed(false);
    setZoomScale(1);
  };

  const getCurrentImageUrl = () => {
    switch (selectedView) {
      case 'featured':
        return props.featuredImageUrl;
      case 'detail1':
        return props.imageUrl1;
      case 'detail2':
        return props.imageUrl2;
      default:
        return props.imageUrl1;
    }
  };

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
      {/* Header */}
      <div 
        className="h-16 border-b flex items-center px-4"
        style={{ 
          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
          borderColor: '#c0c0c0'
        }}
      >
        <div 
          className="w-10 h-10 mr-3 border-2 flex items-center justify-center"
          style={{ 
            background: categoryInfo.color,
            borderColor: '#999999',
            borderRadius: '3px'
          }}
        >
          <span className="text-white text-lg">{categoryInfo.icon}</span>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold" style={{ color: '#003c71' }}>{props.title}</h2>
          <div className="flex items-center space-x-3 text-xs text-gray-600">
            <span className="font-bold" style={{ color: '#003c71' }}>{categoryInfo.label}</span>
            <span>•</span>
            <span className="font-bold" style={{ color: '#003c71' }}>{props.type}</span>
            <span>•</span>
            <span className="font-bold" style={{ color: '#003c71' }}>{props.year}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div 
        className="h-8 border-b flex"
        style={{ 
          background: 'linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%)',
          borderColor: '#c0c0c0'
        }}
      >
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'featured', label: 'Featured Work' },
          { id: 'detail1', label: 'Detail View 1' },
          { id: 'detail2', label: 'Detail View 2' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedView(tab.id as any);
              setIsZoomed(false);
              setZoomScale(1);
            }}
            className={`px-4 py-1 text-xs border-r transition-colors ${
              selectedView === tab.id ? 'bg-white shadow-inner' : 'hover:bg-gray-100'
            }`}
            style={{
              background: selectedView === tab.id 
                ? 'white'
                : 'transparent',
              borderColor: '#c0c0c0',
              color: selectedView === tab.id ? '#003c71' : '#666666'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {selectedView === 'overview' && (
          <div className="h-full overflow-y-auto p-6 bg-white xp-scrollbar">
            {/* Project Overview */}
            <div className="mb-6">
              <h3 className="text-base font-bold mb-3" style={{ color: '#003c71' }}>
                Project Overview
              </h3>
              <p className="text-sm leading-relaxed text-gray-700 mb-4">
                {props.description}
              </p>
              <p className="text-sm leading-relaxed text-gray-700">
                {props.detailDescription}
              </p>
            </div>

            {/* Featured Work Display */}
            <div className="mb-6">
              <h4 className="text-sm font-bold mb-3" style={{ color: '#003c71' }}>
                Featured Work
              </h4>
              <div className="flex justify-center mb-4">
                <div 
                  className="cursor-pointer border-2 transition-all duration-200 hover:shadow-lg"
                  style={{ 
                    borderColor: '#cccccc',
                    width: '400px',
                    height: '400px'
                  }}
                  onClick={(e) => handleImageClick(e as any)}
                >
                  <ImageWithFallback
                    src={props.featuredImageUrl}
                    alt={`${props.title} - Featured Work`}
                    className="w-full h-full object-cover cursor-pointer"
                    style={{ aspectRatio: '1/1' }}
                    onClick={(e) => handleImageClick(e)}
                  />
                </div>
              </div>
              <p className="text-center text-xs text-gray-600 mb-2">
                Click image to view full size
              </p>
            </div>

            {/* Portfolio Information */}
            <div className="mb-6">
              <h4 className="text-sm font-bold mb-3" style={{ color: '#003c71' }}>
                Artwork Details
              </h4>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <h5 className="text-xs font-bold mb-2" style={{ color: '#003c71' }}>Original Size</h5>
                  <p className="text-sm text-gray-700">{props.originalSize}</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold mb-2" style={{ color: '#003c71' }}>Medium</h5>
                  <p className="text-sm text-gray-700">{props.medium}</p>
                </div>
              </div>
              <div className="mb-4">
                <h5 className="text-xs font-bold mb-2" style={{ color: '#003c71' }}>Assignment Status</h5>
                <p className="text-sm text-gray-700">{props.assignmentStatus}</p>
              </div>
              <div>
                <h5 className="text-xs font-bold mb-2" style={{ color: '#003c71' }}>Design Intentions</h5>
                <p className="text-sm leading-relaxed text-gray-700">{props.designIntentions}</p>
              </div>
            </div>

            {/* Technical Details - Restructured Layout */}
            <div className="mb-6">
              <h4 className="text-sm font-bold mb-3" style={{ color: '#003c71' }}>
                Technical Details
              </h4>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <h5 className="text-xs font-bold mb-2" style={{ color: '#003c71' }}>Category</h5>
                  <p className="text-sm text-gray-700">{categoryInfo.label}</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold mb-2" style={{ color: '#003c71' }}>Type</h5>
                  <p className="text-sm text-gray-700">{props.type}</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold mb-2" style={{ color: '#003c71' }}>Digital Tools</h5>
                  <p className="text-sm text-gray-700">{props.digitalTools}</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold mb-2" style={{ color: '#003c71' }}>Physical Tools</h5>
                  <p className="text-sm text-gray-700">{props.physicalTools}</p>
                </div>
              </div>
            </div>

            {/* Additional Views */}
            <div className="mb-4">
              <h4 className="text-sm font-bold mb-3" style={{ color: '#003c71' }}>
                Additional Views
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="cursor-pointer border-2 transition-all duration-200 hover:shadow-lg"
                  style={{ borderColor: '#cccccc' }}
                  onClick={() => handleThumbnailClick('detail1')}
                >
                  <ImageWithFallback
                    src={props.imageUrl1}
                    alt={`${props.title} - Detail 1`}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-2 text-center">
                    <p className="text-xs text-gray-600">Detail View 1</p>
                  </div>
                </div>
                <div 
                  className="cursor-pointer border-2 transition-all duration-200 hover:shadow-lg"
                  style={{ borderColor: '#cccccc' }}
                  onClick={() => handleThumbnailClick('detail2')}
                >
                  <ImageWithFallback
                    src={props.imageUrl2}
                    alt={`${props.title} - Detail 2`}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-2 text-center">
                    <p className="text-xs text-gray-600">Detail View 2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(selectedView === 'featured' || selectedView === 'detail1' || selectedView === 'detail2') && (
          <div className="h-full flex flex-col bg-black relative">
            {/* Detail View Header */}
            <div 
              className="h-10 border-b flex items-center justify-between px-4"
              style={{ 
                background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
                borderColor: '#444444'
              }}
            >
              <span className="text-white text-sm font-bold">
                {selectedView === 'featured' ? 'Featured Work' : selectedView === 'detail1' ? 'Detail View 1' : 'Detail View 2'}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setIsZoomed(!isZoomed);
                    setZoomScale(isZoomed ? 1 : 3);
                  }}
                  className="px-3 py-1 text-xs text-white border hover:bg-gray-700 transition-colors"
                  style={{
                    background: 'linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)',
                    borderColor: '#555555',
                    borderRadius: '2px'
                  }}
                >
                  {isZoomed ? 'Fit to View' : 'Zoom Mode'}
                </button>
                <button
                  onClick={() => setSelectedView('overview')}
                  className="px-3 py-1 text-xs text-white border hover:bg-gray-700 transition-colors"
                  style={{
                    background: 'linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)',
                    borderColor: '#555555',
                    borderRadius: '2px'
                  }}
                >
                  Back to Overview
                </button>
              </div>
            </div>

            {/* Scrollable Image Display */}
            <div className="flex-1 p-4 overflow-auto bg-black xp-scrollbar">
              <div 
                className="border-2 mx-auto"
                style={{ 
                  borderColor: '#555555',
                  width: 'fit-content',
                  height: 'fit-content'
                }}
              >
                <ImageWithFallback
                  src={getCurrentImageUrl()}
                  alt={`${props.title} - ${selectedView === 'featured' ? 'Featured Work' : selectedView === 'detail1' ? 'Detail 1' : 'Detail 2'}`}
                  className="cursor-crosshair transition-all duration-300 block"
                  onClick={handleImageClick}
                  style={{
                    width: isZoomed ? `${800 * zoomScale}px` : '800px',
                    height: isZoomed ? `${800 * zoomScale}px` : '800px',
                    objectFit: 'contain',
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transform: isZoomed ? `scale(${zoomScale})` : 'scale(1)'
                  }}
                />
              </div>
            </div>

            {/* Scroll Instructions */}
            {!isZoomed && (
              <div 
                className="absolute bottom-24 right-4 px-2 py-1 text-xs text-white bg-black bg-opacity-75 border"
                style={{ 
                  borderColor: '#555555',
                  borderRadius: '2px'
                }}
              >
                Click to zoom to area • Scroll to pan
              </div>
            )}

            {/* Zoom Position Indicator */}
            {isZoomed && (
              <div 
                className="absolute bottom-24 right-4 px-2 py-1 text-xs text-white bg-black bg-opacity-75 border"
                style={{ 
                  borderColor: '#555555',
                  borderRadius: '2px'
                }}
              >
                Zoomed {zoomScale}x at {Math.round(zoomPosition.x)}%, {Math.round(zoomPosition.y)}%
              </div>
            )}

            {/* Detail Info */}
            <div 
              className="h-20 border-t p-4"
              style={{ 
                background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
                borderColor: '#444444'
              }}
            >
              <div className="text-white">
                <h4 className="text-sm font-bold mb-1" style={{ color: '#4a90e2' }}>{props.title}</h4>
                <p className="text-xs text-gray-300">{props.originalSize} • {props.medium}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {props.assignmentStatus}
                  {isZoomed ? ` • Zoomed to click position` : ' • Click anywhere to zoom'}
                </p>
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
        <span className="font-bold" style={{ color: '#003c71' }}>{props.title} - {categoryInfo.label} Portfolio</span>
        <div className="flex-1"></div>
        <span>
          {selectedView === 'overview' ? 'Overview' : 
           selectedView === 'featured' ? 'Featured Work' : 
           selectedView === 'detail1' ? 'Detail View 1' : 'Detail View 2'}
        </span>
        {(selectedView === 'featured' || selectedView === 'detail1' || selectedView === 'detail2') && (
          <span className="ml-2">• {isZoomed ? `Zoomed ${zoomScale}x - Scrollable` : '800x800 - Scrollable'}</span>
        )}
      </div>
    </div>
  );
}