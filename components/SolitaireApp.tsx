import { useState, useEffect } from 'react';

interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: number; // 1-13 (1=Ace, 11=Jack, 12=Queen, 13=King)
  faceUp: boolean;
  id: string;
}

export default function SolitaireApp() {
  const [deck, setDeck] = useState<Card[]>([]);
  const [foundations, setFoundations] = useState<Card[][]>([[], [], [], []]);
  const [tableau, setTableau] = useState<Card[][]>([[], [], [], [], [], [], []]);
  const [waste, setWaste] = useState<Card[]>([]);
  const [stock, setStock] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Create a standard deck
  const createDeck = (): Card[] => {
    const suits: Card['suit'][] = ['hearts', 'diamonds', 'clubs', 'spades'];
    const newDeck: Card[] = [];
    
    suits.forEach(suit => {
      for (let value = 1; value <= 13; value++) {
        newDeck.push({
          suit,
          value,
          faceUp: false,
          id: `${suit}-${value}`
        });
      }
    });
    
    // Shuffle deck
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    
    return newDeck;
  };

  // Initialize game
  const initializeGame = () => {
    const newDeck = createDeck();
    const newTableau: Card[][] = [[], [], [], [], [], [], []];
    const newStock: Card[] = [];
    
    // Deal cards to tableau
    let deckIndex = 0;
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row <= col; row++) {
        const card = newDeck[deckIndex++];
        card.faceUp = row === col; // Only top card face up
        newTableau[col].push(card);
      }
    }
    
    // Remaining cards go to stock
    for (let i = deckIndex; i < newDeck.length; i++) {
      newStock.push(newDeck[i]);
    }
    
    setTableau(newTableau);
    setStock(newStock);
    setWaste([]);
    setFoundations([[], [], [], []]);
    setSelectedCard(null);
    setScore(0);
    setMoves(0);
    setGameWon(false);
  };

  // Initialize game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

  // Check for win condition
  useEffect(() => {
    const totalFoundationCards = foundations.reduce((sum, pile) => sum + pile.length, 0);
    if (totalFoundationCards === 52) {
      setGameWon(true);
      setScore(score + 500); // Bonus for winning
    }
  }, [foundations]);

  const getCardDisplay = (card: Card) => {
    if (!card.faceUp) return '🂠';
    
    const suits = {
      hearts: '♥️',
      diamonds: '♦️',
      clubs: '♣️',
      spades: '♠️'
    };
    
    const values = {
      1: 'A', 11: 'J', 12: 'Q', 13: 'K'
    };
    
    const valueDisplay = values[card.value as keyof typeof values] || card.value.toString();
    return `${valueDisplay}${suits[card.suit]}`;
  };

  const isRed = (card: Card) => card.suit === 'hearts' || card.suit === 'diamonds';

  const canMoveToFoundation = (card: Card, foundationIndex: number) => {
    const foundation = foundations[foundationIndex];
    if (foundation.length === 0) return card.value === 1; // Only Ace on empty foundation
    
    const topCard = foundation[foundation.length - 1];
    return card.suit === topCard.suit && card.value === topCard.value + 1;
  };

  const canMoveToTableau = (card: Card, columnIndex: number) => {
    const column = tableau[columnIndex];
    if (column.length === 0) return card.value === 13; // Only King on empty column
    
    const topCard = column[column.length - 1];
    if (!topCard.faceUp) return false;
    
    return isRed(card) !== isRed(topCard) && card.value === topCard.value - 1;
  };

  const handleCardClick = (card: Card, location: 'tableau' | 'waste' | 'foundation', index?: number) => {
    if (!card.faceUp) return;
    
    if (selectedCard === card.id) {
      setSelectedCard(null);
      return;
    }
    
    if (selectedCard) {
      // Try to move selected card
      moveCard(card, location, index);
    } else {
      setSelectedCard(card.id);
    }
  };

  const moveCard = (targetCard: Card, targetLocation: 'tableau' | 'waste' | 'foundation', targetIndex?: number) => {
    // Implementation would be complex for a portfolio demo
    // For now, just deselect
    setSelectedCard(null);
    setMoves(moves + 1);
  };

  const drawFromStock = () => {
    if (stock.length === 0) {
      // Flip waste back to stock
      const newStock = [...waste].reverse().map(card => ({ ...card, faceUp: false }));
      setStock(newStock);
      setWaste([]);
    } else {
      // Draw 3 cards (or remaining cards)
      const cardsToDraw = Math.min(3, stock.length);
      const drawnCards = stock.slice(0, cardsToDraw).map(card => ({ ...card, faceUp: true }));
      const remainingStock = stock.slice(cardsToDraw);
      
      setWaste([...waste, ...drawnCards]);
      setStock(remainingStock);
    }
    setMoves(moves + 1);
  };

  return (
    <div className="h-full flex flex-col bg-green-800 overflow-hidden" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
      {/* Header */}
      <div 
        className="h-12 border-b flex items-center justify-between px-4"
        style={{ 
          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
          borderColor: '#c0c0c0'
        }}
      >
        <div className="flex items-center space-x-4">
          <h2 className="text-sm font-semibold" style={{ color: '#003c71' }}>
            🃏 Solitaire
          </h2>
          <button
            onClick={initializeGame}
            className="px-3 py-1 text-xs border hover:bg-gray-100"
            style={{
              background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
              borderColor: '#999999'
            }}
          >
            New Game
          </button>
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <span>Score: {score}</span>
          <span>Moves: {moves}</span>
        </div>
      </div>

      {/* Game Win Message */}
      {gameWon && (
        <div 
          className="m-4 p-4 border-2 text-center bg-yellow-100"
          style={{ borderColor: '#ffd700', borderRadius: '4px' }}
        >
          <h3 className="text-lg font-bold text-green-700 mb-2">🎉 Congratulations!</h3>
          <p className="text-sm">You won the game with {moves} moves and scored {score} points!</p>
          <button
            onClick={initializeGame}
            className="mt-2 px-4 py-2 text-sm border bg-green-500 text-white hover:bg-green-600"
            style={{ borderRadius: '2px' }}
          >
            Play Again
          </button>
        </div>
      )}

      {/* Game Area */}
      <div className="flex-1 p-3 overflow-hidden">
        {/* Top Row: Stock, Waste, and Foundations */}
        <div className="flex justify-between mb-4">
          {/* Stock and Waste */}
          <div className="flex space-x-2">
            <div 
              className="w-16 h-20 border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-green-700"
              onClick={drawFromStock}
              style={{ borderColor: '#ffffff', borderRadius: '4px' }}
            >
              {stock.length > 0 ? (
                <span className="text-2xl">🂠</span>
              ) : (
                <span className="text-xs text-white text-center">Click to<br/>Reset</span>
              )}
            </div>
            <div 
              className="w-16 h-20 border-2 border-dashed flex items-center justify-center"
              style={{ borderColor: '#ffffff', borderRadius: '4px' }}
            >
              {waste.length > 0 ? (
                <button
                  onClick={() => handleCardClick(waste[waste.length - 1], 'waste')}
                  className={`text-lg hover:bg-green-700 p-1 rounded ${
                    selectedCard === waste[waste.length - 1].id ? 'bg-yellow-400' : ''
                  }`}
                  style={{ color: isRed(waste[waste.length - 1]) ? '#ff0000' : '#000000' }}
                >
                  {getCardDisplay(waste[waste.length - 1])}
                </button>
              ) : (
                <span className="text-xs text-white">Waste</span>
              )}
            </div>
          </div>

          {/* Foundations */}
          <div className="flex space-x-2">
            {foundations.map((foundation, index) => (
              <div 
                key={index}
                className="w-16 h-20 border-2 border-dashed flex items-center justify-center"
                style={{ borderColor: '#ffffff', borderRadius: '4px' }}
              >
                {foundation.length > 0 ? (
                  <span 
                    className="text-lg"
                    style={{ color: isRed(foundation[foundation.length - 1]) ? '#ff0000' : '#000000' }}
                  >
                    {getCardDisplay(foundation[foundation.length - 1])}
                  </span>
                ) : (
                  <span className="text-xs text-white text-center">
                    {['♥️', '♦️', '♣️', '♠️'][index]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tableau */}
        <div className="flex space-x-2 overflow-x-hidden">
          {tableau.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col space-y-1 min-w-16">
              {column.length === 0 ? (
                <div 
                  className="w-16 h-20 border-2 border-dashed flex items-center justify-center"
                  style={{ borderColor: '#ffffff', borderRadius: '4px' }}
                >
                  <span className="text-xs text-white text-center">King<br/>Only</span>
                </div>
              ) : (
                column.map((card, cardIndex) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card, 'tableau', columnIndex)}
                    className={`w-16 h-20 border flex items-center justify-center text-lg hover:shadow-lg transition-all ${
                      selectedCard === card.id ? 'bg-yellow-400 shadow-lg' : 'bg-white'
                    }`}
                    style={{ 
                      borderColor: '#cccccc',
                      borderRadius: '4px',
                      marginTop: cardIndex > 0 ? '-60px' : '0',
                      zIndex: cardIndex,
                      color: card.faceUp && isRed(card) ? '#ff0000' : '#000000'
                    }}
                    disabled={!card.faceUp}
                  >
                    {getCardDisplay(card)}
                  </button>
                ))
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div 
        className="border-t p-3 text-xs text-white"
        style={{ 
          background: 'rgba(0, 0, 0, 0.3)',
          borderColor: '#666666'
        }}
      >
        <p className="mb-1"><strong>How to play:</strong></p>
        <p>• Click cards to select them, click again to move to valid locations</p>
        <p>• Build foundations from Ace to King by suit</p>
        <p>• Build tableau columns in descending order, alternating colors</p>
        <p>• Click stock pile to draw new cards</p>
      </div>
    </div>
  );
}