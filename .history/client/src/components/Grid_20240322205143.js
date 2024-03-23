import React, { useState } from 'react';
import './Grid.css';

const Grid = () => {
  const [gameState, setGameState] = useState({
    score: 0,
    isRunning: false,
  });

  // Function to start the game
  const startGame = () => {
    setGameState({ ...gameState, isRunning: true });
    // Additional logic to start animation
  };

  // Function to stop the game
  const stopGame = () => {
    setGameState({ ...gameState, isRunning: false });
    // Additional logic to stop animation
  };

  // Function to handle box click
  const handleBoxClick = (color) => {
    if (color === 'blue') {
      setGameState({ ...gameState, score: gameState.score + 10 });
    } else if (color === 'red') {
      setGameState({ ...gameState, score: gameState.score - 10 });
    }
    // Additional logic for blinking animation
  };

  // Function to generate grid boxes
  const generateGrid = () => {
    let grid = [];
    for (let i = 0; i < 100; i++) {
      let color = 'empty';
      if (i % 10 < 2) color = 'green';
      else if (i % 10 >= 2 && i % 10 < 6) color = Math.random() < 0.5 ? 'blue' : 'empty';
      else if (i % 10 >= 6 && i % 10 < 8) color = 'red';
      else if (i % 10 >= 8) color = Math.random() < 0.5 ? 'blue' : 'empty';

      grid.push(
        <div
          key={i}
          className={`box ${color}`}
          onClick={() => handleBoxClick(color)}
        ></div>
      );
    }
    return grid;
  };

  return (
    <div className="container">
      <div className="score-bar">Score: {gameState.score}</div>
      <button onClick={startGame}>Start</button>
      <button onClick={stopGame}>Stop</button>
      <div className="grid">{generateGrid()}</div>
    </div>
  );
};

export default Grid;
