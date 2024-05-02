import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick }) => (
  <div className="board">
    {[0, 1, 2].map((row) => (
      <div key={row} className="board-row">
        {[0, 1, 2].map((col) => (
          <Square key={row * 3 + col} value={squares[row * 3 + col]} onClick={() => onClick(row * 3 + col)} />
        ))}
      </div>
    ))}
  </div>
);

export default Board;
