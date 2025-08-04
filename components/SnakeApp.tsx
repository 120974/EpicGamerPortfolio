import { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SnakeAppProps {
  onClose?: () => void;
}

const GRID_SIZE = 16;
const BOARD_SIZE = 320;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeApp({ onClose }: SnakeAppProps) {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    const maxPos = BOARD_SIZE / GRID_SIZE;
    let newFood: Position;
    
    do {
      newFood = {
        x: Math.floor(Math.random() * maxPos),
        y: Math.floor(Math.random() * maxPos)
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsPlaying(false);
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE / GRID_SIZE || 
          head.y < 0 || head.y >= BOARD_SIZE / GRID_SIZE) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setIsPlaying(false);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPlaying, generateFood]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isPlaying && !gameOver) return;

    switch (e.key) {
      case 'ArrowUp':
        if (direction.y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x !== -1) setDirection({ x: 1, y: 0 });
        break;
      case ' ':
        e.preventDefault();
        if (gameOver) {
          resetGame();
        } else {
          setIsPlaying(!isPlaying);
        }
        break;
    }
  }, [direction, isPlaying, gameOver, resetGame]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  const startGame = () => {
    setIsPlaying(true);
  };

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
      {/* Header */}
      <div 
        className="h-8 border-b flex items-center justify-between px-3"
        style={{ 
          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
          borderColor: '#c0c0c0'
        }}
      >
        <span className="font-medium">Snake Game</span>
        <div className="flex items-center space-x-4 text-xs">
          <span>Score: {score}</span>
          <span>High: {highScore}</span>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-2">
        <div 
          className="relative border-2 mb-3"
          style={{ 
            width: BOARD_SIZE,
            height: BOARD_SIZE,
            background: '#2d5a2d',
            borderColor: '#8b4513'
          }}
        >
          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                left: segment.x * GRID_SIZE,
                top: segment.y * GRID_SIZE,
                width: GRID_SIZE,
                height: GRID_SIZE,
                background: index === 0 
                  ? 'linear-gradient(45deg, #90EE90 0%, #32CD32 100%)' 
                  : 'linear-gradient(45deg, #228B22 0%, #006400 100%)',
                border: '1px solid #006400',
                borderRadius: '2px'
              }}
            />
          ))}

          {/* Food */}
          <div
            className="absolute"
            style={{
              left: food.x * GRID_SIZE,
              top: food.y * GRID_SIZE,
              width: GRID_SIZE,
              height: GRID_SIZE,
              background: 'linear-gradient(45deg, #FF6347 0%, #DC143C 100%)',
              border: '1px solid #8B0000',
              borderRadius: '50%'
            }}
          />

          {/* Game Over Overlay */}
          {gameOver && (
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ 
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white'
              }}
            >
              <div className="text-center">
                <h2 className="text-xl mb-2">Game Over!</h2>
                <p className="mb-1 text-sm">Final Score: {score}</p>
                <p className="text-xs mb-3">Press SPACE to play again</p>
              </div>
            </div>
          )}

          {/* Start Screen */}
          {!isPlaying && !gameOver && (
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ 
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white'
              }}
            >
              <div className="text-center">
                <h2 className="text-xl mb-3">🐍 Snake</h2>
                <p className="text-xs mb-2">Use arrow keys to move</p>
                <p className="text-xs mb-3">Eat the red food to grow!</p>
                <button
                  onClick={startGame}
                  className="px-4 py-2 text-sm rounded border"
                  style={{
                    background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
                    borderColor: '#999999',
                    color: '#000'
                  }}
                >
                  Start Game
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="text-center">
          <div className="flex space-x-4 mb-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={gameOver}
              className="px-3 py-1 text-xs border rounded"
              style={{
                background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
                borderColor: '#999999'
              }}
            >
              {isPlaying ? 'Pause' : 'Resume'}
            </button>
            <button
              onClick={resetGame}
              className="px-3 py-1 text-xs border rounded"
              style={{
                background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
                borderColor: '#999999'
              }}
            >
              New Game
            </button>
          </div>
          <p className="text-xs text-gray-600">
            Arrow keys to move • SPACE to pause/restart
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
        {isPlaying ? 'Playing...' : gameOver ? 'Game Over' : 'Ready to play'}
        <div className="flex-1"></div>
        <span>Length: {snake.length}</span>
      </div>
    </div>
  );
}