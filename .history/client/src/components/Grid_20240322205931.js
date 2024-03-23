import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [gameState, setGameState] = useState({
    score: 0,
    isRunning: false,
    redColumnPosition: 0, // New state to track the position of the red columns
  });

  // Function to start the game and move the red columns
  const startGame = () => {
    setGameState({ ...gameState, isRunning: true });
    // Start moving the red columns
    const intervalId = setInterval(() => {
      setGameState((prevState) => {
        // Stop the columns before the first two green columns
        if (prevState.redColumnPosition >= 8) {
          clearInterval(intervalId);
          return prevState;
        }
        return { ...prevState, redColumnPosition: prevState.redColumnPosition + 1 };
      });
    }, 250); // Adjust the interval for speed control
  };

  // Function to stop the game
  const stopGame = () => {
    setGameState({ ...gameState, isRunning: false });
    clearInterval(gameState.intervalId); // Clear the interval to stop the columns
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
      let className = 'box';
      if (i % 10 < 2) color = 'green';
      else if (i % 10 >= 2 && i % 10 < 6) color = Math.random() < 0.5 ? 'blue' : 'empty';
      else if (i % 10 >= 6 && i % 10 < 8) {
        color = 'red';
        // Apply the moving class to the red columns based on their position
        className += gameState.redColumnPosition === i % 10 ? ' red-column' : '';
      }
      else if (i % 10 >= 8) color = Math.random() < 0.5 ? 'blue' : 'empty';

      grid.push(
        <div
          key={i}
          className={`${className} ${color}`}
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

export default App;
