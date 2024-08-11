export function solveNQueens(n) {
    const solutions = [];
    const board = Array.from({ length: n }, () => Array(n).fill(0));

    function isSafe(row, col) {
        for (let i = 0; i < col; i++) {
            if (board[row][i] === 1) return false;
        }
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 1) return false;
        }
        for (let i = row, j = col; i < n && j >= 0; i++, j--) {
            if (board[i][j] === 1) return false;
        }
        return true;
    }

    function solve(col) {
        if (col >= n) {
            solutions.push(board.map(row => [...row]));
            return true;
        }
        let res = false;
        for (let i = 0; i < n; i++) {
            if (isSafe(i, col)) {
                board[i][col] = 1;
                res = solve(col + 1) || res;
                board[i][col] = 0;
            }
        }
        return res;
    }

    solve(0);
    return solutions;
}
