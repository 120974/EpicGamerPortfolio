import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import DraggableWindow from './DraggableWindow';
import AboutApp from './AboutApp';
import ArtShowcaseApp from './ArtShowcaseApp';
import RecycleBinApp from './RecycleBinApp';
import InternetExplorerApp from './InternetExplorerApp';
import MyDocumentsApp from './MyDocumentsApp';
import MyPicturesApp from './MyPicturesApp';
import MyMusicApp from './MyMusicApp';
import JaredAssistant from './ClippyAssistant';
import ControlPanelApp from './ControlPanelApp';
import SolitaireApp from './SolitaireApp';
import MinesweeperApp from './MinesweeperApp';
import PacmanApp from './PacmanApp';
import SnakeApp from './SnakeApp';

// Imports from refactored files
import { portfolioData } from './constants/artData';
import { ICON_WIDTH, ICON_HEIGHT, TASKBAR_HEIGHT, DRAG_THRESHOLD, getDarkModeStyles } from './constants/layout';
import { Window, WindowsXPDesktopProps, DesktopIcon, RecycledProgram } from './types/desktop';
import {
  loadWindowPositions, loadRecycledPrograms, findNearestAvailablePosition,
  isPositionOverRecycleBin, getCenteredPosition, getPortfolioCenteredPosition, getGameWindowPosition, getMusicAppPosition, formatTime, formatDate
} from './utils/desktopUtils';

export default function WindowsXPDesktop({ onTurnOff, isDarkMode }: WindowsXPDesktopProps) {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [highestZIndex, setHighestZIndex] = useState(1000);
  const [isDraggingIcon, setIsDraggingIcon] = useState(false);
  const [draggedIcon, setDraggedIcon] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [recycledPrograms, setRecycledPrograms] = useState<RecycledProgram[]>([]);
  const [isOverRecycleBin, setIsOverRecycleBin] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [mouseDownPosition, setMouseDownPosition] = useState<{ x: number; y: number } | null>(null);
  const [isPotentialDrag, setIsPotentialDrag] = useState(false);
  const [savedIconPositions, setSavedIconPositions] = useState<{ [key: string]: { x: number; y: number } }>({});
  const [showJared, setShowJared] = useState(false);

  const [savedPositions] = useState(loadWindowPositions());
  const darkModeStyles = getDarkModeStyles(isDarkMode);

  // Clear icon positions and load recycled programs
  useEffect(() => {
    localStorage.removeItem('xp-icon-positions');
    setSavedIconPositions({});
    setRecycledPrograms(loadRecycledPrograms());
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Clear selection when clicking on desktop
  useEffect(() => {
    const handleDesktopClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.desktop-icon') && !target.closest('.taskbar')) {
        setSelectedIcon(null);
      }
    };
    document.addEventListener('click', handleDesktopClick);
    return () => document.removeEventListener('click', handleDesktopClick);
  }, []);

  // Window management state
  const [windows, setWindows] = useState<{ [key: string]: Window }>(() => {
    const windowIds = ['about', ...portfolioData.map(item => item.id), 'recycle', 'ie', 'mydocs', 'mypics', 'mymusic', 'controlpanel', 'solitaire', 'minesweeper', 'pacman', 'snake'];
    const windowsState: { [key: string]: Window } = {};
    windowIds.forEach((id) => {
      const isPortfolio = portfolioData.some(item => item.id === id);
      const isGame = ['solitaire', 'minesweeper', 'pacman', 'snake'].includes(id);
      let position;
      
      if (savedPositions[id]) {
        position = savedPositions[id];
      } else if (isPortfolio) {
        position = getPortfolioCenteredPosition();
      } else if (isGame) {
        position = getGameWindowPosition(id);
      } else if (id === 'mymusic') {
        position = getMusicAppPosition();
      } else {
        position = getCenteredPosition();
      }
      
      windowsState[id] = {
        id,
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 1000,
        position
      };
    });
    return windowsState;
  });

  // Window management functions
  const openWindow = (windowId: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    const isPortfolio = portfolioData.some(item => item.id === windowId);
    const isGame = ['solitaire', 'minesweeper', 'pacman', 'snake'].includes(windowId);
    
    let position;
    if (savedPositions[windowId]) {
      position = savedPositions[windowId];
    } else if (isPortfolio) {
      position = getPortfolioCenteredPosition();
    } else if (isGame) {
      position = getGameWindowPosition(windowId);
    } else if (windowId === 'mymusic') {
      position = getMusicAppPosition();
    } else {
      position = getCenteredPosition();
    }
    
    setWindows(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isOpen: true,
        isMinimized: false,
        zIndex: newZIndex,
        position
      }
    }));
  };

  const closeWindow = (windowId: string) => {
    setWindows(prev => ({ ...prev, [windowId]: { ...prev[windowId], isOpen: false } }));
  };

  const minimizeWindow = (windowId: string) => {
    setWindows(prev => ({ ...prev, [windowId]: { ...prev[windowId], isMinimized: true } }));
  };

  const maximizeWindow = (windowId: string) => {
    setWindows(prev => ({ ...prev, [windowId]: { ...prev[windowId], isMaximized: !prev[windowId].isMaximized } }));
  };

  const focusWindow = (windowId: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    setWindows(prev => ({ ...prev, [windowId]: { ...prev[windowId], zIndex: newZIndex } }));
  };

  const handlePositionChange = (windowId: string, position: { x: number; y: number; width: number; height: number }) => {
    setWindows(prev => ({ ...prev, [windowId]: { ...prev[windowId], position } }));
    try {
      const saved = loadWindowPositions();
      saved[windowId] = position;
      localStorage.setItem('xp-window-positions', JSON.stringify(saved));
    } catch { /* ignore errors */ }
  };

  // System app handlers
  const handleSystemAppClick = (appId: string) => {
    openWindow(appId);
  };

  const handleLogOff = () => window.location.reload();

  // Recycle bin functions
  const recycleProgram = (iconId: string) => {
    const icon = getDesktopIcons().find(i => i.id === iconId);
    if (icon && (icon.type === 'about' || icon.type === 'portfolio')) {
      const recycledProgram: RecycledProgram = {
        id: iconId,
        title: icon.title,
        type: icon.type === 'about' ? 'about' : 'art',
        deletedAt: new Date()
      };
      
      const newRecycledPrograms = [...recycledPrograms, recycledProgram];
      setRecycledPrograms(newRecycledPrograms);
      try {
        localStorage.setItem('xp-recycled-programs', JSON.stringify(newRecycledPrograms));
      } catch { /* ignore errors */ }
      
      // Close the window if it's open
      closeWindow(iconId);
      
      // Remove from saved icon positions
      const newPositions = { ...savedIconPositions };
      delete newPositions[iconId];
      setSavedIconPositions(newPositions);
      localStorage.setItem('xp-icon-positions', JSON.stringify(newPositions));
    }
  };

  const restoreProgram = (programId: string) => {
    const program = recycledPrograms.find(p => p.id === programId);
    if (program) {
      // Remove from recycled programs
      const newRecycledPrograms = recycledPrograms.filter(p => p.id !== programId);
      setRecycledPrograms(newRecycledPrograms);
      try {
        localStorage.setItem('xp-recycled-programs', JSON.stringify(newRecycledPrograms));
      } catch { /* ignore errors */ }
      
      // Restore to original spawn location
      let originalPosition;
      const columnWidth = ICON_WIDTH + 20;
      const screenCenterX = (window.innerWidth / 2) - (ICON_WIDTH / 2);
      
      if (programId === 'about') {
        // About: center of screen
        originalPosition = {
          x: screenCenterX,
          y: (window.innerHeight / 2) - TASKBAR_HEIGHT - (ICON_HEIGHT / 2)
        };
      } else {
        // Find original position based on category
        const portfolioItem = portfolioData.find(item => item.id === programId);
        if (portfolioItem) {
          const categoryItems = portfolioData.filter(item => item.category === portfolioItem.category);
          const indexInCategory = categoryItems.findIndex(item => item.id === programId);
          
          let columnIndex = 0;
          if (portfolioItem.category === '3d') columnIndex = 1;
          else if (portfolioItem.category === '2d') columnIndex = 2;
          
          originalPosition = {
            x: 16 + (columnIndex * columnWidth),
            y: 16 + (indexInCategory * ICON_HEIGHT)
          };
        } else {
          // Fallback for other programs
          originalPosition = findNearestAvailablePosition(100, 100, getDesktopIcons());
        }
      }
      
      const newPositions = { ...savedIconPositions, [programId]: originalPosition };
      setSavedIconPositions(newPositions);
      localStorage.setItem('xp-icon-positions', JSON.stringify(newPositions));
    }
  };

  const emptyRecycleBin = () => {
    setRecycledPrograms([]);
    try {
      localStorage.setItem('xp-recycled-programs', JSON.stringify([]));
    } catch { /* ignore errors */ }
  };

  // Icon management with repositioned columns and centered About
  const getDesktopIcons = (): DesktopIcon[] => {
    const icons: DesktopIcon[] = [];
    const columnWidth = ICON_WIDTH + 20; // 20px spacing between columns
    const iconsPerColumn = Math.floor((window.innerHeight - TASKBAR_HEIGHT - 40) / ICON_HEIGHT);
    const screenCenterX = (window.innerWidth / 2) - (ICON_WIDTH / 2);

    // Column 1: Photography (leftmost)
    const photographyPrograms = portfolioData
      .filter(item => item.category === 'photography')
      .filter(program => !recycledPrograms.some(recycled => recycled.id === program.id))
      .map(item => ({ 
        id: item.id, 
        title: item.title, 
        type: 'portfolio' as const, 
        category: item.category 
      }));

    photographyPrograms.forEach((program, index) => {
      const columnIndex = 0;
      const rowIndex = index;
      const defaultX = 16 + (columnIndex * columnWidth);
      const defaultY = 16 + (rowIndex * ICON_HEIGHT);

      if (isDraggingIcon && draggedIcon === program.id) {
        icons.push({ ...program, x: dragPosition.x, y: dragPosition.y });
      } else {
        const savedPos = savedIconPositions[program.id];
        icons.push({ 
          ...program, 
          x: savedPos?.x ?? defaultX, 
          y: savedPos?.y ?? defaultY 
        });
      }
    });

    // Column 2: 3D Design
    const threeDPrograms = portfolioData
      .filter(item => item.category === '3d')
      .filter(program => !recycledPrograms.some(recycled => recycled.id === program.id))
      .map(item => ({ 
        id: item.id, 
        title: item.title, 
        type: 'portfolio' as const, 
        category: item.category 
      }));

    threeDPrograms.forEach((program, index) => {
      const columnIndex = 1;
      const rowIndex = index;
      const defaultX = 16 + (columnIndex * columnWidth);
      const defaultY = 16 + (rowIndex * ICON_HEIGHT);

      if (isDraggingIcon && draggedIcon === program.id) {
        icons.push({ ...program, x: dragPosition.x, y: dragPosition.y });
      } else {
        const savedPos = savedIconPositions[program.id];
        icons.push({ 
          ...program, 
          x: savedPos?.x ?? defaultX, 
          y: savedPos?.y ?? defaultY 
        });
      }
    });

    // Column 3: 2D Design
    const twoDPrograms = portfolioData
      .filter(item => item.category === '2d')
      .filter(program => !recycledPrograms.some(recycled => recycled.id === program.id))
      .map(item => ({ 
        id: item.id, 
        title: item.title, 
        type: 'portfolio' as const, 
        category: item.category 
      }));

    twoDPrograms.forEach((program, index) => {
      const columnIndex = 2;
      const rowIndex = index;
      const defaultX = 16 + (columnIndex * columnWidth);
      const defaultY = 16 + (rowIndex * ICON_HEIGHT);

      if (isDraggingIcon && draggedIcon === program.id) {
        icons.push({ ...program, x: dragPosition.x, y: dragPosition.y });
      } else {
        const savedPos = savedIconPositions[program.id];
        icons.push({ 
          ...program, 
          x: savedPos?.x ?? defaultX, 
          y: savedPos?.y ?? defaultY 
        });
      }
    });

    // About Program: Absolute center of screen
    const aboutPrograms = [
      { id: 'about', title: 'About', type: 'about' as const, category: 'about' }
    ].filter(program => !recycledPrograms.some(recycled => recycled.id === program.id));

    aboutPrograms.forEach((program) => {
      const defaultX = screenCenterX;
      const defaultY = (window.innerHeight / 2) - TASKBAR_HEIGHT - (ICON_HEIGHT / 2);

      if (isDraggingIcon && draggedIcon === program.id) {
        icons.push({ ...program, x: dragPosition.x, y: dragPosition.y });
      } else {
        const savedPos = savedIconPositions[program.id];
        icons.push({ 
          ...program, 
          x: savedPos?.x ?? defaultX, 
          y: savedPos?.y ?? defaultY 
        });
      }
    });

    // Add game programs in top right corner
    const gamePrograms = [
      { id: 'solitaire', title: 'Solitaire', type: 'game' as const },
      { id: 'minesweeper', title: 'Minesweeper', type: 'game' as const },
      { id: 'pacman', title: 'PAC-MAN', type: 'game' as const },
      { id: 'snake', title: 'Snake', type: 'game' as const }
    ];

    gamePrograms.forEach((program, index) => {
      const defaultX = window.innerWidth - ICON_WIDTH - 16;
      const defaultY = 16 + (index * ICON_HEIGHT);

      if (isDraggingIcon && draggedIcon === program.id) {
        icons.push({ ...program, x: dragPosition.x, y: dragPosition.y });
      } else {
        const savedPos = savedIconPositions[program.id];
        icons.push({ 
          ...program, 
          x: savedPos?.x ?? defaultX, 
          y: savedPos?.y ?? defaultY 
        });
      }
    });

    // Add Recycle Bin at bottom right (fixed position)
    const recycleBinDefaultX = window.innerWidth - ICON_WIDTH - 16;
    const recycleBinDefaultY = window.innerHeight - TASKBAR_HEIGHT - ICON_HEIGHT - 16;
    const recycleBinPosition = (isDraggingIcon && draggedIcon === 'recycle') 
      ? { x: dragPosition.x, y: dragPosition.y }
      : { x: recycleBinDefaultX, y: recycleBinDefaultY };

    icons.push({ id: 'recycle', title: 'Recycle Bin', type: 'system', ...recycleBinPosition });
    return icons;
  };

  const desktopIcons = getDesktopIcons();

  const getFullIconTitle = (iconId: string) => {
    if (iconId === 'about') return 'About Rishith Chintala';
    if (iconId === 'recycle') return 'Recycle Bin';
    if (iconId === 'solitaire') return 'Solitaire - Classic Card Game';
    if (iconId === 'minesweeper') return 'Minesweeper - Classic Puzzle Game';
    if (iconId === 'pacman') return 'PAC-MAN - Classic Arcade Game';
    if (iconId === 'snake') return 'Snake - Classic Retro Game';
    const portfolio = portfolioData.find(p => p.id === iconId);
    return portfolio ? `${portfolio.title} - ${portfolio.type}` : '';
  };

  const getIconStyling = (icon: DesktopIcon) => {
    const isSelected = selectedIcon === icon.id;
    let iconColor = '#666666';
    let emoji = '📁';

    if (icon.id === 'about') {
      iconColor = isDarkMode ? '#63b3ed' : '#3182ce';
      emoji = 'i';
    } else if (icon.id === 'recycle') {
      iconColor = isDarkMode ? '#a0aec0' : '#718096';
      emoji = '🗑';
    } else if (icon.type === 'game') {
      switch (icon.id) {
        case 'solitaire':
          iconColor = isDarkMode ? '#f56565' : '#e53e3e';
          emoji = '🃏';
          break;
        case 'minesweeper':
          iconColor = isDarkMode ? '#fbb6ce' : '#d53f8c';
          emoji = '💣';
          break;
        case 'pacman':
          iconColor = isDarkMode ? '#fbb74a' : '#f6ad55';
          emoji = '🟡';
          break;
        case 'snake':
          iconColor = isDarkMode ? '#68d391' : '#38a169';
          emoji = '🐍';
          break;
      }
    } else if (icon.type === 'portfolio') {
      const portfolio = portfolioData.find(p => p.id === icon.id);
      if (portfolio) {
        switch (portfolio.category) {
          case 'photography':
            iconColor = isDarkMode ? '#68d391' : '#38a169';
            emoji = '📸';
            break;
          case '3d':
            iconColor = isDarkMode ? '#9f7aea' : '#805ad5';
            emoji = '🎯';
            break;
          case '2d':
            iconColor = isDarkMode ? '#f6ad55' : '#ed8936';
            emoji = '🎨';
            break;
        }
      }
    }

    return { isSelected, iconColor, emoji };
  };

  // Icon interaction handlers
  const handleIconMouseDown = (e: React.MouseEvent, iconId: string, iconX: number, iconY: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedIcon(iconId);
    setMouseDownPosition({ x: e.clientX, y: e.clientY });
    setIsPotentialDrag(true);
    setDraggedIcon(iconId);
    setDragOffset({ x: e.clientX - iconX, y: e.clientY - iconY });
    setDragPosition({ x: iconX, y: iconY });
  };

  const handleIconClick = (e: React.MouseEvent, iconId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedIcon(iconId);
  };

  const handleIconDoubleClick = (iconId: string, iconType: string, isSystemApp?: boolean) => {
    if (!isDraggingIcon) {
      if (isSystemApp) {
        handleSystemAppClick(iconId);
      } else if (iconType !== 'system' || iconId === 'recycle') {
        openWindow(iconId);
      }
    }
  };

  // Drag handling effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isPotentialDrag && !isDraggingIcon && mouseDownPosition && draggedIcon) {
        const deltaX = Math.abs(e.clientX - mouseDownPosition.x);
        const deltaY = Math.abs(e.clientY - mouseDownPosition.y);
        if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
          setIsDraggingIcon(true);
          setIsPotentialDrag(false);
        }
      }
      
      if (isDraggingIcon && draggedIcon) {
        const newX = Math.max(0, Math.min(window.innerWidth - ICON_WIDTH, e.clientX - dragOffset.x));
        const newY = Math.max(0, Math.min(window.innerHeight - TASKBAR_HEIGHT - ICON_HEIGHT, e.clientY - dragOffset.y));
        setDragPosition({ x: newX, y: newY });
        setIsOverRecycleBin(isPositionOverRecycleBin(newX + ICON_WIDTH/2, newY + ICON_HEIGHT/2, desktopIcons));
      }
    };

    const handleMouseUp = () => {
      if (isDraggingIcon && draggedIcon) {
        if (isOverRecycleBin && draggedIcon !== 'recycle') {
          recycleProgram(draggedIcon);
        } else {
          const finalPosition = findNearestAvailablePosition(dragPosition.x, dragPosition.y, desktopIcons, draggedIcon);
          const newPositions = { ...savedIconPositions, [draggedIcon]: finalPosition };
          setSavedIconPositions(newPositions);
          localStorage.setItem('xp-icon-positions', JSON.stringify(newPositions));
        }
      }
      
      setIsDraggingIcon(false);
      setIsPotentialDrag(false);
      setDraggedIcon(null);
      setMouseDownPosition(null);
      setIsOverRecycleBin(false);
    };

    if (isPotentialDrag || isDraggingIcon) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPotentialDrag, isDraggingIcon, draggedIcon, dragOffset, dragPosition, isOverRecycleBin, mouseDownPosition, desktopIcons, savedIconPositions]);

  // Render the desktop UI
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ fontFamily: 'Tahoma, sans-serif' }}>
      {/* Desktop Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/d/1D7tqgr9831287MHM0h0X3WaATO70ssqd?w=1920&h=1200&fit=crop')`
        }}
      >
        <div className="absolute inset-0" style={darkModeStyles.desktop}></div>
      </div>

      {/* Selected Icon Info Display */}
      {selectedIcon && (
        <div 
          className="fixed bottom-16 left-4 max-w-xs p-3 border-2 shadow-2xl z-40"
          style={{
            background: isDarkMode ? 'linear-gradient(180deg, #4a5568 0%, #2d3748 100%)' : 'linear-gradient(180deg, #f7fafc 0%, #edf2f7 100%)',
            borderColor: isDarkMode ? '#718096' : '#cbd5e0',
            borderRadius: '6px'
          }}
        >
          <div className="text-sm font-medium" style={{ color: isDarkMode ? '#f7fafc' : '#2d3748' }}>
            {getFullIconTitle(selectedIcon)}
          </div>
        </div>
      )}

      {/* Desktop Icons */}
      <div className="absolute inset-0" style={{ paddingBottom: '50px' }}>
        {desktopIcons.map((icon) => {
          const { isSelected, iconColor, emoji } = getIconStyling(icon);
          
          return (
            <div 
              key={icon.id}
              className={`desktop-icon absolute flex flex-col items-center w-20 cursor-pointer group select-none transition-all duration-200 ${
                isDraggingIcon && draggedIcon === icon.id ? 'scale-110 z-50' : ''
              } ${isSelected ? 'z-30' : ''}`}
              style={{ 
                left: icon.x, 
                top: icon.y,
                opacity: isDraggingIcon && draggedIcon === icon.id ? 0.8 : 1
              }}
              onMouseDown={(e) => handleIconMouseDown(e, icon.id, icon.x, icon.y)}
              onClick={(e) => handleIconClick(e, icon.id)}
              onDoubleClick={() => handleIconDoubleClick(icon.id, icon.type, icon.isSystemApp || icon.type === 'game')}
            >
              <div 
                className={`w-12 h-12 shadow-lg flex items-center justify-center mb-1 transition-all duration-200 group-hover:shadow-xl border-2 ${
                  isSelected ? 'shadow-xl ring-2 ring-blue-400 ring-opacity-50' : ''
                }`}
                style={{
                  background: isDarkMode ? 'linear-gradient(145deg, #4a4a4a 0%, #2a2a2a 100%)' : 'linear-gradient(145deg, #e0e0e0 0%, #a0a0a0 100%)',
                  borderColor: isSelected ? (isDarkMode ? '#63b3ed' : '#3182ce') : (isDarkMode ? '#666666' : '#808080'),
                  borderRadius: '3px'
                }}
              >
                <div 
                  className="w-8 h-8 border flex items-center justify-center text-xs" 
                  style={{ 
                    background: isDarkMode ? '#2d3748' : 'white', 
                    borderColor: isDarkMode ? '#666666' : '#808080',
                    borderRadius: '2px',
                    color: iconColor
                  }}
                >
                  <span style={{ fontWeight: icon.id === 'about' ? 'bold' : 'normal' }}>
                    {emoji}
                  </span>
                </div>
              </div>
              <span 
                className={`text-xs text-center px-1 py-0.5 shadow-md leading-tight ${isSelected ? 'shadow-lg' : ''}`}
                style={{ 
                  background: isSelected 
                    ? (isDarkMode ? 'rgba(59, 130, 246, 0.9)' : 'rgba(37, 99, 235, 0.9)')
                    : (isDarkMode ? 'rgba(74, 85, 104, 0.9)' : 'rgba(0, 60, 113, 0.85)'), 
                  border: `1px solid ${isDarkMode ? 'rgba(147, 197, 253, 0.3)' : 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '2px',
                  maxWidth: '76px',
                  wordWrap: 'break-word',
                  color: isDarkMode ? '#f7fafc' : 'white'
                }}
              >
                {icon.title.length > 12 ? icon.title.substring(0, 12) + '...' : icon.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Windows - About Window */}
      <DraggableWindow
        title="About - Rishith Chintala"
        icon={<div className="w-4 h-4 border flex items-center justify-center text-xs" style={{ background: isDarkMode ? '#2d3748' : 'white', borderColor: isDarkMode ? '#718096' : '#cbd5e0', borderRadius: '1px', color: isDarkMode ? '#63b3ed' : '#3182ce' }}>i</div>}
        isOpen={windows.about.isOpen && !windows.about.isMinimized}
        onClose={() => closeWindow('about')}
        onMinimize={() => minimizeWindow('about')}
        onMaximize={() => maximizeWindow('about')}
        isMaximized={windows.about.isMaximized}
        zIndex={windows.about.zIndex}
        onFocus={() => focusWindow('about')}
        windowId="about"
        onPositionChange={handlePositionChange}
        initialPosition={windows.about.position}
      >
        <AboutApp />
      </DraggableWindow>

      {/* Portfolio Windows */}
      {portfolioData.map((portfolio) => (
        <DraggableWindow
          key={portfolio.id}
          title={`${portfolio.title} - ${portfolio.type}`}
          icon={<div className="w-4 h-4 border flex items-center justify-center text-xs" style={{ background: isDarkMode ? '#2d3748' : 'white', borderColor: isDarkMode ? '#718096' : '#cbd5e0', borderRadius: '1px', color: portfolio.category === 'photography' ? (isDarkMode ? '#68d391' : '#38a169') : portfolio.category === '3d' ? (isDarkMode ? '#9f7aea' : '#805ad5') : (isDarkMode ? '#f6ad55' : '#ed8936') }}>{portfolio.category === 'photography' ? '📸' : portfolio.category === '3d' ? '🎯' : '🎨'}</div>}
          isOpen={windows[portfolio.id].isOpen && !windows[portfolio.id].isMinimized}
          onClose={() => closeWindow(portfolio.id)}
          onMinimize={() => minimizeWindow(portfolio.id)}
          onMaximize={() => maximizeWindow(portfolio.id)}
          isMaximized={windows[portfolio.id].isMaximized}
          zIndex={windows[portfolio.id].zIndex}
          onFocus={() => focusWindow(portfolio.id)}
          windowId={portfolio.id}
          onPositionChange={handlePositionChange}
          initialPosition={windows[portfolio.id].position}
        >
          <ArtShowcaseApp {...portfolio} />
        </DraggableWindow>
      ))}

      {/* Control Panel Window */}
      <DraggableWindow
        title="Control Panel"
        icon={<div className="w-4 h-4 border flex items-center justify-center text-xs" style={{ background: isDarkMode ? '#2d3748' : 'white', borderColor: isDarkMode ? '#718096' : '#cbd5e0', borderRadius: '1px', color: isDarkMode ? '#a0aec0' : '#718096' }}>⚙️</div>}
        isOpen={windows.controlpanel.isOpen && !windows.controlpanel.isMinimized}
        onClose={() => closeWindow('controlpanel')}
        onMinimize={() => minimizeWindow('controlpanel')}
        onMaximize={() => maximizeWindow('controlpanel')}
        isMaximized={windows.controlpanel.isMaximized}
        zIndex={windows.controlpanel.zIndex}
        onFocus={() => focusWindow('controlpanel')}
        windowId="controlpanel"
        onPositionChange={handlePositionChange}
        initialPosition={windows.controlpanel.position}
      >
        <ControlPanelApp />
      </DraggableWindow>

      {/* System Application Windows */}
      {['ie', 'mydocs', 'mypics', 'mymusic'].map((appId) => {
        const appConfigs = {
          ie: { title: 'Internet Explorer', icon: '🌐', color: isDarkMode ? '#68d391' : '#38a169', component: InternetExplorerApp },
          mydocs: { title: 'My Documents', icon: '📁', color: isDarkMode ? '#f6ad55' : '#ed8936', component: MyDocumentsApp },
          mypics: { title: 'My Pictures', icon: '🖼️', color: isDarkMode ? '#fc8181' : '#e53e3e', component: MyPicturesApp },
          mymusic: { title: 'Windows Media Player', icon: '🎵', color: isDarkMode ? '#9f7aea' : '#805ad5', component: MyMusicApp }
        };
        
        const config = appConfigs[appId as keyof typeof appConfigs];
        const Component = config.component;
        
        return (
          <DraggableWindow
            key={appId}
            title={config.title}
            icon={<div className="w-4 h-4 border flex items-center justify-center text-xs" style={{ background: isDarkMode ? '#2d3748' : 'white', borderColor: isDarkMode ? '#718096' : '#cbd5e0', borderRadius: '1px', color: config.color }}>{config.icon}</div>}
            isOpen={windows[appId].isOpen && !windows[appId].isMinimized}
            onClose={() => closeWindow(appId)}
            onMinimize={() => minimizeWindow(appId)}
            onMaximize={() => maximizeWindow(appId)}
            isMaximized={windows[appId].isMaximized}
            zIndex={windows[appId].zIndex}
            onFocus={() => focusWindow(appId)}
            windowId={appId}
            onPositionChange={handlePositionChange}
            initialPosition={windows[appId].position}
          >
            <Component />
          </DraggableWindow>
        );
      })}

      {/* Game Application Windows */}
      {['solitaire', 'minesweeper', 'pacman', 'snake'].map((gameId) => {
        const gameConfigs = {
          solitaire: { title: 'Solitaire', icon: '🃏', color: isDarkMode ? '#f56565' : '#e53e3e', component: SolitaireApp },
          minesweeper: { title: 'Minesweeper', icon: '💣', color: isDarkMode ? '#fbb6ce' : '#d53f8c', component: MinesweeperApp },
          pacman: { title: 'PAC-MAN', icon: '🟡', color: isDarkMode ? '#fbb74a' : '#f6ad55', component: PacmanApp },
          snake: { title: 'Snake', icon: '🐍', color: isDarkMode ? '#68d391' : '#38a169', component: SnakeApp }
        };
        
        const config = gameConfigs[gameId as keyof typeof gameConfigs];
        const Component = config.component;
        
        return (
          <DraggableWindow
            key={gameId}
            title={config.title}
            icon={<div className="w-4 h-4 border flex items-center justify-center text-xs" style={{ background: isDarkMode ? '#2d3748' : 'white', borderColor: isDarkMode ? '#718096' : '#cbd5e0', borderRadius: '1px', color: config.color }}>{config.icon}</div>}
            isOpen={windows[gameId].isOpen && !windows[gameId].isMinimized}
            onClose={() => closeWindow(gameId)}
            onMinimize={() => minimizeWindow(gameId)}
            onMaximize={() => maximizeWindow(gameId)}
            isMaximized={windows[gameId].isMaximized}
            zIndex={windows[gameId].zIndex}
            onFocus={() => focusWindow(gameId)}
            windowId={gameId}
            onPositionChange={handlePositionChange}
            initialPosition={windows[gameId].position}
          >
            <Component />
          </DraggableWindow>
        );
      })}

      {/* Recycle Bin Window */}
      <DraggableWindow
        title="Recycle Bin"
        icon={<div className="w-4 h-4 border flex items-center justify-center text-xs" style={{ background: isDarkMode ? '#2d3748' : 'white', borderColor: isDarkMode ? '#718096' : '#a0aec0', borderRadius: '1px', color: isDarkMode ? '#a0aec0' : '#718096' }}>🗑</div>}
        isOpen={windows.recycle.isOpen && !windows.recycle.isMinimized}
        onClose={() => closeWindow('recycle')}
        onMinimize={() => minimizeWindow('recycle')}
        onMaximize={() => maximizeWindow('recycle')}
        isMaximized={windows.recycle.isMaximized}
        zIndex={windows.recycle.zIndex}
        onFocus={() => focusWindow('recycle')}
        windowId="recycle"
        onPositionChange={handlePositionChange}
        initialPosition={windows.recycle.position}
      >
        <RecycleBinApp 
          recycledPrograms={recycledPrograms}
          onRestore={restoreProgram}
          onEmptyRecycleBin={emptyRecycleBin}
        />
      </DraggableWindow>

      {/* Start Menu */}
      {startMenuOpen && (
        <div 
          className="fixed bottom-10 left-0 w-96 shadow-2xl border-2"
          style={{
            height: 'calc(100vh - 120px)',
            maxHeight: '600px',
            background: isDarkMode 
              ? 'linear-gradient(180deg, #4a5568 0%, #2d3748 50%, #1a202c 100%)'
              : 'linear-gradient(180deg, #f0f8ff 0%, #e6f3ff 50%, #cce7ff 100%)',
            borderColor: isDarkMode ? '#718096' : '#4682b4',
            borderRadius: '0 8px 0 0',
            fontFamily: 'Tahoma, sans-serif',
            zIndex: 9999
          }}
        >
          {/* Start Menu Header */}
          <div 
            className="h-16 flex items-center px-4 text-white"
            style={{
              background: isDarkMode 
                ? 'linear-gradient(90deg, #4a5568 0%, #718096 50%, #a0aec0 100%)'
                : 'linear-gradient(90deg, #4682b4 0%, #5a9fd4 50%, #6bb6df 100%)',
              borderRadius: '0 6px 0 0',
              borderBottom: `2px solid ${isDarkMode ? '#a0aec0' : '#2e5984'}`
            }}
          >
            <div 
              className="w-12 h-12 rounded-full mr-3 flex items-center justify-center border-2 shadow-inner"
              style={{ background: isDarkMode ? '#2d3748' : 'white', borderColor: isDarkMode ? '#a0aec0' : '#87ceeb' }}
            >
              <div className="w-8 h-8 rounded-full" style={{ background: isDarkMode ? 'linear-gradient(45deg, #718096 0%, #a0aec0 100%)' : 'linear-gradient(45deg, #4682b4 0%, #87ceeb 100%)' }}></div>
            </div>
            <div>
              <div className="text-lg font-semibold">User</div>
              <div className="text-xs opacity-90">Administrator {isDarkMode ? '(Dark Mode)' : ''}</div>
            </div>
          </div>

          {/* Start Menu Content - Scrollable */}
          <div className="flex" style={{ height: 'calc(100% - 112px)' }}>
            <div 
              className="flex-1 overflow-y-auto"
              style={{ 
                background: isDarkMode ? '#2d3748' : 'white',
                borderRight: `1px solid ${isDarkMode ? '#4a5568' : '#c0c0c0'}`,
                scrollbarWidth: 'thin',
                scrollbarColor: isDarkMode ? '#718096 #4a5568' : '#c0c0c0 #f0f0f0'
              }}
            >
              <div className="p-2">
                {/* System Applications */}
                <div className="mb-3">
                  <div className="text-xs mb-2 px-2" style={{ color: isDarkMode ? '#e2e8f0' : '#666666' }}>System Applications</div>
                  {[
                    { id: 'ie', title: 'Internet Explorer', icon: '🌐' },
                    { id: 'mydocs', title: 'My Documents', icon: '📁' },
                    { id: 'mypics', title: 'My Pictures', icon: '🖼️' },
                    { id: 'mymusic', title: 'My Music', icon: '🎵' },
                    { id: 'controlpanel', title: 'Control Panel', icon: '⚙️' }
                  ].map((app) => (
                    <div 
                      key={app.id}
                      className="flex items-center p-2 cursor-pointer transition-colors rounded"
                      onClick={() => { 
                        if (app.id === 'controlpanel') {
                          handleSystemAppClick(app.id);
                        } else {
                          openWindow(app.id);
                        }
                        setStartMenuOpen(false); 
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = isDarkMode ? '#4a5568' : '#e8f0fe'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div className="w-8 h-8 mr-3 border flex items-center justify-center" style={{ background: isDarkMode ? 'linear-gradient(145deg, #718096 0%, #4a5568 100%)' : 'linear-gradient(145deg, #e0e0e0 0%, #a0a0a0 100%)', borderColor: isDarkMode ? '#a0aec0' : '#808080', borderRadius: '2px' }}>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>{app.icon}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium" style={{ color: isDarkMode ? '#f7fafc' : 'black' }}>{app.title}</div>
                        <div className="text-xs" style={{ color: isDarkMode ? '#cbd5e0' : '#666666' }}>System application</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Separator */}
                <div className="mx-2 mb-3" style={{ borderTop: `1px solid ${isDarkMode ? '#4a5568' : '#e0e0e0'}` }}></div>

                {/* Helper Bot Toggle */}
                <div className="mb-3">
                  <div className="text-xs mb-2 px-2" style={{ color: isDarkMode ? '#e2e8f0' : '#666666' }}>Assistance</div>
                  <div 
                    className="flex items-center p-2 cursor-pointer transition-colors rounded"
                    onClick={() => setShowJared(!showJared)}
                    onMouseEnter={(e) => e.currentTarget.style.background = isDarkMode ? '#4a5568' : '#e8f0fe'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div className="w-8 h-8 mr-3 border flex items-center justify-center" style={{ background: isDarkMode ? 'linear-gradient(145deg, #718096 0%, #4a5568 100%)' : 'linear-gradient(145deg, #e0e0e0 0%, #a0a0a0 100%)', borderColor: isDarkMode ? '#a0aec0' : '#808080', borderRadius: '2px' }}>
                      <span className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>📎</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: isDarkMode ? '#f7fafc' : 'black' }}>
                        {showJared ? 'Hide' : 'Show'} Jared Assistant
                      </div>
                      <div className="text-xs" style={{ color: isDarkMode ? '#cbd5e0' : '#666666' }}>
                        Toggle Jared assistant
                      </div>
                    </div>
                  </div>
                </div>

                {/* Separator */}
                <div className="mx-2 mb-3" style={{ borderTop: `1px solid ${isDarkMode ? '#4a5568' : '#e0e0e0'}` }}></div>

                {/* Portfolio Programs */}
                <div className="mb-3">
                  <div className="text-xs mb-2 px-2" style={{ color: isDarkMode ? '#e2e8f0' : '#666666' }}>Portfolio Programs</div>
                  
                  {/* About */}
                  <div 
                    className="flex items-center p-2 cursor-pointer transition-colors rounded"
                    onClick={() => { openWindow('about'); setStartMenuOpen(false); }}
                    onMouseEnter={(e) => e.currentTarget.style.background = isDarkMode ? '#4a5568' : '#e8f0fe'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div className="w-8 h-8 mr-3 border flex items-center justify-center" style={{ background: isDarkMode ? 'linear-gradient(145deg, #718096 0%, #4a5568 100%)' : 'linear-gradient(145deg, #e0e0e0 0%, #a0a0a0 100%)', borderColor: isDarkMode ? '#a0aec0' : '#808080', borderRadius: '2px' }}>
                      <span className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} style={{ fontWeight: 'bold' }}>i</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: isDarkMode ? '#f7fafc' : 'black' }}>About</div>
                      <div className="text-xs" style={{ color: isDarkMode ? '#cbd5e0' : '#666666' }}>About Rishith</div>
                    </div>
                  </div>

                  {/* Portfolio Categories in Order */}
                  {[
                    { category: 'photography', label: 'Photography', icon: '📸', color: isDarkMode ? '#68d391' : '#38a169' },
                    { category: '3d', label: '3D Design', icon: '🎯', color: isDarkMode ? '#9f7aea' : '#805ad5' },
                    { category: '2d', label: '2D Design', icon: '🎨', color: isDarkMode ? '#f6ad55' : '#ed8936' }
                  ].map(categoryInfo => {
                    const categoryItems = portfolioData.filter(item => item.category === categoryInfo.category && !recycledPrograms.some(r => r.id === item.id));
                    if (categoryItems.length === 0) return null;

                    return (
                      <div key={categoryInfo.category} className="mb-2">
                        <div className="text-xs mb-1 px-2 font-medium" style={{ color: categoryInfo.color }}>
                          {categoryInfo.icon} {categoryInfo.label}
                        </div>
                        {categoryItems.map((item) => (
                          <div 
                            key={item.id}
                            className="flex items-center p-2 ml-2 cursor-pointer transition-colors rounded"
                            onClick={() => { openWindow(item.id); setStartMenuOpen(false); }}
                            onMouseEnter={(e) => e.currentTarget.style.background = isDarkMode ? '#4a5568' : '#e8f0fe'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <div className="w-6 h-6 mr-2 border flex items-center justify-center" style={{ background: isDarkMode ? 'linear-gradient(145deg, #718096 0%, #4a5568 100%)' : 'linear-gradient(145deg, #e0e0e0 0%, #a0a0a0 100%)', borderColor: isDarkMode ? '#a0aec0' : '#808080', borderRadius: '1px' }}>
                              <span className="text-xs" style={{ color: categoryInfo.color }}>{categoryInfo.icon}</span>
                            </div>
                            <div>
                              <div className="text-sm" style={{ color: isDarkMode ? '#f7fafc' : 'black' }}>{item.title}</div>
                              <div className="text-xs" style={{ color: isDarkMode ? '#cbd5e0' : '#666666' }}>{item.type}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side - Recently Used */}
            <div className="w-40 p-3" style={{ background: isDarkMode ? '#4a5568' : '#e6f3ff' }}>
              <div className="space-y-3">
                <div className="text-xs mb-3" style={{ color: isDarkMode ? '#e2e8f0' : '#666666' }}>Recently Used</div>
                {[
                  { icon: '🌐', label: 'Internet', onClick: () => openWindow('ie') },
                  { icon: '📁', label: 'Documents', onClick: () => openWindow('mydocs') },
                  { icon: '🖼️', label: 'Pictures', onClick: () => openWindow('mypics') },
                  { icon: '🎵', label: 'Music', onClick: () => openWindow('mymusic') }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-2 text-xs cursor-pointer transition-colors rounded" 
                    style={{ color: isDarkMode ? '#f7fafc' : '#2f4f4f' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = isDarkMode ? '#718096' : '#f0f8ff'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    onClick={() => { item.onClick(); setStartMenuOpen(false); }}
                  >
                    <div className="w-6 h-6 mr-2 border text-xs flex items-center justify-center" style={{ background: isDarkMode ? 'linear-gradient(145deg, #718096 0%, #4a5568 100%)' : 'linear-gradient(145deg, #e0e0e0 0%, #a0a0a0 100%)', borderColor: isDarkMode ? '#a0aec0' : '#808080', borderRadius: '2px' }}>
                      {item.icon}
                    </div>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Start Menu Footer */}
          <div 
            className="h-12 flex items-center justify-between px-4 border-t-2"
            style={{ 
              background: isDarkMode 
                ? 'linear-gradient(180deg, #4a5568 0%, #2d3748 100%)' 
                : 'linear-gradient(180deg, #cce7ff 0%, #b3d9ff 100%)', 
              borderTopColor: isDarkMode ? '#718096' : '#4682b4'
            }}
          >
            <button 
              className="flex items-center text-xs px-2 py-1 rounded transition-colors" 
              style={{ color: isDarkMode ? '#f7fafc' : '#2f4f4f' }}
              onMouseEnter={(e) => e.currentTarget.style.background = isDarkMode ? '#718096' : '#e8f0fe'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              onClick={handleLogOff}
            >
              <div className="w-5 h-5 mr-2 border" style={{ background: isDarkMode ? 'linear-gradient(45deg, #fc8181 0%, #e53e3e 100%)' : 'linear-gradient(45deg, #ff6347 0%, #ff4500 100%)', borderColor: isDarkMode ? '#e53e3e' : '#cd5c5c', borderRadius: '2px' }}></div>
              Log Off
            </button>
            <button 
              className="flex items-center text-xs px-2 py-1 rounded transition-colors" 
              style={{ color: isDarkMode ? '#f7fafc' : '#2f4f4f' }}
              onMouseEnter={(e) => e.currentTarget.style.background = isDarkMode ? '#718096' : '#e8f0fe'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              onClick={() => {
                setStartMenuOpen(false);
                onTurnOff();
              }}
            >
              <div className="w-5 h-5 mr-2 border" style={{ background: isDarkMode ? 'linear-gradient(45deg, #718096 0%, #a0aec0 100%)' : 'linear-gradient(45deg, #696969 0%, #2f4f4f 100%)', borderColor: isDarkMode ? '#a0aec0' : '#2f4f4f', borderRadius: '2px' }}></div>
              Turn Off Computer
            </button>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div 
        className="taskbar fixed bottom-0 left-0 right-0 h-10 shadow-lg flex items-center border-t-2"
        style={{ ...darkModeStyles.taskbar, fontFamily: 'Tahoma, sans-serif', zIndex: 9000 }}
      >
        {/* Start Button */}
        <button 
          className={`h-8 px-3 mx-1 shadow-md flex items-center space-x-2 transition-all border-2 ${startMenuOpen ? 'shadow-inner' : 'shadow-lg'}`}
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          style={{
            background: startMenuOpen ? darkModeStyles.startButton.backgroundPressed : darkModeStyles.startButton.backgroundNormal,
            borderColor: startMenuOpen ? (isDarkMode ? '#4a5568' : '#1e3f5a') : darkModeStyles.startButton.borderColor,
            borderRadius: '3px'
          }}
        >
          <div 
            className="w-6 h-6 flex items-center justify-center border"
            style={{ background: isDarkMode ? '#2d3748' : 'white', borderColor: isDarkMode ? '#718096' : '#ccc', borderRadius: '2px' }}
          >
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5" style={{ borderRadius: '1px' }}>
              <div style={{ background: isDarkMode ? '#dd6b20' : '#ff6b35', borderRadius: '1px' }}></div>
              <div style={{ background: isDarkMode ? '#38a169' : '#7db46c', borderRadius: '1px' }}></div>
              <div style={{ background: isDarkMode ? '#3182ce' : '#4fc3f7', borderRadius: '1px' }}></div>
              <div style={{ background: isDarkMode ? '#ed8936' : '#ffeb3b', borderRadius: '1px' }}></div>
            </div>
          </div>
          <span className="text-white text-sm font-semibold">Start</span>
        </button>

        {/* Quick Launch - System Apps */}
        <div className="flex items-center space-x-1 ml-2 mr-4">
          {[
            { id: 'ie', icon: '🌐', title: 'Internet Explorer' },
            { id: 'mydocs', icon: '📁', title: 'My Documents' },
            { id: 'mypics', icon: '🖼️', title: 'My Pictures' },
            { id: 'mymusic', icon: '🎵', title: 'My Music' },
            { id: 'controlpanel', icon: '⚙️', title: 'Control Panel' }
          ].map((app) => (
            <div 
              key={app.id}
              className="w-7 h-7 border cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-center"
              style={{ 
                background: isDarkMode ? 'linear-gradient(145deg, #4a5568 0%, #2d3748 100%)' : 'linear-gradient(145deg, #e6f3ff 0%, #4682b4 100%)', 
                borderColor: isDarkMode ? '#718096' : '#2e5984',
                borderRadius: '2px'
              }}
              onClick={() => handleSystemAppClick(app.id)}
              title={app.title}
            >
              <div className="text-white text-xs">{app.icon}</div>
            </div>
          ))}
        </div>

        {/* Taskbar Applications */}
        <div className="flex-1 flex items-center space-x-1">
          {Object.entries(windows)
            .filter(([_, window]) => window.isOpen)
            .map(([windowId, window]) => {
              const isAbout = windowId === 'about';
              const isRecycle = windowId === 'recycle';
              const isSystemApp = ['ie', 'mydocs', 'mypics', 'mymusic', 'controlpanel'].includes(windowId);
              const portfolioPiece = !isAbout && !isRecycle && !isSystemApp ? portfolioData.find(p => p.id === windowId) : null;
              
              let title = windowId;
              if (isAbout) title = 'About';
              else if (isRecycle) title = 'Recycle Bin';
              else if (windowId === 'ie') title = 'Internet Explorer';
              else if (windowId === 'mydocs') title = 'My Documents';
              else if (windowId === 'mypics') title = 'My Pictures';
              else if (windowId === 'mymusic') title = 'Windows Media Player';
              else if (portfolioPiece) title = portfolioPiece.title;
              
              return (
                <button
                  key={windowId}
                  className={`h-7 px-3 text-xs text-white border flex items-center space-x-1 transition-all ${window.isMinimized ? 'opacity-70' : 'opacity-100'}`}
                  style={{
                    background: window.isMinimized 
                      ? (isDarkMode ? 'linear-gradient(180deg, #2d3748 0%, #1a202c 100%)' : 'linear-gradient(180deg, #2e5984 0%, #1e3f5a 100%)')
                      : (isDarkMode ? 'linear-gradient(180deg, #718096 0%, #4a5568 100%)' : 'linear-gradient(180deg, #5a9fd4 0%, #4682b4 100%)'),
                    borderColor: isDarkMode ? '#a0aec0' : '#87ceeb',
                    borderRadius: '2px',
                    maxWidth: '160px'
                  }}
                  onClick={() => {
                    if (window.isMinimized) {
                      setWindows(prev => ({ ...prev, [windowId]: { ...prev[windowId], isMinimized: false } }));
                    }
                    focusWindow(windowId);
                  }}
                >
                  <div 
                    className={`w-4 h-4 border flex items-center justify-center`}
                    style={{ 
                      background: isDarkMode ? 'linear-gradient(145deg, #718096 0%, #4a5568 100%)' : 'linear-gradient(145deg, #e0e0e0 0%, #a0a0a0 100%)',
                      borderColor: isDarkMode ? '#a0aec0' : '#808080',
                      borderRadius: '1px'
                    }}
                  >
                    <span className="text-xs" style={{ color: isDarkMode ? '#f7fafc' : '#2d3748' }}>
                      {isAbout ? 'i' : isRecycle ? '🗑' : windowId === 'ie' ? '🌐' : windowId === 'mydocs' ? '📁' : windowId === 'mypics' ? '🖼️' : windowId === 'mymusic' ? '🎵' : portfolioPiece?.category === 'photography' ? '📸' : portfolioPiece?.category === '3d' ? '🎯' : '🎨'}
                    </span>
                  </div>
                  <span className="truncate">{title}</span>
                </button>
              );
            })}
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-2 mr-2">
          <div className="flex items-center space-x-1">
            {[
              { color: isDarkMode ? 'linear-gradient(45deg, #a0aec0 0%, #718096 100%)' : 'linear-gradient(45deg, #d3d3d3 0%, #a9a9a9 100%)', border: isDarkMode ? '#4a5568' : '#696969', title: 'Volume' },
              { color: isDarkMode ? 'linear-gradient(45deg, #38a169 0%, #2f855a 100%)' : 'linear-gradient(45deg, #90ee90 0%, #32cd32 100%)', border: isDarkMode ? '#2f855a' : '#228b22', title: 'Network' },
              { color: isDarkMode ? 'linear-gradient(45deg, #3182ce 0%, #2c5282 100%)' : 'linear-gradient(45deg, #87ceeb 0%, #4682b4 100%)', border: isDarkMode ? '#2c5282' : '#2e5984', title: 'Antivirus' }
            ].map((item, index) => (
              <div 
                key={index}
                className="w-4 h-4 border cursor-pointer hover:opacity-80 transition-opacity"
                style={{ background: item.color, borderColor: item.border, borderRadius: '1px' }}
                title={item.title}
              ></div>
            ))}
          </div>
          
          {/* Clock */}
          <div 
            className="px-3 py-1 text-white text-xs border cursor-pointer hover:opacity-90 transition-opacity"
            style={{
              background: isDarkMode ? 'linear-gradient(180deg, #718096 0%, #4a5568 100%)' : 'linear-gradient(180deg, #5a9fd4 0%, #4682b4 100%)',
              borderColor: isDarkMode ? '#a0aec0' : '#87ceeb',
              borderRadius: '2px',
              minWidth: '65px',
              textAlign: 'center'
            }}
            title={formatDate(currentTime)}
          >
            <div>{formatTime(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* Jared Assistant - Spawns from recycle bin */}
      {showJared && (
        <JaredAssistant 
          onDismiss={() => setShowJared(false)}
        />
      )}

      {/* Click outside start menu to close */}
      {startMenuOpen && (
        <div 
          className="fixed inset-0 cursor-default"
          style={{ zIndex: 9998 }}
          onClick={() => setStartMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}