import { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import WindowsXPDesktop from './components/WindowsXPDesktop';
import WelcomePopup from './components/WelcomePopup';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    // Show welcome popup after a brief delay for better UX
    setTimeout(() => {
      setShowWelcomePopup(true);
    }, 500);
  };

  const handleWelcomePopupClose = () => {
    setShowWelcomePopup(false);
  };

  const handleTurnOff = () => {
    // Show welcome screen again and toggle dark mode
    setShowWelcome(true);
    setShowWelcomePopup(false);
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark class to document when in dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="size-full">
      {showWelcome ? (
        <WelcomeScreen onComplete={handleWelcomeComplete} isDarkMode={isDarkMode} />
      ) : (
        <>
          <WindowsXPDesktop onTurnOff={handleTurnOff} isDarkMode={isDarkMode} />
          {showWelcomePopup && (
            <WelcomePopup onClose={handleWelcomePopupClose} isDarkMode={isDarkMode} />
          )}
        </>
      )}
    </div>
  );
}