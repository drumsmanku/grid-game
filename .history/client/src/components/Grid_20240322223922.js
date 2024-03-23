import React, { useState, useEffect } from 'react';
import './Grid.css';

// Define the initial state of the grid
const initialGrid = () => {
  let grid = [];
  for (let row = 0; row < 10; row++) {
    let currentRow = [];
    for (let col = 0; col < 10; col++) {
      if (col < 2) currentRow.push('green');
      else if (col < 6) currentRow.push(Math.random() < 0.5 ? 'blue' : '');
      else if (col < 8) currentRow.push('red');
      else currentRow.push(Math.random() < 0.5 ? 'blue' : '');
    }
    grid.push(currentRow);
  }
  return grid;
};

function Grid() {
  const [grid, setGrid] = useState(initialGrid());
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Function to move the red columns
  const moveRedColumns = () => {
    setGrid((prevGrid) => {
      let newGrid = prevGrid.map(row => [...row]);
      // Track the positions of the red columns
      let redPositions = [];
      newGrid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          if (cell === 'red') {
            redPositions.push({ rowIndex, cellIndex });
          }
        });
      });

      // Move the red columns to the right
      redPositions.forEach(pos => {
        let { rowIndex, cellIndex } = pos;
        let nextCellIndex = (cellIndex + 1) % newGrid[0].length;
        newGrid[rowIndex][cellIndex] = ''; // Clear the current position
        // Only move the red column if the next position is not 'green'
        if (newGrid[rowIndex][nextCellIndex] !== 'green') {
          newGrid[rowIndex][nextCellIndex] = 'red';
        }
      });

      return newGrid;
    });
  };

  // Handle the click event on the grid cells
  const handleClick = (row, col) => {
    const color = grid[row][col];
    if (color === 'red') {
      setScore(score - 10);
    } else if (color === 'blue') {
      setScore(score + 10);
    }
  };

  // Start the game and move the red columns
  const startGame = () => {
    setIsRunning(true);
    moveRedColumns();
  };

  // Stop the game
  const stopGame = () => {
    setIsRunning(false);
  };

  // Use an effect to handle the interval for moving the red columns
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(moveRedColumns, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  return (
    <div className="Grid">
      <button onClick={startGame}>Start</button>
      <button onClick={stopGame}>Stop</button>
      <div>Score: {score}</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((col, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`}
                   onClick={() => handleClick(rowIndex, colIndex)}
                   style={{
                     width: '30px',
                     height: '30px',
                     backgroundColor: col || 'white',
                     border: '1px solid black',
                     boxSizing: 'border-box'
                   }}>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid;
