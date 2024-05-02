import React, { useState } from 'react';
import Board from './Board';
import './App.css';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isOnePlayerMode, setIsOnePlayerMode] = useState(true);
  const handleClick = (index) => {
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
  
    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  
    if (isOnePlayerMode && !calculateWinner(newSquares)) {
      // If it's one-player mode and the game is not over
      const emptySquares = newSquares.reduce((acc, val, idx) => {
        if (val === null) acc.push(idx);
        return acc;
      }, []);
  
      // Choose a random empty square for the AI's move
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const aiMoveIndex = emptySquares[randomIndex];
      newSquares[aiMoveIndex] = 'O';
      setSquares(newSquares);
      setXIsNext(true); // Switch back to player's turn
    }
  };
  
  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : squares.every((square) => square !== null)
    ? 'Draw'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="game">
    <h1 className="game-title">TIC TAC TOE</h1>
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>
          <button onClick={() => setIsOnePlayerMode(true)}>One Player Mode</button>
          <button onClick={() => setIsOnePlayerMode(false)}>Two Player Mode</button>
        </div>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};

export default App;
