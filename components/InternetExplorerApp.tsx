import { useState, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function InternetExplorerApp() {
  const [currentUrl, setCurrentUrl] = useState('about:blank');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset scroll to top when URL changes
  const resetScroll = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      
      // Construct search URL
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery.trim())}`;
      
      // Open in new tab
      window.open(searchUrl, '_blank');
      
      // Update current URL display and reset loading
      setCurrentUrl(searchUrl);
      resetScroll(); // Reset scroll to top
      setTimeout(() => setIsLoading(false), 500);
      
      // Clear search query
      setSearchQuery('');
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUrl.trim() && currentUrl !== 'about:blank') {
      setIsLoading(true);
      
      // Open URL in new tab
      window.open(currentUrl.startsWith('http') ? currentUrl : `https://${currentUrl}`, '_blank');
      
      resetScroll(); // Reset scroll to top
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleQuickLink = (url: string) => {
    setIsLoading(true);
    setCurrentUrl(url);
    resetScroll(); // Reset scroll to top
    window.open(url, '_blank');
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleReturnHome = () => {
    setCurrentUrl('about:blank');
    setSearchQuery('');
    resetScroll(); // Reset scroll to top
  };



  const quickLinks = [
    { name: 'MSN', url: 'https://www.msn.com', icon: '🌐', description: 'MSN.com - Your news, weather, and more' },
    { name: 'Hotmail', url: 'https://www.outlook.com', icon: '📧', description: 'Get your Hotmail email' }, 
    { name: 'Windows Update', url: 'https://www.microsoft.com/update', icon: '🔄', description: 'Keep Windows up to date' },
    { name: 'Microsoft', url: 'https://www.microsoft.com', icon: '🏢', description: 'Microsoft Corporation' },
    { name: 'Search', url: 'https://www.google.com', icon: '🔍', description: 'Search the web' },
    { name: 'Support', url: 'https://support.microsoft.com', icon: '❓', description: 'Get help and support' }
  ];

  return (
    <div className="h-full flex flex-col xp-scrollbar" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
      {/* Menu Bar */}
      <div 
        className="h-6 border-b px-2 flex items-center text-xs"
        style={{ 
          background: 'linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%)',
          borderColor: '#c0c0c0'
        }}
      >
        {['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map((menu) => (
          <button
            key={menu}
            className="px-2 py-0.5 hover:bg-blue-100 transition-colors"
            style={{
              borderRadius: '2px',
              color: '#333333'
            }}
            onClick={() => {}}
          >
            {menu}
          </button>
        ))}
      </div>

      {/* Browser Toolbar */}
      <div 
        className="h-16 border-b px-4 py-2"
        style={{ 
          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
          borderColor: '#c0c0c0'
        }}
      >
        {/* Navigation Buttons */}
        <div className="flex items-center space-x-2 mb-2">
          <button 
            className="px-2 py-1 text-xs border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            style={{ borderColor: '#999999', borderRadius: '2px' }}
            disabled
          >
            ◀ Back
          </button>
          <button 
            className="px-2 py-1 text-xs border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            style={{ borderColor: '#999999', borderRadius: '2px' }}
            disabled
          >
            ▶ Forward
          </button>
          <button 
            className="px-2 py-1 text-xs border bg-gray-100 hover:bg-gray-200"
            style={{ borderColor: '#999999', borderRadius: '2px' }}
            onClick={() => window.location.reload()}
          >
            🔄 Refresh
          </button>
          <button 
            className="px-2 py-1 text-xs border bg-gray-100 hover:bg-gray-200"
            style={{ borderColor: '#999999', borderRadius: '2px' }}
            onClick={handleReturnHome}
          >
            🏠 Home
          </button>
          <div className="mx-2 border-l" style={{ height: '20px', borderColor: '#c0c0c0' }}></div>
          <button 
            className="px-2 py-1 text-xs border bg-gray-100 hover:bg-gray-200"
            style={{ borderColor: '#999999', borderRadius: '2px' }}
            onClick={() => {}}
          >
            ⭐ Favorites
          </button>
          <button 
            className="px-2 py-1 text-xs border bg-gray-100 hover:bg-gray-200"
            style={{ borderColor: '#999999', borderRadius: '2px' }}
            onClick={() => {}}
          >
            📋 History
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600">Address:</span>
          <form onSubmit={handleUrlSubmit} className="flex-1 flex">
            <input
              type="text"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              className="flex-1 px-2 py-1 text-xs border"
              style={{ 
                borderColor: '#999999',
                borderRadius: '2px 0 0 2px',
                outline: 'none'
              }}
              placeholder="Enter web address..."
            />
            <button
              type="submit"
              className="px-3 py-1 text-xs border-t border-r border-b bg-gray-100 hover:bg-gray-200"
              style={{ 
                borderColor: '#999999',
                borderRadius: '0 2px 2px 0'
              }}
            >
              Go
            </button>
          </form>
        </div>
      </div>

      {/* Search Bar */}
      <div 
        className="h-12 border-b px-4 py-2 flex items-center"
        style={{ 
          background: 'linear-gradient(180deg, #e8f0fe 0%, #d2e3fc 100%)',
          borderColor: '#c0c0c0'
        }}
      >
        <span className="text-xs text-gray-700 mr-3">Search:</span>
        <form onSubmit={handleSearch} className="flex-1 flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-1 text-sm border"
            style={{ 
              borderColor: '#4285f4',
              borderRadius: '2px 0 0 2px',
              outline: 'none'
            }}
            placeholder="Search the web..."
          />
          <button
            type="submit"
            className="px-4 py-1 text-sm text-white border"
            style={{ 
              background: 'linear-gradient(180deg, #4285f4 0%, #3367d6 100%)',
              borderColor: '#3367d6',
              borderRadius: '0 2px 2px 0'
            }}
            disabled={isLoading}
          >
            {isLoading ? '...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden bg-white">
        {/* Main Content */}
        <div 
          ref={contentRef}
          className="h-full overflow-y-auto xp-scrollbar"
        >
          {currentUrl === 'about:blank' ? (
            // Authentic Windows XP IE Homepage
            <div className="h-full" style={{
              background: 'linear-gradient(135deg, #e6f3ff 0%, #cce7ff 50%, #b3d9ff 100%)'
            }}>
              {/* Header Section */}
              <div 
                className="border-b p-6 text-center"
                style={{ 
                  background: 'linear-gradient(180deg, #ffffff 0%, #f0f8ff 100%)',
                  borderColor: '#c0c0c0'
                }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div 
                    className="w-12 h-12 mr-3 border-2 flex items-center justify-center"
                    style={{ 
                      background: 'linear-gradient(145deg, #4682b4 0%, #5a9fd4 100%)',
                      borderColor: '#2e5984',
                      borderRadius: '3px'
                    }}
                  >
                    <span className="text-white text-xl">🌐</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold mb-1" style={{ color: '#003c71' }}>
                      Microsoft Internet Explorer
                    </h1>
                    <p className="text-sm text-gray-600">
                      The web browser for Windows XP - Portfolio Edition
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Welcome Message */}
                <div 
                  className="mb-6 p-4 border-2 rounded-lg"
                  style={{ 
                    background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
                    borderColor: '#4682b4'
                  }}
                >
                  <h2 className="text-lg font-semibold mb-2" style={{ color: '#003c71' }}>
                    Welcome to the Internet
                  </h2>
                  <p className="text-sm text-gray-700 mb-3">
                    The Internet is a worldwide network of computers that contains information on many topics. 
                    You can use Internet Explorer to find information, communicate with others, and purchase goods and services.
                  </p>
                  <div className="text-xs text-gray-600">
                    <strong>Tip:</strong> Type a web address in the Address bar, or click a link below to get started.
                  </div>
                </div>

                {/* Quick Links Section */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-base font-semibold mb-3" style={{ color: '#003c71' }}>
                      🔗 Popular Links
                    </h3>
                    <div className="space-y-2">
                      {quickLinks.slice(0, 3).map((link) => (
                        <div
                          key={link.name}
                          onClick={() => handleQuickLink(link.url)}
                          className="flex items-center p-3 border cursor-pointer hover:shadow-md transition-all duration-200"
                          style={{ 
                            background: 'white',
                            borderColor: '#c0c0c0',
                            borderRadius: '3px'
                          }}
                        >
                          <span className="text-lg mr-3">{link.icon}</span>
                          <div>
                            <div className="text-sm font-medium" style={{ color: '#0066cc' }}>
                              {link.name}
                            </div>
                            <div className="text-xs text-gray-600">
                              {link.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold mb-3" style={{ color: '#003c71' }}>
                      🛠️ Tools & Support
                    </h3>
                    <div className="space-y-2">
                      {quickLinks.slice(3, 6).map((link) => (
                        <div
                          key={link.name}
                          onClick={() => handleQuickLink(link.url)}
                          className="flex items-center p-3 border cursor-pointer hover:shadow-md transition-all duration-200"
                          style={{ 
                            background: 'white',
                            borderColor: '#c0c0c0',
                            borderRadius: '3px'
                          }}
                        >
                          <span className="text-lg mr-3">{link.icon}</span>
                          <div>
                            <div className="text-sm font-medium" style={{ color: '#0066cc' }}>
                              {link.name}
                            </div>
                            <div className="text-xs text-gray-600">
                              {link.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features Section */}
                <div 
                  className="mb-6 p-4 border rounded-lg"
                  style={{ 
                    background: 'linear-gradient(180deg, #fff8e1 0%, #f5f5dc 100%)',
                    borderColor: '#ddd'
                  }}
                >
                  <h3 className="text-base font-semibold mb-3" style={{ color: '#003c71' }}>
                    ✨ Features of This Portfolio Browser
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl mb-2">🔍</div>
                      <div className="font-medium">Web Search</div>
                      <div className="text-xs text-gray-600">Search Google directly from the search bar</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-2">🌐</div>
                      <div className="font-medium">Real Links</div>
                      <div className="text-xs text-gray-600">All links open real websites in new tabs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-2">📱</div>
                      <div className="font-medium">XP Authentic</div>
                      <div className="text-xs text-gray-600">Authentic Windows XP interface design</div>
                    </div>
                  </div>
                </div>

                {/* Getting Started */}
                <div 
                  className="p-4 border rounded-lg"
                  style={{ 
                    background: 'linear-gradient(180deg, #f0f8ff 0%, #e6f3ff 100%)',
                    borderColor: '#4682b4'
                  }}
                >
                  <h3 className="text-base font-semibold mb-3" style={{ color: '#003c71' }}>
                    🚀 Getting Started
                  </h3>
                  <div className="text-sm space-y-2">
                    <div className="flex items-start">
                      <span className="mr-2 text-blue-600">1.</span>
                      <span>Type a website address (URL) in the Address bar above and click "Go"</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2 text-blue-600">2.</span>
                      <span>Use the Search bar to find information on the web</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2 text-blue-600">3.</span>
                      <span>Click any link above to visit popular websites</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2 text-blue-600">4.</span>
                      <span>Explore the portfolio by returning to the desktop and opening other programs</span>
                    </div>
                  </div>
                </div>

                {/* Portfolio Note */}
                <div 
                  className="mt-6 p-3 border text-center"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderColor: '#ccc',
                    borderRadius: '3px'
                  }}
                >
                  <div className="text-xs text-gray-600">
                    <strong>Portfolio Note:</strong> This Internet Explorer is part of Rishith's Windows XP portfolio demonstration. 
                    All web browsing opens in new browser tabs outside of this environment. 
                    Use the desktop icons to explore the full portfolio of artwork and projects.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Loading or URL Display
            <div className="h-full flex flex-col items-center justify-center p-8">
              {isLoading ? (
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-sm text-gray-600">Loading...</p>
                </div>
              ) : (
                <div className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 border-2 flex items-center justify-center"
                    style={{ 
                      background: 'linear-gradient(145deg, #e0e0e0 0%, #a0a0a0 100%)',
                      borderColor: '#808080',
                      borderRadius: '3px'
                    }}
                  >
                    <span className="text-2xl">🔗</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#003c71' }}>
                    Page Opened in New Tab
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Your requested page has been opened in a new browser tab.
                  </p>
                  <div className="p-3 border rounded bg-gray-50 mb-4" style={{ borderColor: '#e0e0e0' }}>
                    <p className="text-xs text-gray-500 break-all">{currentUrl}</p>
                  </div>
                  <button
                    onClick={handleReturnHome}
                    className="px-4 py-2 text-sm border bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    style={{ borderRadius: '2px' }}
                  >
                    Return to Home
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
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
        <span>Internet Explorer</span>
        <div className="flex-1"></div>
        <span>{isLoading ? 'Loading...' : 'Ready'}</span>
        <div className="ml-4 flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500" style={{ borderRadius: '1px' }} title="Internet connection active"></div>
          <span>Connected</span>
        </div>
      </div>
    </div>
  );
}