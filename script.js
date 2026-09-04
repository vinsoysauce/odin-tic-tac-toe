/* 
The Gameboard represents the state of the board
Each square holds a Cell (defined below)
and we expose a dropToken method to be able to add Cells to the 3x3 squares
*/

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create a 3x3 2d array that will represent the state of the game board
    // For this 3x3 2d array, row 0 will represent the top row and
    // column 0 will represent the left-most column.
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell())
        }
    }

    // This will be the function of getting the entire board that our
    // UI will eventually need to render it.
    const getBoard = () => board;

    // // In order to place a piece, we need to find out which row and column
    // // is empty, *then* change that cell's value to the player's piece.
    const dropPiece = (row, column, player) => {
        // Our board's outermost array represents the row,
        // so we need to loop through the rows, starting at row 0,
        // all cells with no piece will be returned as available cells
        const availableCells = board.
        filter((row) => row[column].getValue() > -1)
        .map((row => row[column]))

        // If no cells make it through the filter,
        // move is invalid or all cells are filled or tied game
        if (!availableCells.length) return;

        // Otherwise, we have valid cells to place pieces
        availableCells
    }
    
    /*
    ** A Cell represents one "square" on the board and can have of
    ** 0: no pieces is in the square,
    ** X: X's piece,
    ** O: O's piece 
    */

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => 
        row.map((cell) => cell.getValue())
        );
        console.log(boardWithCellValues);
    }
    return { getBoard, printBoard };
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addToken,
        getValue,
    }
}

