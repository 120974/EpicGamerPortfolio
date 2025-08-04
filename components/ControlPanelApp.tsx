import { useState } from 'react';

export default function ControlPanelApp() {
  const [currentView, setCurrentView] = useState<'home' | 'system'>('home');

  const controlPanelItems = [
    {
      id: 'appearance',
      icon: '🎨',
      title: 'Appearance and Themes',
      description: 'Change the appearance of desktop items'
    },
    {
      id: 'network',
      icon: '🌐',
      title: 'Network Connections', 
      description: 'Configure network and internet connections'
    },
    {
      id: 'user',
      icon: '👤',
      title: 'User Accounts',
      description: 'Change user account settings'
    },
    {
      id: 'add-remove',
      icon: '📦',
      title: 'Add or Remove Programs',
      description: 'Install or remove programs'
    },
    {
      id: 'sounds',
      icon: '🔊',
      title: 'Sounds and Audio',
      description: 'Change sound settings'
    },
    {
      id: 'display',
      icon: '🖥️',
      title: 'Display',
      description: 'Change display settings'
    },
    {
      id: 'system',
      icon: '⚙️',
      title: 'System',
      description: 'View system information and settings'
    },
    {
      id: 'security',
      icon: '🔒',
      title: 'Security Center',
      description: 'Check security settings'
    },
    {
      id: 'performance',
      icon: '📊',
      title: 'Performance and Maintenance',
      description: 'Optimize system performance'
    },
    {
      id: 'linkedin',
      icon: '💼',
      title: 'Professional Profile',
      description: 'View Rishith\'s LinkedIn profile'
    }
  ];

  const portfolioFeatures = [
    {
      category: '🎮 Games & Entertainment',
      items: [
        'Classic Solitaire with authentic card animations',
        'Minesweeper with configurable difficulty levels',
        'PAC-MAN arcade game with authentic sounds',
        'Retro Snake game with high score tracking'
      ]
    },
    {
      category: '📁 Portfolio Applications',
      items: [
        'My Pictures - 40+ professional portfolio pieces',
        'Art Showcase - Detailed project presentations',
        'My Documents - Academic and professional work',
        'My Music - Curated playlist with Spotify integration'
      ]
    },
    {
      category: '🌐 Internet & Communication',
      items: [
        'Internet Explorer with authentic UI',
        'Professional LinkedIn profile integration',
        'Portfolio website navigation',
        'Contact and networking features'
      ]
    },
    {
      category: '🎨 Creative Work Categories',
      items: [
        'Photography Portfolio (16 professional pieces)',
        '3D Design & Visualization (8 advanced projects)',
        '2D Design & Graphics (16 diverse works)',
        'Mixed media and experimental projects'
      ]
    }
  ];

  const easterEggs = [
    {
      location: '🧙‍♂️ Clippy Assistant',
      description: 'Interactive helper with walking animations and helpful tips'
    },
    {
      location: '🎵 My Music App',
      description: 'Real Spotify integration with "Rishi\'s Collection" playlist'
    },
    {
      location: '🗂️ Recycle Bin',
      description: 'Functional recycle bin with restore capabilities'
    },
    {
      location: '🎮 PAC-MAN Game',
      description: 'Hidden high-score system and authentic arcade sounds'
    },
    {
      location: '📸 My Pictures',
      description: 'Click-to-zoom functionality and detailed project metadata'
    },
    {
      location: '🌙 Dark Mode',
      description: 'Hidden dark theme accessible through shutdown options'
    },
    {
      location: '⌨️ Keyboard Shortcuts',
      description: 'Windows key + various keys for authentic XP shortcuts'
    },
    {
      location: '🎯 Welcome Screen',
      description: 'Animated portfolio experience selection with fade transitions'
    }
  ];

  const handleItemClick = (itemId: string) => {
    if (itemId === 'linkedin') {
      window.open('https://www.linkedin.com/in/rishith-chintala-012553232', '_blank');
    } else if (itemId === 'system') {
      setCurrentView('system');
    }
    // Removed popups for other items as requested
  };

  const renderSystemView = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div 
        className="h-16 border-b px-4 py-2 flex items-center"
        style={{ 
          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
          borderColor: '#c0c0c0'
        }}
      >
        <div 
          className="w-10 h-10 mr-3 border-2 flex items-center justify-center"
          style={{ 
            background: 'linear-gradient(145deg, #e0e0e0 0%, #a0a0a0 100%)',
            borderColor: '#999999',
            borderRadius: '3px'
          }}
        >
          <span className="text-lg">⚙️</span>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold" style={{ color: '#003c71' }}>System Properties</h2>
          <div className="text-xs text-gray-600">
            Portfolio features, easter eggs, and system information
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div 
        className="h-8 border-b px-4 py-1 flex items-center text-xs"
        style={{ 
          background: 'linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%)',
          borderColor: '#c0c0c0'
        }}
      >
        <span 
          style={{ color: '#0066cc', cursor: 'pointer' }}
          onClick={() => setCurrentView('home')}
        >
          Control Panel
        </span>
        <span className="mx-2">›</span>
        <span style={{ color: '#0066cc' }}>System</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto xp-scrollbar bg-white">
        <div className="p-4">
          {/* System Info Header */}
          <div className="flex items-center mb-6 p-4 border rounded" style={{ borderColor: '#e0e0e0', background: '#f8f9fa' }}>
            <div className="w-16 h-16 mr-4 flex items-center justify-center border-2" 
                 style={{ 
                   background: 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)',
                   borderColor: '#c0c0c0'
                 }}>
              <span className="text-3xl">💻</span>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1" style={{ color: '#003c71' }}>
                Rishith's Portfolio System
              </h3>
              <p className="text-sm text-gray-600">
                Windows XP Professional • Portfolio Edition
              </p>
              <p className="text-xs text-gray-500">
                Build 2024.portfolio_v1 • Service Pack 3
              </p>
            </div>
          </div>

          {/* Portfolio Features */}
          <div className="mb-6">
            <h4 className="text-sm font-bold mb-3 flex items-center" style={{ color: '#003c71' }}>
              <span className="mr-2">🌟</span>
              Portfolio Features & Applications
            </h4>
            <div className="space-y-4">
              {portfolioFeatures.map((feature, index) => (
                <div key={index} className="border rounded p-3" style={{ borderColor: '#e0e0e0' }}>
                  <h5 className="text-sm font-medium mb-2" style={{ color: '#003c71' }}>
                    {feature.category}
                  </h5>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="mr-2 text-blue-500">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Easter Eggs */}
          <div className="mb-6">
            <h4 className="text-sm font-bold mb-3 flex items-center" style={{ color: '#003c71' }}>
              <span className="mr-2">🎁</span>
              Hidden Features & Easter Eggs
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {easterEggs.map((egg, index) => (
                <div key={index} className="border rounded p-3 hover:bg-blue-50 transition-colors" 
                     style={{ borderColor: '#e0e0e0' }}>
                  <div className="text-sm font-medium mb-1" style={{ color: '#0066cc' }}>
                    {egg.location}
                  </div>
                  <div className="text-xs text-gray-600">
                    {egg.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="border rounded p-4" style={{ borderColor: '#e0e0e0', background: '#f8f9fa' }}>
            <h4 className="text-sm font-bold mb-3" style={{ color: '#003c71' }}>
              Technical Specifications
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <strong>Frontend Technologies:</strong>
                <ul className="mt-1 ml-4 text-gray-600 space-y-1">
                  <li>• React 18 with TypeScript</li>
                  <li>• Tailwind CSS v4.0</li>
                  <li>• Motion/React animations</li>
                  <li>• Vite build system</li>
                </ul>
              </div>
              <div>
                <strong>Portfolio Content:</strong>
                <ul className="mt-1 ml-4 text-gray-600 space-y-1">
                  <li>• 40+ professional projects</li>
                  <li>• Multiple media categories</li>
                  <li>• Interactive demonstrations</li>
                  <li>• Academic work samples</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 p-4 border rounded" style={{ borderColor: '#0066cc', background: '#f0f8ff' }}>
            <h4 className="text-sm font-bold mb-2" style={{ color: '#003c71' }}>
              Professional Contact
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              For inquiries about projects, collaboration, or career opportunities:
            </p>
            <button
              onClick={() => window.open('https://www.linkedin.com/in/rishith-chintala-012553232', '_blank')}
              className="text-xs px-3 py-1 border rounded hover:bg-blue-100 transition-colors"
              style={{ borderColor: '#0066cc', color: '#0066cc' }}
            >
              View LinkedIn Profile →
            </button>
          </div>
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
        <span>System Properties</span>
        <div className="flex-1"></div>
        <span>{portfolioFeatures.length + easterEggs.length} features</span>
      </div>
    </div>
  );

  const renderHomeView = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div 
        className="h-16 border-b px-4 py-2 flex items-center"
        style={{ 
          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
          borderColor: '#c0c0c0'
        }}
      >
        <div 
          className="w-10 h-10 mr-3 border-2 flex items-center justify-center"
          style={{ 
            background: 'linear-gradient(145deg, #e0e0e0 0%, #a0a0a0 100%)',
            borderColor: '#999999',
            borderRadius: '3px'
          }}
        >
          <span className="text-lg">⚙️</span>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold" style={{ color: '#003c71' }}>Control Panel</h2>
          <div className="text-xs text-gray-600">
            Pick a category below to configure your system
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div 
        className="h-8 border-b px-4 py-1 flex items-center text-xs"
        style={{ 
          background: 'linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%)',
          borderColor: '#c0c0c0'
        }}
      >
        <span style={{ color: '#0066cc' }}>Control Panel Home</span>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-white xp-scrollbar">
        {/* Category Header */}
        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2" style={{ color: '#003c71' }}>
            Pick a category
          </h3>
          <p className="text-xs text-gray-600">
            Click on System to view portfolio features, or Professional Profile for LinkedIn.
          </p>
        </div>

        {/* Control Panel Items Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {controlPanelItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`flex items-start p-3 border-2 transition-all duration-200 ${
                item.id === 'system' || item.id === 'linkedin' 
                  ? 'cursor-pointer hover:shadow-lg bg-white hover:bg-blue-50' 
                  : 'opacity-60 cursor-default'
              }`}
              style={{ 
                borderColor: '#c0c0c0',
                borderRadius: '4px'
              }}
            >
              <div 
                className="w-8 h-8 mr-3 border flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(145deg, #f0f0f0 0%, #d0d0d0 100%)',
                  borderColor: '#999999',
                  borderRadius: '2px'
                }}
              >
                <span className="text-sm">{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium mb-1" style={{ color: '#003c71' }}>
                  {item.title}
                </div>
                <div className="text-xs text-gray-600 leading-tight">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See Also Section */}
        <div className="border-t pt-4" style={{ borderColor: '#e0e0e0' }}>
          <h4 className="text-sm font-bold mb-3" style={{ color: '#003c71' }}>
            See Also
          </h4>
          <div className="space-y-2">
            <div 
              className="flex items-center p-2 hover:bg-blue-50 cursor-pointer rounded"
              onClick={() => handleItemClick('linkedin')}
            >
              <span className="mr-2">💼</span>
              <span className="text-sm" style={{ color: '#0066cc' }}>
                Professional Profile - View Rishith's LinkedIn
              </span>
            </div>
          </div>
        </div>

        {/* Portfolio Note */}
        <div 
          className="mt-6 p-3 border rounded"
          style={{ 
            borderColor: '#e0e0e0', 
            background: '#f8f9fa' 
          }}
        >
          <h5 className="text-sm font-bold mb-2" style={{ color: '#003c71' }}>
            Portfolio Note:
          </h5>
          <p className="text-xs text-gray-600">
            This Control Panel is part of Rishith's Windows XP portfolio demonstration. 
            Click "System" to view all portfolio features and easter eggs, or "Professional Profile" 
            to visit the LinkedIn profile with full project details and contact information.
          </p>
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
        <span>Control Panel</span>
        <div className="flex-1"></div>
        <span>{controlPanelItems.length} items</span>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col xp-scrollbar" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
      {currentView === 'home' ? renderHomeView() : renderSystemView()}
    </div>
  );
}