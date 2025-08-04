export interface Window {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number; width: number; height: number };
}

export interface WindowPositions {
  [key: string]: { x: number; y: number; width: number; height: number };
}

export interface DesktopIcon {
  id: string;
  title: string;
  type: 'about' | 'art' | 'system' | 'portfolio' | 'game';
  x: number;
  y: number;
  isSystemApp?: boolean;
}

export interface IconPositions {
  [key: string]: { x: number; y: number };
}

export interface RecycledProgram {
  id: string;
  title: string;
  type: 'about' | 'art';
  deletedAt: Date;
}

export interface WindowsXPDesktopProps {
  onTurnOff: () => void;
  isDarkMode: boolean;
}