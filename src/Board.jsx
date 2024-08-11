import React from 'react';

function Board({ solution, n }) {
    const getCellClass = (row, col) => {
        const isQueen = solution[row][col] === 1;
        const isBlack = (row + col) % 2 === 1;
        return `flex items-center justify-center w-full h-full ${isBlack ? 'bg-gray-600' : 'bg-gray-200'} ${isQueen ? 'text-red-600 text-2xl' : ''}`;
    };

    return (
        <div
            className={`grid grid-cols-${n} gap-1 w-full max-w-4xl`}
            style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${n}, minmax(0, 1fr))` }}
        >
            {solution.flat().map((cell, idx) => (
                <div key={idx} className={getCellClass(Math.floor(idx / n), idx % n)}>
                    {cell === 1 ? '♕' : ''}
                </div>
            ))}
        </div>
    );
}

export default Board;
