import { useState, useRef, useEffect, ReactNode } from 'react';

interface DraggableWindowProps {
  title: string;
  icon: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  children: ReactNode;
  zIndex: number;
  onFocus: () => void;
  windowId: string;
  onPositionChange?: (id: string, position: { x: number; y: number; width: number; height: number }) => void;
  initialPosition?: { x: number; y: number; width: number; height: number };
}

export default function DraggableWindow({
  title,
  icon,
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  children,
  zIndex,
  onFocus,
  windowId,
  onPositionChange,
  initialPosition
}: DraggableWindowProps) {
  const [position, setPosition] = useState(
    initialPosition || { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200, width: 450, height: 380 }
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [resizeDirection, setResizeDirection] = useState('');
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    onFocus();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: position.width,
      height: position.height
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        const newX = Math.max(0, Math.min(window.innerWidth - position.width, e.clientX - dragStart.x));
        const newY = Math.max(0, Math.min(window.innerHeight - position.height, e.clientY - dragStart.y));
        const newPosition = { ...position, x: newX, y: newY };
        setPosition(newPosition);
        onPositionChange?.(windowId, newPosition);
      }

      if (isResizing && !isMaximized) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        let newPosition = { ...position };

        if (resizeDirection.includes('right')) {
          newPosition.width = Math.max(300, resizeStart.width + deltaX);
        }
        if (resizeDirection.includes('bottom')) {
          newPosition.height = Math.max(200, resizeStart.height + deltaY);
        }
        if (resizeDirection.includes('left')) {
          const newWidth = Math.max(300, resizeStart.width - deltaX);
          newPosition.x = position.x + (position.width - newWidth);
          newPosition.width = newWidth;
        }
        if (resizeDirection.includes('top')) {
          const newHeight = Math.max(200, resizeStart.height - deltaY);
          newPosition.y = position.y + (position.height - newHeight);
          newPosition.height = newHeight;
        }

        setPosition(newPosition);
        onPositionChange?.(windowId, newPosition);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection('');
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, resizeDirection, isMaximized, position, windowId, onPositionChange]);

  if (!isOpen) return null;

  const windowStyle = isMaximized 
    ? { left: 0, top: 0, right: 0, bottom: 40, zIndex, width: 'auto', height: 'auto' }
    : { 
        left: position.x, 
        top: position.y, 
        width: position.width, 
        height: position.height, 
        zIndex 
      };

  return (
    <div
      ref={windowRef}
      className="absolute border-2 shadow-2xl select-none"
      style={{
        ...windowStyle,
        borderTopColor: '#0054e3',
        borderLeftColor: '#0054e3', 
        borderRightColor: '#0054e3',
        borderBottomColor: '#0054e3',
        background: 'linear-gradient(180deg, #4a90e2 0%, #2171b5 100%)'
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-7 flex items-center justify-between px-1 cursor-move select-none relative"
        onMouseDown={handleMouseDown}
        style={{
          background: 'linear-gradient(180deg, #4a90e2 0%, #2171b5 100%)',
          borderBottom: '1px solid #1e5a8a'
        }}
      >
        <div className="flex items-center space-x-1 px-1">
          {icon}
          <span className="text-white text-xs font-normal truncate" style={{ fontFamily: 'Tahoma, sans-serif' }}>
            {title}
          </span>
        </div>
        <div className="flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="w-5 h-4 mr-0.5 flex items-center justify-center hover:bg-blue-400 transition-colors"
            style={{
              background: 'linear-gradient(180deg, #e8f0fe 0%, #c6d9f7 50%, #9bb9f0 100%)',
              border: '1px solid #5c85c7',
              fontSize: '11px',
              fontFamily: 'Tahoma, sans-serif'
            }}
          >
            <span className="text-black leading-none">−</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className="w-5 h-4 mr-0.5 flex items-center justify-center hover:bg-blue-400 transition-colors"
            style={{
              background: 'linear-gradient(180deg, #e8f0fe 0%, #c6d9f7 50%, #9bb9f0 100%)',
              border: '1px solid #5c85c7',
              fontSize: '11px',
              fontFamily: 'Tahoma, sans-serif'
            }}
          >
            <span className="text-black leading-none">□</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-5 h-4 flex items-center justify-center transition-colors"
            style={{
              background: 'linear-gradient(180deg, #ff9999 0%, #ff6666 50%, #ff3333 100%)',
              border: '1px solid #cc0000',
              fontSize: '11px',
              fontFamily: 'Tahoma, sans-serif'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'linear-gradient(180deg, #ffbbbb 0%, #ff8888 50%, #ff5555 100%)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'linear-gradient(180deg, #ff9999 0%, #ff6666 50%, #ff3333 100%)';
            }}
          >
            <span className="text-white leading-none">×</span>
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div 
        className="h-5 flex items-center px-1"
        style={{
          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
          borderBottom: '1px solid #c0c0c0',
          fontFamily: 'Tahoma, sans-serif'
        }}
      >
        <div className="flex space-x-3 text-xs">
          <span className="hover:bg-blue-100 px-1 cursor-pointer">File</span>
          <span className="hover:bg-blue-100 px-1 cursor-pointer">Edit</span>
          <span className="hover:bg-blue-100 px-1 cursor-pointer">View</span>
          <span className="hover:bg-blue-100 px-1 cursor-pointer">Help</span>
        </div>
      </div>

      {/* Content Area */}
      <div 
        className="overflow-auto"
        style={{ 
          height: isMaximized ? 'calc(100% - 48px)' : `${position.height - 48}px`,
          background: '#ffffff',
          fontFamily: 'Tahoma, sans-serif'
        }}
      >
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          {/* Corner handles */}
          <div
            className="absolute w-3 h-3 cursor-nw-resize"
            style={{ top: -1, left: -1 }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'top-left')}
          />
          <div
            className="absolute w-3 h-3 cursor-ne-resize"
            style={{ top: -1, right: -1 }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'top-right')}
          />
          <div
            className="absolute w-3 h-3 cursor-sw-resize"
            style={{ bottom: -1, left: -1 }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-left')}
          />
          <div
            className="absolute w-3 h-3 cursor-se-resize"
            style={{ bottom: -1, right: -1 }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
          />
          
          {/* Edge handles */}
          <div
            className="absolute h-1 cursor-n-resize"
            style={{ top: -1, left: 3, right: 3 }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'top')}
          />
          <div
            className="absolute h-1 cursor-s-resize"
            style={{ bottom: -1, left: 3, right: 3 }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}
          />
          <div
            className="absolute w-1 cursor-w-resize"
            style={{ left: -1, top: 3, bottom: 3 }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'left')}
          />
          <div
            className="absolute w-1 cursor-e-resize"
            style={{ right: -1, top: 3, bottom: 3 }}
            onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
          />
        </>
      )}
    </div>
  );
}