interface WelcomePopupProps {
  onClose: () => void;
  isDarkMode: boolean;
}

export default function WelcomePopup({ onClose, isDarkMode }: WelcomePopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Glassmorphism Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-md bg-white/20 dark:bg-black/20"
        style={{
          background: isDarkMode 
            ? 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.3) 100%)'
            : 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.1) 100%)'
        }}
        onClick={onClose}
      ></div>
      
      {/* Popup Window */}
      <div 
        className="relative w-96 border-2 shadow-2xl"
        style={{
          background: isDarkMode 
            ? 'linear-gradient(180deg, #4a5568 0%, #2d3748 100%)'
            : 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
          borderColor: isDarkMode ? '#718096' : '#c0c0c0',
          borderRadius: '4px',
          fontFamily: 'Tahoma, sans-serif'
        }}
      >
        {/* Title Bar */}
        <div 
          className="h-8 border-b flex items-center justify-between px-2"
          style={{
            background: isDarkMode 
              ? 'linear-gradient(180deg, #4299e1 0%, #3182ce 100%)'
              : 'linear-gradient(180deg, #0078d4 0%, #106ebe 100%)',
            borderColor: isDarkMode ? '#2d3748' : '#c0c0c0'
          }}
        >
          <div className="flex items-center space-x-1">
            <div 
              className="w-4 h-4 border flex items-center justify-center text-xs"
              style={{
                background: isDarkMode ? '#2d3748' : 'white',
                borderColor: isDarkMode ? '#666666' : '#808080',
                borderRadius: '1px',
                color: isDarkMode ? '#4299e1' : '#0078d4'
              }}
            >
              ℹ️
            </div>
            <span className="text-xs text-white font-semibold">Welcome to Windows XP Portfolio</span>
          </div>
          <button
            onClick={onClose}
            className="w-5 h-5 border text-xs hover:bg-red-500 transition-colors flex items-center justify-center"
            style={{
              background: isDarkMode ? '#4a5568' : '#f0f0f0',
              borderColor: isDarkMode ? '#666666' : '#999999',
              color: isDarkMode ? '#f7fafc' : '#2d3748'
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Icon and Greeting */}
          <div className="flex items-start space-x-4 mb-4">
            <div 
              className="w-12 h-12 border-2 flex items-center justify-center flex-shrink-0"
              style={{
                background: isDarkMode 
                  ? 'linear-gradient(145deg, #4a4a4a 0%, #2a2a2a 100%)'
                  : 'linear-gradient(145deg, #e0e0e0 0%, #a0a0a0 100%)',
                borderColor: isDarkMode ? '#666666' : '#808080',
                borderRadius: '3px'
              }}
            >
              <span className="text-2xl">👋</span>
            </div>
            <div className="flex-1">
              <h2 
                className="text-base font-bold mb-2"
                style={{ color: isDarkMode ? '#f7fafc' : '#003c71' }}
              >
                Welcome to Rishith's Portfolio!
              </h2>
              <p 
                className="text-sm leading-relaxed mb-3"
                style={{ color: isDarkMode ? '#e2e8f0' : '#4a5568' }}
              >
                Experience an authentic Windows XP interface showcasing creative work in photography, 3D design, and 2D design.
              </p>
            </div>
          </div>

          {/* Quick Instructions */}
          <div 
            className="border-2 p-3 mb-4"
            style={{
              background: isDarkMode ? '#2d3748' : '#f8f9fa',
              borderColor: isDarkMode ? '#4a5568' : '#e2e8f0',
              borderRadius: '2px'
            }}
          >
            <h3 
              className="text-sm font-bold mb-2"
              style={{ color: isDarkMode ? '#4299e1' : '#003c71' }}
            >
              💡 Quick Start Guide:
            </h3>
            <div 
              className="text-xs space-y-1"
              style={{ color: isDarkMode ? '#cbd5e0' : '#4a5568' }}
            >
              <p>• <strong>Start Menu</strong> provides access to system applications</p>
              <p>• <strong>Double-click</strong> desktop icons to open applications</p>
              <p>• <strong>On the left</strong> are 10 displays of my best works</p>
              <p>• <strong>Portfolio items</strong> are organized by category columns</p>
              <p>• <strong>This whole website</strong> is full of easter eggs try to find them all!</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs border hover:bg-gray-100 transition-colors"
              style={{
                background: isDarkMode
                  ? 'linear-gradient(180deg, #4a5568 0%, #2d3748 100%)'
                  : 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
                borderColor: isDarkMode ? '#666666' : '#999999',
                borderRadius: '2px',
                color: isDarkMode ? '#f7fafc' : '#2d3748'
              }}
            >
              Explore Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}