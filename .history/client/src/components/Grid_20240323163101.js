import React, { useState, useEffect } from 'react';
import './Grid.css';

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

// New function to generate a base grid without 'red' columns for the initial state
const initialBaseGrid = () => {
  let baseGrid = [];
  for (let row = 0; row < 10; row++) {
    let currentRow = [];
    for (let col = 0; col < 10; col++) {
      if (col < 2) currentRow.push('green');
      else if (col < 6 || col >= 8) currentRow.push(Math.random() < 0.5 ? 'blue' : '');
      else currentRow.push(''); // Do not place reds initially in the base grid
    }
    baseGrid.push(currentRow);
  }
  return baseGrid;
};

function Grid() {
  const [baseGrid, setBaseGrid] = useState(initialBaseGrid()); // The underlying grid color state
  const [redPositions, setRedPositions] = useState([6, 7]); // Initial red columns positions  
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(3); // Speed from 1 to 5

  useEffect(() => {
    setIsRunning(false); // Stop the game initially
    setBaseGrid(initialBaseGrid()); // Reset the base grid to its initial state without reds
    setScore(0); // Reset the score
  }, []);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setRedPositions(currPositions => {
          const newPositions = currPositions.map(p => (p + 1) % 10);
          return newPositions;
        });
      }, 250 / speed); // Animation speed based on user control
    }
    return () => clearInterval(intervalId);
  }, [isRunning, speed]);

  // Combine redPositions with the base grid for rendering
  const combinedGrid = baseGrid.map((row, rowIndex) => 
    row.map((cell, colIndex) => 
      redPositions.includes(colIndex) ? 'red' : cell
    )
  );

  const handleClick = (row, col) => {
    const color = combinedGrid[row][col];
    // Blink effect and score update logic remains the same
  };

  const handleSpeedChange = event => {
    const newSpeed = parseInt(event.target.value);
    if (newSpeed >= 1 && newSpeed <= 5) {
      setSpeed(newSpeed);
    }
  };

  return (
    <div className="Grid">
      <button onClick={() => { 
        setIsRunning(!isRunning); 
        setScore(0); 
        setBaseGrid(initialBaseGrid()); 
        setRedPositions([6, 7]); // Reset red positions
      }}>Start/Stop</button>
      <div>Speed: <input type="range" min="1" max="5" value={speed} onChange={handleSpeedChange} /></div>
      <div>Score: {score}</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {combinedGrid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((col, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`}
                   onClick={() => handleClick(rowIndex, colIndex)}
                   style={{
                     width: '30px',
                     height: '30px',
                     backgroundColor: col || 'white',
                     border: '1px solid black',
                     boxSizing: 'border-box',
                     opacity: col ? 1 : 0.5
                   }}>
              </div>
            ))}
          </div > 
          ))}
      </div>
    </div>
  );
}

export default Grid;
