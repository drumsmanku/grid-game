import React, { useState, useEffect } from 'react';
import './Grid.css';

const buttonStyles={
  backgroundColor:'#36416A',
  border:'none',
  borderRadius:'2rem',
  padding:'0.8rem',
  color:'white'
}

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
  const [redPositions, setRedPositions] = useState([6, 7]); 
  const [moveDirection, setMoveDirection] = useState(1); 
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
          
          if (newPosition.some(p => p >= 10) || newPosition.some(p => p <= 1)) {
            setMoveDirection(-moveDirection);
            
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
    
    if (color === 'blue') {
      setScore((prevScore) => prevScore + 10);
    } else if (color === 'red') {
      setScore((prevScore) => prevScore - 10);
    }
   
  };

 
  const combinedGrid = baseGrid.map((row, rowIndex) => 
    row.map((cell, colIndex) => 
      redPositions.includes(colIndex) ? 'red' : cell
    )
  );

  const handleSpeedChange = (event) => {
    const newSpeed = parseInt(event.target.value);
    setSpeed(newSpeed >= 1 && newSpeed <= 5 ? newSpeed : speed);
  };

  return (
    <div className="Grid">
      <button style={buttonStyles} onClick={() => { 
        setIsRunning(!isRunning); 
        setScore(0); 
        setBaseGrid(initialBaseGrid()); 
        setRedPositions([6, 7]); 
        setMoveDirection(1);
      }}>Start/Stop</button>
      <div>Speed: <input type="range" min="1" max="5" value={speed} onChange={handleSpeedChange} /></div>
      <div>Score: {score}</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {combinedGrid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', backgroundColor:'black' }}>
            {row.map((col, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`}
                 className={`cell ${col}`}
                   onClick={() => handleClick(rowIndex, colIndex)}
                   style={{
                     width: '50px',
                     height: '50px',
                     backgroundColor: col || 'black',
                     borderRadius: '0.9rem',
                    
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
