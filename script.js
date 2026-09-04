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

    const addPiece = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addPiece,
        getValue,
    }
}

/*
** The GameController will be responsible for controlling the
** flow and state of the game's turns, as well as whether
** anybody has won the game
*/

function GameContoller(
    playerOneName = "X",
    playerTwoName = "O",
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            piece: "X",
        },
        {
            name: playerTwoName,
            piece: "O",
        },
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name} player's turn.`);
    };

    const playRound = (row, column) => {
        // Drop a piece for the current player at a tile
        console.log(
            `Dropping ${getActivePlayer().name}'s piece into row ${row} column ${column}...`
        );
        board.dropToken(row, column, getActivePlayer().piece);

        /* This is where we would check for a winner and handle that logic, 
        such as a win message. */


        // Switch player turn
        switchPlayerTurn();
        printNewRound();
    };

    // Initial play game message
    printNewRound();

    // For the console version, we will only use playRound, but we will
    // need getActivePlayer for the UI version
    return {
        playRound,
        getActivePlayer,
    };
}

const game = GameContoller()