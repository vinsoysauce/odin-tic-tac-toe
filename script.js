/* 
The Gameboard represents the state of the board
Each square holds a Cell (defined below)
and we expose a dropPiece method to be able to add Cells to the 3x3 squares
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
        if (board[row][column].getValue() !== 0) {
            console.log('Invalid Move: Tile has already a piece!')
            return
        }

        // Otherwise, we have valid cells to place pieces
        board[row][column].addPiece(player);
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
    return { getBoard, dropPiece, printBoard };
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

function GameController(
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

    const winningCondition = () => {

        if ((
            board.getBoard()[0][0].getValue() === "O" &&
            board.getBoard()[0][1].getValue() === "O" &&
            board.getBoard()[0][2].getValue() === "O" 
        ) || 
        (
            board.getBoard()[1][0].getValue() === "O" &&
            board.getBoard()[1][1].getValue() === "O" &&
            board.getBoard()[1][2].getValue() === "O"
        ) || 
        (
            board.getBoard()[2][0].getValue() === "O" &&
            board.getBoard()[2][1].getValue() === "O" &&
            board.getBoard()[2][2].getValue() === "O"
        ) || 
        (
            board.getBoard()[0][0].getValue() === "O" &&
            board.getBoard()[1][0].getValue() === "O" &&
            board.getBoard()[2][0].getValue() === "O"
        ) || 
        (
            board.getBoard()[0][1].getValue() === "O" &&
            board.getBoard()[1][1].getValue() === "O" &&
            board.getBoard()[2][1].getValue() === "O"
        ) ||
        (
            board.getBoard()[0][2].getValue() === "O" &&
            board.getBoard()[1][2].getValue() === "O" &&
            board.getBoard()[2][2].getValue() === "O"
        ) ||
        (
            board.getBoard()[0][0].getValue() === "O" &&
            board.getBoard()[1][1].getValue() === "O" &&
            board.getBoard()[2][2].getValue() === "O"
        ) ||
        (
            board.getBoard()[0][2].getValue() === "O" &&
            board.getBoard()[1][1].getValue() === "O" &&
            board.getBoard()[2][0].getValue() === "O"
        )
        ){
            console.log('Player O wins!')
            return true
        } else if ((
            board.getBoard()[0][0].getValue() === "X" &&
            board.getBoard()[0][1].getValue() === "X" &&
            board.getBoard()[0][2].getValue() === "X"  
        ) || 
        (
            board.getBoard()[1][0].getValue() === "X" &&
            board.getBoard()[1][1].getValue() === "X" &&
            board.getBoard()[1][2].getValue() === "X" 
        ) || 
        (
            board.getBoard()[2][0].getValue() === "X" &&
            board.getBoard()[2][1].getValue() === "X" &&
            board.getBoard()[2][2].getValue() === "X" 
        ) || 
        (
            board.getBoard()[0][0].getValue() === "X" &&
            board.getBoard()[1][0].getValue() === "X" &&
            board.getBoard()[2][0].getValue() === "X" 
        ) || 
        (
            board.getBoard()[0][1].getValue() === "X" &&
            board.getBoard()[1][1].getValue() === "X" &&
            board.getBoard()[2][1].getValue() === "X" 
        ) || 
        (
            board.getBoard()[0][2].getValue() === "X" &&
            board.getBoard()[1][2].getValue() === "X" &&
            board.getBoard()[2][2].getValue() === "X" 
        ) ||
        (
            board.getBoard()[0][0].getValue() === "X" &&
            board.getBoard()[1][1].getValue() === "X" &&
            board.getBoard()[2][2].getValue() === "X"
        ) ||
        (
            board.getBoard()[0][2].getValue() === "X" &&
            board.getBoard()[1][1].getValue() === "X" &&
            board.getBoard()[2][0].getValue() === "X"
        )
        ) {
            console.log('Player X wins!')
            return true
        }
    }


    const playRound = (row, column) => {
        // Drop a piece for the current player at a tile
        console.log(
            `Dropping ${getActivePlayer().name}'s piece into row ${row} column ${column}...`
        );
        board.dropPiece(row, column, getActivePlayer().piece);

        /* This is where we would check for a winner and handle that logic, 
        such as a win message. */

        if (winningCondition()) return board.printBoard();


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
        getBoard: board.getBoard,
    };
}

function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector(".turn")
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        // clear the board
        boardDiv.textContent = "";

        // get the newest version of the board and player turn
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        // Display player's turn
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

        // Render board squares
        board.forEach((row) => {
            row.forEach((cell, index) => {
            // Anything clickable should be a button!!
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            // Create a data attribute to identify the column
            // This makes it easier to pass into our `playRound` function
            cellButton.dataset.column = index;
            cellButton.textContent = cell.getValue();
            boardDiv.appendChild(cellButton);
            });
        });
    };

  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedCell = e.target.dataset.column;
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedCell) return;

    game.playRound(selectedCell);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();

  // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
}


ScreenController();



