import { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface Ghost {
  position: Position;
  direction: Position;
  color: string;
  name: string;
}

export default function PacmanApp() {
  const [pacmanPos, setPacmanPos] = useState<Position>({ x: 9, y: 15 });
  const [pacmanDirection, setPacmanDirection] = useState<Position>({ x: 0, y: 0 });
  const [ghosts, setGhosts] = useState<Ghost[]>([
    { position: { x: 9, y: 9 }, direction: { x: 1, y: 0 }, color: 'red', name: 'Blinky' },
    { position: { x: 10, y: 9 }, direction: { x: -1, y: 0 }, color: 'pink', name: 'Pinky' },
    { position: { x: 8, y: 9 }, direction: { x: 1, y: 0 }, color: 'cyan', name: 'Inky' },
    { position: { x: 10, y: 10 }, direction: { x: -1, y: 0 }, color: 'orange', name: 'Clyde' }
  ]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'gameover' | 'won'>('paused');
  const [pellets, setPellets] = useState<boolean[][]>([]);
  const [powerPellets, setPowerPellets] = useState<Position[]>([]);
  const [frightened, setFrightened] = useState(false);
  const [lives, setLives] = useState(3);

  // Simple maze layout (19x21 grid)
  const maze = [
    "#####################",
    "#.........#.........#",
    "#.##.###.#.###.##.#",
    "#P..................P#",
    "#.##.#.#####.#.##.#",
    "#....#...#...#....#",
    "####.###.#.###.####",
    "   #.#.......#.#   ",
    "####.#.## ##.#.####",
    "#......#   #......#",
    "####.#.#####.#.####",
    "   #.#.......#.#   ",
    "####.#.#####.#.####",
    "#.........#.........#",
    "#.##.###.#.###.##.#",
    "#P.#.....P.....#.P#",
    "##.#.#.#####.#.#.##",
    "#....#...#...#....#",
    "#.######.#.######.#",
    "#...................#",
    "#####################"
  ];

  // Initialize pellets
  useEffect(() => {
    const newPellets: boolean[][] = [];
    const newPowerPellets: Position[] = [];
    
    for (let y = 0; y < maze.length; y++) {
      newPellets[y] = [];
      for (let x = 0; x < maze[y].length; x++) {
        if (maze[y][x] === '.') {
          newPellets[y][x] = true;
        } else if (maze[y][x] === 'P') {
          newPellets[y][x] = false;
          newPowerPellets.push({ x, y });
        } else {
          newPellets[y][x] = false;
        }
      }
    }
    
    setPellets(newPellets);
    setPowerPellets(newPowerPellets);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      // Move Pacman
      setPacmanPos(prev => {
        const newX = prev.x + pacmanDirection.x;
        const newY = prev.y + pacmanDirection.y;
        
        // Check walls
        if (newY >= 0 && newY < maze.length && 
            newX >= 0 && newX < maze[newY].length && 
            maze[newY][newX] !== '#') {
          return { x: newX, y: newY };
        }
        return prev;
      });

      // Move ghosts (simple AI)
      setGhosts(prev => prev.map(ghost => {
        const directions = [
          { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }
        ];
        
        // Simple random movement
        const possibleDirections = directions.filter(dir => {
          const newX = ghost.position.x + dir.x;
          const newY = ghost.position.y + dir.y;
          return newY >= 0 && newY < maze.length && 
                 newX >= 0 && newX < maze[newY].length && 
                 maze[newY][newX] !== '#';
        });

        if (possibleDirections.length > 0) {
          const randomDir = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
          return {
            ...ghost,
            position: {
              x: ghost.position.x + randomDir.x,
              y: ghost.position.y + randomDir.y
            },
            direction: randomDir
          };
        }
        return ghost;
      }));
    }, 200);

    return () => clearInterval(gameLoop);
  }, [gameState, pacmanDirection]);

  // Check collisions and eat pellets
  useEffect(() => {
    // Check pellet collision
    if (pellets[pacmanPos.y] && pellets[pacmanPos.y][pacmanPos.x]) {
      setPellets(prev => {
        const newPellets = prev.map(row => [...row]);
        newPellets[pacmanPos.y][pacmanPos.x] = false;
        return newPellets;
      });
      setScore(prev => prev + 10);
    }

    // Check power pellet collision
    const powerPelletIndex = powerPellets.findIndex(p => p.x === pacmanPos.x && p.y === pacmanPos.y);
    if (powerPelletIndex !== -1) {
      setPowerPellets(prev => prev.filter((_, i) => i !== powerPelletIndex));
      setScore(prev => prev + 50);
      setFrightened(true);
      setTimeout(() => setFrightened(false), 10000); // 10 seconds
    }

    // Check ghost collision
    const hitGhost = ghosts.find(ghost => 
      ghost.position.x === pacmanPos.x && ghost.position.y === pacmanPos.y
    );
    
    if (hitGhost) {
      if (frightened) {
        // Eat ghost
        setScore(prev => prev + 200);
        // Reset ghost position (simplified)
        setGhosts(prev => prev.map(g => 
          g === hitGhost ? { ...g, position: { x: 9, y: 9 } } : g
        ));
      } else {
        // Die
        setLives(prev => {
          const newLives = prev - 1;
          if (newLives <= 0) {
            setGameState('gameover');
          } else {
            // Reset positions
            setPacmanPos({ x: 9, y: 15 });
            setPacmanDirection({ x: 0, y: 0 });
          }
          return newLives;
        });
      }
    }

    // Check win condition
    const remainingPellets = pellets.flat().filter(Boolean).length;
    if (remainingPellets === 0 && powerPellets.length === 0) {
      setGameState('won');
    }
  }, [pacmanPos, pellets, powerPellets, ghosts, frightened]);

  // Handle keyboard input
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameState !== 'playing') return;

    switch (e.key) {
      case 'ArrowUp':
        setPacmanDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        setPacmanDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        setPacmanDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        setPacmanDirection({ x: 1, y: 0 });
        break;
      case ' ':
        setGameState('paused');
        break;
    }
  }, [gameState]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const startGame = () => {
    setGameState('playing');
  };

  const resetGame = () => {
    setPacmanPos({ x: 9, y: 15 });
    setPacmanDirection({ x: 0, y: 0 });
    setScore(0);
    setLives(3);
    setGameState('paused');
    setFrightened(false);
    
    // Reset pellets
    const newPellets: boolean[][] = [];
    const newPowerPellets: Position[] = [];
    
    for (let y = 0; y < maze.length; y++) {
      newPellets[y] = [];
      for (let x = 0; x < maze[y].length; x++) {
        if (maze[y][x] === '.') {
          newPellets[y][x] = true;
        } else if (maze[y][x] === 'P') {
          newPellets[y][x] = false;
          newPowerPellets.push({ x, y });
        } else {
          newPellets[y][x] = false;
        }
      }
    }
    
    setPellets(newPellets);
    setPowerPellets(newPowerPellets);
  };

  const getCellContent = (x: number, y: number) => {
    // Check for Pacman
    if (pacmanPos.x === x && pacmanPos.y === y) {
      return <span className="text-yellow-400 text-lg">🟡</span>;
    }

    // Check for ghosts
    const ghost = ghosts.find(g => g.position.x === x && g.position.y === y);
    if (ghost) {
      return (
        <span className={`text-lg ${frightened ? 'text-blue-500' : ''}`}>
          {frightened ? '👻' : '👾'}
        </span>
      );
    }

    // Check for power pellets
    if (powerPellets.some(p => p.x === x && p.y === y)) {
      return <span className="text-white text-lg">⚪</span>;
    }

    // Check for regular pellets
    if (pellets[y] && pellets[y][x]) {
      return <span className="text-white text-xs">•</span>;
    }

    return null;
  };

  return (
    <div className="h-full flex flex-col bg-black overflow-hidden" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
      {/* Header */}
      <div 
        className="h-16 border-b px-4 py-2"
        style={{ 
          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
          borderColor: '#c0c0c0'
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold" style={{ color: '#003c71' }}>
            🟡 PAC-MAN
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={gameState === 'playing' ? () => setGameState('paused') : startGame}
              className="px-3 py-1 text-xs border hover:bg-gray-100"
              style={{
                background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
                borderColor: '#999999'
              }}
            >
              {gameState === 'playing' ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetGame}
              className="px-3 py-1 text-xs border hover:bg-gray-100"
              style={{
                background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
                borderColor: '#999999'
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Game Stats */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <span>Score: {score}</span>
            <span>Lives: {'🟡'.repeat(lives)}</span>
            {frightened && <span className="text-blue-500">POWER MODE!</span>}
          </div>
          <div>
            {gameState === 'paused' && 'Press Start to play'}
            {gameState === 'playing' && 'Use arrow keys to move'}
            {gameState === 'gameover' && '💀 Game Over!'}
            {gameState === 'won' && '🎉 You Won!'}
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="flex-1 p-2 overflow-hidden flex justify-center items-center">
        <div className="inline-block">
          {maze.map((row, y) => (
            <div key={y} className="flex">
              {row.split('').map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className={`w-5 h-5 flex items-center justify-center text-xs ${
                    cell === '#' ? 'bg-blue-800 border border-blue-600' : 'bg-black'
                  }`}
                >
                  {cell === '#' ? '' : getCellContent(x, y)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div 
        className="border-t p-3 text-xs text-white"
        style={{ 
          background: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#333333'
        }}
      >
        <p className="mb-1"><strong>How to play:</strong></p>
        <p>• Use arrow keys to move Pac-Man • Eat all dots to win • Avoid ghosts (unless powered up)</p>
        <p>• Power pellets make ghosts vulnerable • Spacebar to pause • Collect points and survive!</p>
      </div>
    </div>
  );
}