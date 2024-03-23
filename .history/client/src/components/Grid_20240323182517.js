import React, { useState, useEffect } from 'react';
import './Grid.css';

// Initial base grid creation function simplified for this example
const initialBaseGrid = () => {
  let baseGrid = [];
  for (let row = 0; row < 10; row++) {
    let currentRow = [];
    for (let col = 0; col < 10; col++) {
      if (col < 2) {
        currentRow.push('green');
      } else if (col < 6 || col >= 8) {
        currentRow.push(Math.random() < 0.5 ? 'blue' : '');
      } else {
        currentRow.push('');
      }
    }
    baseGrid.push(currentRow);
  }
  return baseGrid;
};


function Grid() {
  const [baseGrid, setBaseGrid] = useState(initialBaseGrid());
  const [redPositions, setRedPositions] = useState([6, 7]); // Initial red columns positions
  const [moveDirection, setMoveDirection] = useState(1); // 1 for right, -1 for left
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(3);

  useEffect(() => {
    setIsRunning(false); 
    setBaseGrid(initialBaseGrid()); 
    setScore(0);
  }, []);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setRedPositions(currPositions => {
          let newPosition = currPositions.map(p => p + moveDirection);
          // Check for boundaries and change direction if needed
          if (newPosition.some(p => p >= 10) || newPosition.some(p => p <= 1)) {
            setMoveDirection(-moveDirection); // Reverse the direction
            // Adjust newPosition to ensure it stays within bounds after direction change
            newPosition = currPositions.map(p => p + (-moveDirection));
          }
          return newPosition;
        });
      }, 250 / speed);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, speed, moveDirection]);

  const handleClick = (row, col) => {
    const color = redPositions.includes(col) ? 'red' : baseGrid[row][col];
    // Update score based on color
    if (color === 'blue') {
      setScore((prevScore) => prevScore + 10);
    } else if (color === 'red') {
      setScore((prevScore) => prevScore - 10);
    }
    // Blink and other effects can be handled here as needed
  };

  // Combine redPositions with base grid before rendering
  const combinedGrid = baseGrid.map((row, rowIndex) => 
    row.map((cell, colIndex) => 
      redPositions.includes(colIndex) ? 'red' : cell
    )
  );

  // Speed change handler remains unchanged
  const handleSpeedChange = (event) => {
    const newSpeed = parseInt(event.target.value);
    setSpeed(newSpeed >= 1 && newSpeed <= 5 ? newSpeed : speed);
  };

  // Render method remains largely unchanged, using combinedGrid for display
  return (
    <div className="Grid">
      <button onClick={() => { 
        setIsRunning(!isRunning); 
        setScore(0); 
        setBaseGrid(initialBaseGrid()); 
        setRedPositions([6, 7]); // Reset initial positions
        setMoveDirection(1); // Reset to move right
      }}>Start/Stop</button>
      <div>Speed: <input type="range" min="1" max="5" value={speed} onChange={handleSpeedChange} /></div>
      <div>Score: {score}</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {combinedGrid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((col, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`}
                 className={`cell ${col}`}
                   onClick={() => handleClick(rowIndex, colIndex)}
                   style={{
                     width: '30px',
                     height: '30px',
                     backgroundColor: col || 'white',
                     borderRadius: '0.5rem',
                     margin:'0.5rem 0.5rem 0.5rem 0.5rem'
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
