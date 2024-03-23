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

const initialBaseGrid = () => {
  let baseGrid = [];
  for (let row = 0; row < 10; row++) {
    let currentRow = [];
    for (let col = 0; col < 10; col++) {
      if (col < 2) currentRow.push('green');
      else if (col < 6 || col >= 8) currentRow.push(Math.random() < 0.5 ? 'blue' : '');
      else currentRow.push('');
    }
    baseGrid.push(currentRow);
  }
  return baseGrid;
};

function Grid() {
  const [baseGrid, setBaseGrid] = useState(initialBaseGrid());
  const [redPositions, setRedPositions] = useState([6, 7]);
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
          let newPositions = currPositions.map(p => (p + 1) % 10);
          if (newPositions[0] === 9 && newPositions[1] === 0) {
            // Reverse direction when reaching the end of the grid
            newPositions = [8, 7];
          }
          return newPositions;
        });
      }, 250 / speed);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, speed]);

  const combinedGrid = baseGrid.map((row, rowIndex) => 
    row.map((cell, colIndex) => 
      redPositions.includes(colIndex) ? 'red' : cell
    )
  );

  const handleClick = (row, col) => {
    const color = combinedGrid[row][col];
    if (color === 'blue') {
      setScore(prevScore => prevScore + 10);
    } else if (color === 'red') {
      setScore(prevScore => prevScore - 10);
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
      <button onClick={() => { 
        setIsRunning(!isRunning); 
        setScore(0); 
        setBaseGrid(initialBaseGrid()); 
        setRedPositions([6, 7]); 
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
