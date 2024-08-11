import React, { useState } from 'react';
import { solveNQueens } from './nQueen';
import Board from './Board';

function App() {
  const [n, setN] = useState(8);
  const [solutions, setSolutions] = useState([]);
  const [currentSolution, setCurrentSolution] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [isSolving, setIsSolving] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSolve = () => {
    if (n > 15) {
      alert("Grid size cannot be greater than 15.");
      return;
    }
    const sols = solveNQueens(n);
    setSolutions(sols);
    setCurrentSolution(0);
    setIsSolving(true);
  };

  const nextSolution = () => {
    setCurrentSolution((currentSolution + 1) % solutions.length);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  React.useEffect(() => {
    if (isSolving && solutions.length > 0) {
      const interval = setInterval(nextSolution, speed);
      return () => clearInterval(interval);
    }
  }, [isSolving, solutions, currentSolution, speed]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-800'}`}>
      <h1 className="text-4xl font-bold mb-6">N-Queens Problem Solver</h1>
      <div className="flex flex-col items-center mb-4 w-full max-w-md">
        <label className="mb-2 text-lg">
          Grid Size:
          <input
            type="number"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
            min="1"
            max="15"
            disabled={isSolving}
            className="ml-2 p-2 border rounded w-20 text-center"
          />
        </label>
        <button
          onClick={handleSolve}
          disabled={isSolving}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-2 w-full max-w-xs hover:bg-blue-600 transition"
        >
          Solve
        </button>
        <button
          onClick={nextSolution}
          disabled={isSolving || solutions.length === 0}
          className="bg-green-500 text-white py-2 px-4 rounded mb-2 w-full max-w-xs hover:bg-green-600 transition"
        >
          Next Solution
        </button>
        <label htmlFor="speed" className="text-lg mb-2">Speed: {speed} ms</label>
        <input
          type="range"
          id="speed"
          min="100"
          max="3000"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          disabled={isSolving}
          className="w-full max-w-md mb-4"
        />
        <button
          onClick={toggleDarkMode}
          className="bg-gray-700 text-white py-2 px-4 rounded w-full max-w-xs hover:bg-gray-800 transition"
        >
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
      <Board solution={solutions[currentSolution] || Array.from({ length: n }, () => Array(n).fill(0))} n={n} />
    </div>
  );
}

export default App;
