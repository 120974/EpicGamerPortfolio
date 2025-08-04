import { useState, useEffect, useRef } from 'react';

interface JaredAssistantProps {
  onDismiss?: () => void;
}

export default function JaredAssistant({ onDismiss }: JaredAssistantProps) {
  const [currentMessage, setCurrentMessage] = useState(-1); // Start with -1 for welcome message
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState(() => {
    // Start from recycle bin position
    const recycleBinX = window.innerWidth - 70 - 16; // Recycle bin position minus logo width
    return recycleBinX;
  }); // Position along taskbar
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [speechBubbleHidden, setSpeechBubbleHidden] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  
  const walkingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const bubbleFadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const bubbleReturnTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const welcomeMessage = "Hi! I'm Jared 😊 Welcome to Rishith's portfolio! To get started, you can either double-click the About program or any of the 4 portfolio pages.";

  const messages = [
    {
      text: "Hi there! I'm Jared 😊 I'm here to help you explore this Windows XP portfolio. Click on me for tips!",
      type: "greeting"
    },
    {
      text: "Double-click any desktop icon to open a program. Try the portfolio folders to see amazing work! 😊",
      type: "navigation"
    },
    {
      text: "The portfolio contains 4 portfolio pages organized by category: Photography, 3D Design, and 2D Design! 😊",
      type: "portfolio"
    },
    {
      text: "In the portfolio apps, click images to zoom and scroll around. Use the tabs to explore different views!",
      type: "interaction"
    },
    {
      text: "Try the Internet Explorer to search the web - it opens real websites in new tabs!",
      type: "internet"
    },
    {
      text: "Each portfolio piece includes original size, medium, and design intentions. Very professional! 😊",
      type: "details"
    },
    {
      text: "Need to go back? Use the Start menu to access different programs and folders.",
      type: "navigation"
    },
    {
      text: "Click the X button if you want me to stop helping. I'm Jared and I'll always be here if you need assistance! 😊",
      type: "farewell"
    }
  ];

  // Show welcome message on first load
  useEffect(() => {
    if (!hasShownWelcome) {
      setTimeout(() => {
        setHasShownWelcome(true);
        setCurrentMessage(-1);
        setShowSpeechBubble(true);
        setSpeechBubbleHidden(false);
        showMessage(-1);
      }, 2000); // Show welcome after 2 seconds
    }
  }, [hasShownWelcome]);

  // Walking animation - walks when speech bubble is NOT visible
  useEffect(() => {
    // Walk when speech bubble is not showing and not permanently hidden
    const shouldWalk = !showSpeechBubble && !speechBubbleHidden;
    
    if (shouldWalk) {
      walkingIntervalRef.current = setInterval(() => {
        setPosition(prev => {
          const maxPosition = window.innerWidth - 70; // Account for smaller Windows logo width
          const minPosition = 50;
          
          let newPos = prev + (direction * 1.5); // Slower, more gentle movement
          
          // Reverse direction at boundaries
          if (newPos >= maxPosition || newPos <= minPosition) {
            setDirection(d => -d);
            newPos = prev;
          }
          
          return newPos;
        });
      }, 60); // Slower animation for smoother movement
    } else {
      // Stop walking when speech bubble is visible
      if (walkingIntervalRef.current) {
        clearInterval(walkingIntervalRef.current);
        walkingIntervalRef.current = null;
      }
    }

    return () => {
      if (walkingIntervalRef.current) {
        clearInterval(walkingIntervalRef.current);
      }
    };
  }, [showSpeechBubble, speechBubbleHidden, direction]);

  // Show speech bubble without typing animation
  const showMessage = (messageIndex: number) => {
    // Clear any existing timeouts
    if (bubbleFadeTimeoutRef.current) clearTimeout(bubbleFadeTimeoutRef.current);
    if (bubbleReturnTimeoutRef.current) clearTimeout(bubbleReturnTimeoutRef.current);
    
    setCurrentMessage(messageIndex);
    setShowSpeechBubble(true);
    setSpeechBubbleHidden(false);
    
    // Start fade timer immediately - 10 seconds for welcome, 8 for others
    const fadeDelay = messageIndex === -1 ? 10000 : 8000;
    bubbleFadeTimeoutRef.current = setTimeout(() => {
      setShowSpeechBubble(false);
    }, fadeDelay);
  };

  // Handle Windows logo click
  const handleLogoClick = () => {
    if (!speechBubbleHidden) {
      // Show current message or start from first message if welcome was shown
      const messageToShow = currentMessage === -1 ? 0 : currentMessage;
      showMessage(messageToShow);
    }
  };

  // Handle clicking on the speech bubble to advance to next message
  const handleSpeechBubbleClick = () => {
    let nextMessage;
    if (currentMessage === -1) {
      nextMessage = 0;
    } else {
      nextMessage = (currentMessage + 1) % messages.length;
    }
    showMessage(nextMessage);
  };

  // Handle speech bubble close - option to dismiss permanently
  const handleCloseSpeechBubble = (permanent = false) => {
    setShowSpeechBubble(false);
    
    if (permanent && onDismiss) {
      // Permanently dismiss Clippy
      onDismiss();
    } else {
      // Temporarily hide, bring back speech bubble after 10 seconds
      bubbleReturnTimeoutRef.current = setTimeout(() => {
        if (!speechBubbleHidden) { // Only show if not permanently hidden
          setShowSpeechBubble(true);
        }
      }, 10000);
    }
  };

  // Auto-show messages periodically when walking (no speech bubble showing)
  useEffect(() => {
    if (!showSpeechBubble && !speechBubbleHidden && hasShownWelcome) {
      const interval = setInterval(() => {
        const nextMessage = currentMessage === -1 ? 0 : (currentMessage + 1) % messages.length;
        showMessage(nextMessage);
      }, 20000); // Show message every 20 seconds while walking

      return () => clearInterval(interval);
    }
  }, [showSpeechBubble, speechBubbleHidden, currentMessage, hasShownWelcome]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (bubbleFadeTimeoutRef.current) clearTimeout(bubbleFadeTimeoutRef.current);
      if (bubbleReturnTimeoutRef.current) clearTimeout(bubbleReturnTimeoutRef.current);
      if (walkingIntervalRef.current) clearInterval(walkingIntervalRef.current);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  // Calculate centered position for speech bubble
  const speechBubbleLeft = Math.max(10, Math.min(window.innerWidth - 410, position - 200)); // Center bubble on logo
  // Calculate tail position to center on Windows logo
  const tailLeft = Math.max(15, Math.min(385, position - speechBubbleLeft)); // Constrain tail within bubble bounds

  // Get current message text
  const getCurrentMessageText = () => {
    if (currentMessage === -1) return welcomeMessage;
    return messages[currentMessage]?.text || '';
  };

  // Determine if logo should animate based on speech bubble visibility
  const shouldAnimate = !showSpeechBubble;

  return (
    <div className="fixed bottom-0 left-0 select-none pointer-events-none" style={{ zIndex: 100 }}>
      {/* Speech Bubble - Positioned above Windows Logo */}
      {showSpeechBubble && !speechBubbleHidden && (
        <div 
          className="absolute transition-all duration-300 pointer-events-auto"
          style={{
            left: `${speechBubbleLeft}px`,
            bottom: '130px', // Adjusted for smaller logo
            filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.4))',
            opacity: showSpeechBubble ? 1 : 0,
            zIndex: 101 // Lower z-index so popups appear above
          }}
        >
          <div 
            className="relative p-4 border-4 cursor-pointer"
            onClick={handleSpeechBubbleClick}
            style={{
              width: '400px',
              minHeight: '80px',
              background: 'linear-gradient(145deg, #ffffcc 0%, #fff5b0 50%, #fffacd 100%)',
              borderColor: '#4a4a4a',
              borderRadius: '20px',
              fontFamily: 'Comic Sans MS, cursive, Tahoma, sans-serif',
              fontSize: '12px',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), 0 4px 8px rgba(0,0,0,0.2)'
            }}
          >
            {/* Close buttons */}
            <div className="absolute -top-3 -right-3 flex space-x-1">
              {/* Temporary close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseSpeechBubble(false);
                }}
                className="w-6 h-6 text-xs border-2 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                style={{
                  borderColor: '#d97706',
                  lineHeight: '1'
                }}
                title="Hide temporarily (will return in 10 seconds)"
              >
                −
              </button>
              
              {/* Permanent dismiss button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseSpeechBubble(true);
                }}
                className="w-6 h-6 text-xs border-2 bg-gradient-to-br from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                style={{
                  borderColor: '#dc2626',
                  lineHeight: '1'
                }}
                title="Dismiss permanently (can re-enable in Start Menu)"
              >
                ×
              </button>
            </div>

            {/* Message text */}
            <div className="px-4">
              <p className="text-gray-800 text-center leading-relaxed">
                {getCurrentMessageText()}
              </p>
            </div>

            {/* Message counter - simple indicator */}
            <div className="flex justify-center items-center mt-3 px-2">
              <div className="text-xs text-gray-600 px-2">
                {currentMessage === -1 ? 'Welcome' : `${currentMessage + 1} of ${messages.length}`} • Click to continue
              </div>
            </div>

            {/* Speech bubble tail */}
            <div 
              className="absolute top-full"
              style={{
                left: `${tailLeft}px`,
              }}
            >
              <div 
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '15px solid transparent',
                  borderRight: '15px solid transparent',
                  borderTop: '20px solid #ffffcc',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Windows Logo Character - Smaller size, walks when no speech bubble */}
      <div 
        className={`absolute transition-all duration-100 cursor-pointer pointer-events-auto ${shouldAnimate ? 'hover:scale-105' : ''}`}
        style={{ 
          left: `${position}px`,
          bottom: '42px', // Position on top of taskbar
          transform: `scale(1.0)`,
          transformOrigin: 'center bottom',
          zIndex: 100 // Lower z-index so windows and popups appear above
        }}
        onClick={handleLogoClick}
      >
        {/* Windows Logo - Reduced size */}
        <div className={`filter drop-shadow-lg transition-all duration-200 ${
          shouldAnimate ? 'animate-pulse' : ''
        }`}>
          <div 
            className="relative shadow-2xl"
            style={{ 
              width: '60px', // Reduced from 80px
              height: '60px', // Reduced from 80px
              animation: shouldAnimate ? 'float 2s ease-in-out infinite' : 'none'
            }}
          >
            <div 
              className="absolute inset-0 rounded-lg shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)',
                border: '2px solid #c0c0c0'
              }}
            >
              {/* Jared's Smiley Face */}
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                😊
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}