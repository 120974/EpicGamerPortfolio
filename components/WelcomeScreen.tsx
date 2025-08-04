import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onComplete: () => void;
  isDarkMode?: boolean;
}

interface PortfolioOption {
  type: 'quick' | 'full';
  title: string;
  description: string;
  features: string[];
}

export default function WelcomeScreen({ onComplete, isDarkMode = false }: WelcomeScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Starting Portfolio...');
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'quick' | 'full' | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const portfolioOptions: PortfolioOption[] = [
    {
      type: 'quick',
      title: 'Quick Visit',
      description: 'Get a fast overview of key projects and skills',
      features: [
        'Curated portfolio highlights',
        'Essential project showcases',
        'Quick navigation',
        'Mobile-optimized viewing'
      ]
    },
    {
      type: 'full',
      title: 'Full Experience', 
      description: 'Immerse yourself in the complete Windows XP portfolio',
      features: [
        'Interactive desktop environment',
        'Complete project galleries',
        'Retro games & applications',
        'Detailed project analysis'
      ]
    }
  ];

  const handleQuickVisit = () => {
    // Open the Figma portfolio site in a new tab
    window.open('https://office-broom-27619280.figma.site', '_blank');
  };

  const handleFullExperience = () => {
    setIsExiting(true);
    // Wait for enhanced fade animation to complete before calling onComplete
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  useEffect(() => {
    const messages = isDarkMode ? [
      'Starting Portfolio (Dark Mode)...',
      'Loading dark theme...',
      'Initializing desktop...',
      'Welcome'
    ] : [
      'Starting Portfolio...',
      'Loading portfolio files...',
      'Initializing desktop...',
      'Welcome'
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1.5; // Changed from 2.5 to 1.5 to make it take ~4 seconds
        
        // Update loading text based on progress
        if (newProgress < 25) {
          setLoadingText(messages[0]);
        } else if (newProgress < 50) {
          setLoadingText(messages[1]);
        } else if (newProgress < 75) {
          setLoadingText(messages[2]);
        } else if (newProgress < 100) {
          setLoadingText(messages[3]);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowOptions(true), 500);
          return 100;
        }
        return newProgress;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete, isDarkMode]);

  // Different gradient for dark mode
  const backgroundGradient = isDarkMode 
    ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
    : 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%)';

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center"
      style={{
        background: backgroundGradient,
        fontFamily: 'Tahoma, sans-serif'
      }}
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? 0.95 : 1,
        filter: isExiting ? 'blur(8px)' : 'blur(0px)'
      }}
      transition={{ 
        duration: 1.2, 
        ease: [0.25, 0.1, 0.25, 1.0],
        opacity: { duration: 1.2 },
        scale: { duration: 1.2, delay: 0.1 },
        filter: { duration: 0.8, delay: 0.2 }
      }}
    >
      <div className="flex w-full max-w-7xl mx-auto px-8">
        {/* Loading Section */}
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center"
          initial={{ opacity: 1, x: 0 }}
          animate={{ 
            opacity: showOptions ? 0.3 : 1,
            x: showOptions ? -100 : 0
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Windows XP Logo */}
          <motion.div 
            className="mb-12 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Microsoft Logo */}
            <motion.div 
              className="mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div 
                className="text-white mb-3"
                style={{ 
                  fontSize: '42px', 
                  fontWeight: 'normal',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  fontFamily: 'Franklin Gothic Medium, Arial, sans-serif',
                  letterSpacing: '1px'
                }}
              >
                Rishith Chintala
              </div>
            </motion.div>

            {/* Windows XP Logo with Flag */}
            <motion.div 
              className="flex items-center justify-center mb-4"
              initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
            >
              {/* Windows Flag Logo */}
              <motion.div 
                className="mr-4 relative" 
                style={{ width: '64px', height: '64px' }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
            <div 
              className="absolute inset-0 rounded-lg shadow-2xl"
              style={{
                background: isDarkMode 
                  ? 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%)',
                border: `2px solid ${isDarkMode ? '#555555' : '#c0c0c0'}`
              }}
            >
                {/* Windows Flag Pattern */}
                <div className="absolute inset-2 grid grid-cols-2 gap-1">
                  <motion.div 
                    className="rounded-sm"
                    style={{ 
                      background: isDarkMode 
                        ? 'linear-gradient(145deg, #ff4500 0%, #cc3300 100%)'
                        : 'linear-gradient(145deg, #ff6b35 0%, #f7931e 100%)' 
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  ></motion.div>
                  <motion.div 
                    className="rounded-sm"
                    style={{ 
                      background: isDarkMode 
                        ? 'linear-gradient(145deg, #228b22 0%, #006400 100%)'
                        : 'linear-gradient(145deg, #7db46c 0%, #42b883 100%)' 
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                  ></motion.div>
                  <motion.div 
                    className="rounded-sm"
                    style={{ 
                      background: isDarkMode 
                        ? 'linear-gradient(145deg, #1e90ff 0%, #0066cc 100%)'
                        : 'linear-gradient(145deg, #4fc3f7 0%, #29b6f6 100%)' 
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                  ></motion.div>
                  <motion.div 
                    className="rounded-sm"
                    style={{ 
                      background: isDarkMode 
                        ? 'linear-gradient(145deg, #ffa500 0%, #cc8400 100%)'
                        : 'linear-gradient(145deg, #ffeb3b 0%, #ffc107 100%)' 
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.9 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>

              {/* Windows Text */}
              <motion.div 
                className="text-white"
                style={{ 
                  fontSize: '56px', 
                  fontWeight: 'bold',
                  textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
                  fontFamily: 'Franklin Gothic Medium, Arial, sans-serif',
                  background: isDarkMode 
                    ? 'linear-gradient(45deg, #cccccc 0%, #888888 100%)'
                    : 'linear-gradient(45deg, #ffffff 0%, #e0e0e0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Portfolio
              </motion.div>
            </motion.div>

            {/* XP Professional */}
            <motion.div 
              className="text-white text-xl opacity-95 mb-2"
              style={{ 
                fontFamily: 'Tahoma, sans-serif',
                textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
                fontWeight: 'normal'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.95 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Professional {isDarkMode ? '(Dark Edition)' : ''}
            </motion.div>
            
            {/* Build Info */}
            <motion.div 
              className="text-white text-sm opacity-80"
              style={{ 
                fontFamily: 'Tahoma, sans-serif',
                textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.8 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Build 2025.portfolio_v9.1{isDarkMode ? '.dark' : ''}
            </motion.div>
          </motion.div>

          {/* Welcome Message */}
          <motion.div 
            className="text-white text-2xl mb-8 transition-all duration-500"
            style={{ 
              fontFamily: 'Tahoma, sans-serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              fontWeight: 'normal'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            {loadingText}
          </motion.div>

          {/* Loading Animation */}
          <motion.div 
            className="flex space-x-2 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            {[0, 0.4, 0.8].map((delay, index) => (
              <motion.div 
                key={index}
                className="w-3 h-3 rounded-full"
                style={{ 
                  background: isDarkMode 
                    ? 'linear-gradient(45deg, #cccccc 0%, #888888 100%)'
                    : 'linear-gradient(45deg, #ffffff 0%, #e0e0e0 100%)',
                  boxShadow: isDarkMode 
                    ? '0 0 8px rgba(255,255,255,0.3)'
                    : '0 0 8px rgba(255,255,255,0.5)'
                }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: delay
                }}
              ></motion.div>
            ))}
          </motion.div>

          {/* Progress Bar Container */}
          <motion.div 
            className="w-96 h-5 border shadow-inner mb-6"
            style={{
              background: isDarkMode 
                ? 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)'
                : 'linear-gradient(180deg, #f0f0f0 0%, #ffffff 100%)',
              borderColor: isDarkMode ? '#555555' : '#888888',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '384px', opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            {/* Progress Bar Fill */}
            <motion.div 
              className="h-full transition-all duration-300 ease-out relative"
              style={{ 
                width: `${progress}%`,
                background: isDarkMode 
                  ? 'linear-gradient(180deg, #ff6b35 0%, #cc3300 50%, #aa2200 100%)'
                  : 'linear-gradient(180deg, #4682b4 0%, #1e5a8a 50%, #2a5298 100%)',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3)'
              }}
            >
              {/* Progress Bar Highlight */}
              {progress > 0 && (
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)'
                  }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                ></motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Progress Text */}
          <motion.div 
            className="text-white text-sm opacity-90 mb-6"
            style={{ 
              fontFamily: 'Tahoma, sans-serif',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 0.5, delay: 2.0 }}
          >
            {Math.round(progress)}% complete
          </motion.div>
        </motion.div>

        {/* Portfolio Experience Options */}
        {showOptions && (
          <motion.div 
            className="flex-1 flex flex-col items-center justify-center ml-16"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="text-center mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 
                className="text-white text-3xl mb-4"
                style={{ 
                  fontFamily: 'Tahoma, sans-serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  fontWeight: 'bold'
                }}
              >
                Welcome to My Portfolio
              </h2>
              <p 
                className="text-white text-lg opacity-90"
                style={{ 
                  fontFamily: 'Tahoma, sans-serif',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                }}
              >
                How would you like to explore?
              </p>
            </motion.div>

            <div className="flex space-x-8 max-w-4xl">
              {portfolioOptions.map((option, index) => (
                <motion.div
                  key={option.type}
                  className="flex-1 cursor-pointer"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedOption(option.type)}
                >
                  <div 
                    className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                      selectedOption === option.type 
                        ? 'shadow-2xl' 
                        : 'shadow-lg hover:shadow-xl'
                    }`}
                    style={{
                      background: isDarkMode 
                        ? `linear-gradient(145deg, ${selectedOption === option.type ? '#2a2a3a' : '#1a1a2a'} 0%, ${selectedOption === option.type ? '#1a1a2a' : '#0a0a1a'} 100%)`
                        : `linear-gradient(145deg, ${selectedOption === option.type ? '#ffffff' : '#f8f9fa'} 0%, ${selectedOption === option.type ? '#f0f2f5' : '#e9ecef'} 100%)`,
                      borderColor: selectedOption === option.type 
                        ? (isDarkMode ? '#4a90e2' : '#007bff')
                        : (isDarkMode ? '#444444' : '#dee2e6'),
                      boxShadow: selectedOption === option.type 
                        ? `0 0 20px ${isDarkMode ? 'rgba(74, 144, 226, 0.3)' : 'rgba(0, 123, 255, 0.3)'}`
                        : undefined
                    }}
                  >
                    <div className="text-center mb-4">
                      <h3 
                        className={`text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                        style={{ 
                          fontFamily: 'Tahoma, sans-serif',
                          fontWeight: 'bold'
                        }}
                      >
                        {option.title}
                      </h3>
                      <p 
                        className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                        style={{ fontFamily: 'Tahoma, sans-serif' }}
                      >
                        {option.description}
                      </p>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {option.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex}
                          className={`text-xs flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                          style={{ fontFamily: 'Tahoma, sans-serif' }}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 1.0 + featureIndex * 0.1 }}
                        >
                          <span className="mr-2">•</span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    <motion.button
                      className="w-full py-2 px-4 text-sm rounded border transition-all duration-200"
                      style={{
                        background: isDarkMode
                          ? 'linear-gradient(180deg, #4a90e2 0%, #357abd 100%)'
                          : 'linear-gradient(180deg, #007bff 0%, #0056b3 100%)',
                        borderColor: isDarkMode ? '#357abd' : '#0056b3',
                        color: 'white',
                        fontFamily: 'Tahoma, sans-serif',
                        fontWeight: 'bold'
                      }}
                      whileHover={{ 
                        boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)',
                        y: -2
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (option.type === 'quick') {
                          handleQuickVisit();
                        } else {
                          handleFullExperience();
                        }
                      }}
                    >
                      {option.type === 'quick' ? 'Open Quick View →' : 'Enter Full Experience →'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <p 
                className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-300'} opacity-75`}
                style={{ 
                  fontFamily: 'Tahoma, sans-serif',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                }}
              >
                Choose your preferred viewing experience above
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>



      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-20 right-20 w-40 h-40 opacity-5 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,${isDarkMode ? '0.2' : '0.4'}) 0%, transparent 70%)`
        }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-32 left-20 w-32 h-32 opacity-5 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,${isDarkMode ? '0.15' : '0.3'}) 0%, transparent 70%)`
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      ></motion.div>
    </motion.div>
  );
}