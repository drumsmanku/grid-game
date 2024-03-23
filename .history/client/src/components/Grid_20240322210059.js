import React, { useState, useEffect } from 'react';
import './Grid.css'

const Grid = () => {
  const [gridData, setGridData] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(3); // Default speed: 3
  
  useEffect(() => {
    generateGridData();
  }, []);
  
  const generateGridData = () => {
    const newGridData = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        let color = '';
        if (j < 2) {
          color = 'green';
        } else if (j < 4) {
          color = Math.random() < 0.5 ? 'blue' : 'empty';
        } else if (j < 6) {
          color = 'red';
        } else if (j < 8) {
          color = Math.random() < 0.5 ? 'blue' : 'empty';
        } else {
          color = 'blue';
        }
        row.push({ color });
      }
      newGridData.push(row);
    }
    setGridData(newGridData);
  };

  const handleStart = () => {
    setScore(0); // Reset score when game starts
    setIsGameRunning(true);
    // Logic to start animation
  };

  const handleStop = () => {
    setIsGameRunning(false);
    // Logic to stop animation
  };

  const handleTileClick = (rowIndex, colIndex) => {
    const clickedTile = gridData[rowIndex][colIndex];
    if (clickedTile.color === 'blue') {
      setScore(score + 10);
      // Logic to blink tile
    } else if (clickedTile.color === 'red' && isGameRunning) {
      setScore(score - 10);
      // Logic to blink tile
    }
  };

  return (
    <div className="App">
      <div className="grid-container">
        {gridData.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((tile, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`grid-tile ${tile.color}`}
                onClick={() => handleTileClick(rowIndex, colIndex)}
              >
                {tile.color === 'red' && isGameRunning && <div className="animation" />}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={handleStart} disabled={isGameRunning}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <label htmlFor="speed">Speed:</label>
        <input
          type="range"
          id="speed"
          min="1"
          max="5"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
        />
        <span>{score}</span>
      </div>
    </div>
  );
};

export default Grid;
