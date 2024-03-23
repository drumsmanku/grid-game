import React, { useState, useEffect } from 'react';
import './Grid.css';

const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(250);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Initialize the grid with colors
    const initialGrid = Array(10).fill(null).map(() => Array(10).fill(null));
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 2; j++) initialGrid[i][j] = 'green';
      for (let j = 2; j < 8; j++) initialGrid[i][j] = Math.random() < 0.5 ? 'blue' : null;
      for (let j = 8; j < 10; j++) initialGrid[i][j] = Math.random() < 0.5 ? 'blue' : null;
    }
    setGrid(initialGrid);
  }, []);

  const startAnimation = () => {
    setScore(0);
    setIsAnimating(true);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
  };

  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map(row => [...row]);
          for (let i = 0; i < 10; i++) {
            for (let j = 9; j >= 2; j--) {
              newGrid[i][j] = newGrid[i][j - 2];
            }
          }
          return newGrid;
        });
      }, animationSpeed);
    }
    return () => clearInterval(interval);
  }, [isAnimating, animationSpeed]);

  const handleBoxClick = (color, row, col) => {
    if (color === 'blue') {
      setScore((prevScore) => prevScore + 10);
    } else if (color === 'red') {
      setScore((prevScore) => prevScore - 10);
    }
    // Blink the box
    const box = document.getElementById(`box-${row}-${col}`);
    if (box) {
      box.classList.add('blink');
      setTimeout(() => box.classList.remove('blink'), 750);
    }
  };

  const handleSpeedChange = (e) => {
    const speed = Number(e.target.value);
    setAnimationSpeed(300 - speed * 50);
  };

  return (
    <div className="App">
      <div className="grid">
        {grid.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              id={`box-${rowIndex}-${colIndex}`}
              className={`box ${color}`}
              onClick={() => handleBoxClick(color, rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      <div className="controls">
        <button onClick={startAnimation}>Start</button>
        <button onClick={stopAnimation}>Stop</button>
        <label>
          Speed:
          <input type="range" min="1" max="5" onChange={handleSpeedChange} />
        </label>
      </div>
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default Grid;