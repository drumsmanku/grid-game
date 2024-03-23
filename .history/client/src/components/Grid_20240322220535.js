import React, { useState } from 'react';
import './App.css';

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

function App() {
  const [grid, setGrid] = useState(initialGrid);
  const [score, setScore] = useState(0);

  const handleClick = (row, col) => {
    // Implement the scoring logic here
  };

  return (
    <div className="App">
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

export default App;
