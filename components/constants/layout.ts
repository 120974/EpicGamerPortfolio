// Layout constants
export const ICON_WIDTH = 80;
export const ICON_HEIGHT = 90;
export const GRID_SIZE = 20;
export const TASKBAR_HEIGHT = 50;
export const DRAG_THRESHOLD = 5;

// Styling constants
export const getDarkModeStyles = (isDarkMode: boolean) => ({
  desktop: {
    background: isDarkMode
      ? 'linear-gradient(to bottom, rgba(45, 55, 72, 0.2) 0%, rgba(26, 32, 44, 0.15) 25%, rgba(20, 24, 32, 0.1) 50%, rgba(45, 35, 25, 0.2) 75%, rgba(74, 48, 32, 0.25) 100%)'
      : 'linear-gradient(to bottom, rgba(58, 123, 213, 0.2) 0%, rgba(87, 154, 239, 0.15) 25%, rgba(137, 196, 250, 0.1) 50%, rgba(181, 230, 29, 0.3) 75%, rgba(181, 230, 29, 0.4) 100%)'
  },
  taskbar: {
    background: isDarkMode
      ? 'linear-gradient(180deg, #4a5568 0%, #2d3748 50%, #1a202c 100%)'
      : 'linear-gradient(180deg, #4682b4 0%, #2e5984 50%, #1e3f5a 100%)',
    borderTopColor: isDarkMode ? '#718096' : '#87ceeb'
  },
  startButton: {
    backgroundNormal: isDarkMode
      ? 'linear-gradient(180deg, #ed8936 0%, #c05621 50%, #9c4221 100%)'
      : 'linear-gradient(180deg, #7cb342 0%, #558b2f 50%, #2e7d32 100%)',
    backgroundPressed: isDarkMode
      ? 'linear-gradient(180deg, #9c4221 0%, #ed8936 100%)'
      : 'linear-gradient(180deg, #2e5984 0%, #4682b4 100%)',
    borderColor: isDarkMode ? '#dd6b20' : '#4caf50'
  }
});