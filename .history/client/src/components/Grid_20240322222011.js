import React, { useState, useEffect } from 'react';
import './Grid.css';

const initialGrid = () => {
  let grid = [];
  for (let row = 0; row < 10; row++) {
    let currentRow = [];
    for (let col = 0; col < 10; col++) {
      if (col < 2) currentRow.push("green");
      else if (col < 6) currentRow.push(Math.random() < 0.5 ? "blue" : "");
      else if (col < 8) currentRow.push("red");
      else currentRow.push(Math.random() < 0.5 ? "blue" : "");
    }
    grid.push(currentRow);
  }
  return grid;
};

function Grid() {
  const [grid, setGrid] = useState(initialGrid);
  const [score, setScore] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isMovingRight, setIsMovingRight] = useState(true);

  const moveRedColumns = () => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => [...row]);
      if (isMovingRight) {
        for (let row = 0; row < 10; row++) {
          for (let col = 9; col >= 0; col--) {
            if (newGrid[row][col] === "red") {
              if (col < 9) {
                if (newGrid[row][col + 1] === "") {
                  newGrid[row][col + 1] = "red";
                  newGrid[row][col] = "";
                } else if (newGrid[row][col + 1] === "blue" || newGrid[row][col + 1] === "green") {
                  newGrid[row][col] = "red";
                }
              } else {
                newGrid[row][col] = "";
              }
            }
          }
        }
      } else {
        for (let row = 0; row < 10; row++) {
          for (let col = 0; col < 10; col++) {
            if (newGrid[row][col] === "red") {
              if (col > 0) {
                if (newGrid[row][col - 1] === "") {
                  newGrid[row][col - 1] = "red";
                  newGrid[row][col] = "";
                } else if (newGrid[row][col - 1] === "blue" || newGrid[row][col - 1] === "green") {
                  newGrid[row][col] = "red";
                }
              } else {
                newGrid[row][col] = "";
              }
            }
          }
        }
      }
      return newGrid;
    });
  };
  
  

  useEffect(() => {
    let interval;
    if (isMoving) {
      interval = setInterval(moveRedColumns, 500);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isMoving, isMovingRight]);

  const handleClick = (row, col) => {
    if (grid[row][col] === "red") {
      setScore(prevScore => Math.max(0, prevScore - 10));
    } else if (grid[row][col] === "blue") {
      setScore(prevScore => prevScore + 10);
    }
  };

  const handleStart = () => {
    setIsMoving(true);
  };

  const handleStop = () => {
    setIsMoving(false);
  };

  return (
    <div className="Grid">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div>
          <button onClick={handleStart}>Start</button>
          <button onClick={handleStop}>Stop</button>
        </div>
        <div>Score: {score}</div>
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
