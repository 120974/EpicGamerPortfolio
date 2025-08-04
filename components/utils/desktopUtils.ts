import { ICON_WIDTH, ICON_HEIGHT, GRID_SIZE, TASKBAR_HEIGHT } from '../constants/layout';
import { DesktopIcon, IconPositions, WindowPositions, RecycledProgram } from '../types/desktop';

// Storage functions
export const loadWindowPositions = (): WindowPositions => {
  try {
    const saved = localStorage.getItem('xp-window-positions');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

export const loadIconPositions = (): IconPositions => {
  return {}; // Always return empty object to force default positioning
};

export const loadRecycledPrograms = (): RecycledProgram[] => {
  try {
    const saved = localStorage.getItem('xp-recycled-programs');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((item: any) => ({
        ...item,
        deletedAt: new Date(item.deletedAt)
      }));
    }
    return [];
  } catch {
    return [];
  }
};

// Position utilities
export const snapToGrid = (x: number, y: number) => ({
  x: Math.round(x / GRID_SIZE) * GRID_SIZE,
  y: Math.round(y / GRID_SIZE) * GRID_SIZE
});

export const checkCollision = (x: number, y: number, icons: DesktopIcon[], excludeId?: string) => {
  const filteredIcons = icons.filter(icon => icon.id !== excludeId);
  
  for (const icon of filteredIcons) {
    const iconRect = {
      left: icon.x,
      right: icon.x + ICON_WIDTH,
      top: icon.y,
      bottom: icon.y + ICON_HEIGHT
    };
    
    const newRect = {
      left: x,
      right: x + ICON_WIDTH,
      top: y,
      bottom: y + ICON_HEIGHT
    };
    
    if (newRect.left < iconRect.right && 
        newRect.right > iconRect.left && 
        newRect.top < iconRect.bottom && 
        newRect.bottom > iconRect.top) {
      return true;
    }
  }
  
  return false;
};

export const findNearestAvailablePosition = (targetX: number, targetY: number, icons: DesktopIcon[], excludeId?: string) => {
  const snapped = snapToGrid(targetX, targetY);
  
  if (!checkCollision(snapped.x, snapped.y, icons, excludeId)) {
    return snapped;
  }
  
  for (let radius = GRID_SIZE; radius < 400; radius += GRID_SIZE) {
    for (let angle = 0; angle < 360; angle += 45) {
      const rad = (angle * Math.PI) / 180;
      const x = Math.round((snapped.x + Math.cos(rad) * radius) / GRID_SIZE) * GRID_SIZE;
      const y = Math.round((snapped.y + Math.sin(rad) * radius) / GRID_SIZE) * GRID_SIZE;
      
      if (x >= 0 && y >= 0 && 
          x <= window.innerWidth - ICON_WIDTH && 
          y <= window.innerHeight - TASKBAR_HEIGHT - ICON_HEIGHT) {
        if (!checkCollision(x, y, icons, excludeId)) {
          return { x, y };
        }
      }
    }
  }
  
  return snapped;
};

export const isPositionOverRecycleBin = (x: number, y: number, icons: DesktopIcon[]) => {
  const recycleIcon = icons.find(icon => icon.id === 'recycle');
  if (!recycleIcon) return false;
  
  const recycleRect = {
    left: recycleIcon.x,
    right: recycleIcon.x + ICON_WIDTH,
    top: recycleIcon.y,
    bottom: recycleIcon.y + ICON_HEIGHT
  };
  
  return x >= recycleRect.left && x <= recycleRect.right && 
         y >= recycleRect.top && y <= recycleRect.bottom;
};

export const getCenteredPosition = (width: number = 640, height: number = 480) => ({
  x: Math.max(0, (window.innerWidth - width) / 2),
  y: Math.max(0, (window.innerHeight - height - TASKBAR_HEIGHT) / 2),
  width,
  height
});

export const getPortfolioCenteredPosition = (width: number = 900, height: number = 700) => ({
  x: Math.max(0, (window.innerWidth - width) / 2),
  y: Math.max(0, (window.innerHeight - height - TASKBAR_HEIGHT) / 2),
  width,
  height
});

export const getMusicAppPosition = (width: number = 900, height: number = 650) => ({
  x: Math.max(0, (window.innerWidth - width) / 2),
  y: Math.max(0, (window.innerHeight - height - TASKBAR_HEIGHT) / 2),
  width,
  height
});

export const getGameWindowPosition = (gameId: string) => {
  switch (gameId) {
    case 'solitaire':
      return {
        x: Math.max(0, (window.innerWidth - 800) / 2),
        y: Math.max(0, (window.innerHeight - 600 - TASKBAR_HEIGHT) / 2),
        width: 800,
        height: 600
      };
    case 'minesweeper':
      return {
        x: Math.max(0, (window.innerWidth - 640) / 2),
        y: Math.max(0, (window.innerHeight - 480 - TASKBAR_HEIGHT) / 2),
        width: 640,
        height: 480
      };
    case 'pacman':
      return {
        x: Math.max(0, (window.innerWidth - 650) / 2),
        y: Math.max(0, (window.innerHeight - 550 - TASKBAR_HEIGHT) / 2),
        width: 650,
        height: 550
      };
    default:
      return getCenteredPosition();
  }
};

// Time formatting
export const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};