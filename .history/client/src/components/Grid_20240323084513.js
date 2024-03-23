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
  const [speed, setSpeed] = useState(3); // Speed from 1 to 5

  useEffect(() => {
    setIsRunning(false); // Stop the game initially
    setGrid(initialGrid()); // Reset the grid to its initial state
    setScore(0); // Reset the score
  }, []);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setGrid((prevGrid) => {
          // Extract only the red columns
          let redColumnsPositions = [];
          for (let i = 0; i < prevGrid[0].length; i++) {
            if (prevGrid[0][i] === 'red' || prevGrid[1][i] === 'red') {
              redColumnsPositions.push(i);
            }
          }
          if (redColumnsPositions.length > 2) {
            redColumnsPositions = redColumnsPositions.slice(0, 2);
          }

          let newGrid = prevGrid.map(row => row.map((cell, i) =>
            redColumnsPositions.includes(i) ? '' : cell // Clear old red positions
          ));

          // Move red columns over the top of the other colors
          for (let rowIndex = 0; rowIndex < newGrid.length; rowIndex++) {
            redColumnsPositions.forEach(colIndex => {
              let newColIndex = (colIndex + 1) % newGrid[0].length;
              if (newGrid[rowIndex][newColIndex] === '') { // Check if the next position is not occupied by red
                newGrid[rowIndex][newColIndex] = 'red';
              } else {
                newGrid[rowIndex][colIndex] = 'red'; // Keep the red in the same position if next is occupied
              }
            });
          }
          return newGrid;
        });
      }, 250 / speed); // Animation speed based on user control
    }
    return () => clearInterval(intervalId);
  }, [isRunning, speed]);

  const handleClick = (row, col) => {
    const color = grid[row][col];
    // Blink effect
    let blinkCount = 0;
    const blinkInterval = setInterval(() => {
      setGrid(currentGrid => currentGrid.map((r, rowIndex) => r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return blinkCount % 2 === 0 ? '' : color;
        }
        return cell;
      })));
      blinkCount++;
      if (blinkCount > 5) {
        clearInterval(blinkInterval);
        setGrid(currentGrid => currentGrid.map((r, rowIndex) => r.map((cell, colIndex) => {
          if (rowIndex === row && colIndex === col) {
            return color;
          }
          return cell;
        })));
      }
    }, 250);

    // Update score
    if (color === 'red') {
      setScore(score - 10);
    } else if (color === 'blue') {
      setScore(score + 10);
    }
  };

  const handleSpeedChange = event => {
    const newSpeed = parseInt(event.target.value);
    if (newSpeed >= 1 && newSpeed <= 5) {
      setSpeed(newSpeed);
    }
  };

  return (
    <div className="Grid">
            <button onClick={() => { setIsRunning(!isRunning); setScore(0); setGrid(initialGrid()) }}>Start/Stop</button>
      <div>Speed: <input type="range" min="1" max="5" value={speed} onChange={handleSpeedChange} /></div>
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
                     boxSizing: 'border-box',
                     opacity: col ? 1 : 0.5 // Improve distinguishability
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

