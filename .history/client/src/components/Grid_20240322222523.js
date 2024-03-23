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

function Grid() {
  const [grid, setGrid] = useState(initialGrid());
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setGrid((prevGrid) => {
          // Create a deep copy of the grid
          let newGrid = JSON.parse(JSON.stringify(prevGrid));
          // Move only the red columns
          for (let row = 0; row < newGrid.length; row++) {
            let redIndices = [];
            // Find the indices of the red boxes
            newGrid[row].forEach((col, index) => {
              if (col === 'red') redIndices.push(index);
            });
            // Move the red boxes to the right
            redIndices.forEach((index) => {
              let newIndex = (index + 1) % newGrid[row].length;
              newGrid[row][newIndex] = 'red';
              newGrid[row][index] = ''; // Clear the old position
            });
          }
          return newGrid;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleClick = (row, col) => {
    setGrid((prevGrid) => {
      const color = prevGrid[row][col];
      if (color === 'red') {
        setScore((prevScore) => prevScore - 10);
      } else if (color === 'blue') {
        setScore((prevScore) => prevScore + 10);
      }
      return prevGrid;
    });
  };

  return (
    <div className="Grid">
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Stop</button>
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
