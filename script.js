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
        if (board[row][column].getValue() !== '') {
            console.log('Invalid Move: Tile has already a piece!')
            return false;
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
    let value = '';

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


    const tieCondition = () => {
       if ((
        board.getBoard()[0][0].getValue() === "O" || board.getBoard()[0][0].getValue() === "X"
       )  && (
        board.getBoard()[0][1].getValue() === "O" || board.getBoard()[0][1].getValue() === "X"
       ) && (
        board.getBoard()[0][2].getValue() === "O" || board.getBoard()[0][2].getValue() === "X"
       ) && (
        board.getBoard()[1][0].getValue() === "O" || board.getBoard()[1][0].getValue() === "X"
       )  && (
        board.getBoard()[1][1].getValue() === "O" || board.getBoard()[1][1].getValue() === "X"
       ) && (
        board.getBoard()[1][2].getValue() === "O" || board.getBoard()[1][2].getValue() === "X"
       ) && (
        board.getBoard()[2][0].getValue() === "O" || board.getBoard()[2][0].getValue() === "X"
       )  && (
        board.getBoard()[2][1].getValue() === "O" || board.getBoard()[2][1].getValue() === "X"
       ) && (
        board.getBoard()[2][2].getValue() === "O" || board.getBoard()[2][2].getValue() === "X"
       )) {
        console.log("It's a tie!")
        return true;
       }
       
    }

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
        if ((board.dropPiece(row, column, getActivePlayer().piece)) === false) return;
        console.log(
            `Dropping ${getActivePlayer().name}'s piece into row ${row} column ${column}...`
        );

        /* This is where we would check for a winner and handle that logic, 
        such as a win message. */

        if (tieCondition()) return
        if (winningCondition()) return;


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
        winningCondition,
        tieCondition
    };
}

function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector(".turn")
    const boardDiv = document.querySelector(".board");
    const resetBtn = document.querySelector(".reset");

    const updateScreen = () => {
        // clear the board
        boardDiv.textContent = "";
        // get the newest version of the board and player turn
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        // Display player's turn
        playerTurnDiv.textContent = `Player ${activePlayer.name}'s turn...`;

        board.forEach((row, rowIndex) => {
        // Anything clickable should be a button!!
        const cellRow = document.createElement("div");
        cellRow.classList.add("row");
        cellRow.dataset.row = rowIndex;
        boardDiv.appendChild(cellRow)
        row.forEach((column, columnIndex) => {
        const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.column = columnIndex;
            cellButton.dataset.row = rowIndex
            cellButton.textContent = column.getValue();
            cellRow.appendChild(cellButton)
        })
            boardDiv.appendChild(cellRow);
        });

        if (game.tieCondition()) {
            playerTurnDiv.textContent = `It's a tie!`
        }

        if (game.winningCondition()) {
            playerTurnDiv.textContent = `Player ${activePlayer.name} wins!`
        }
    };

  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedRow && !selectedColumn) return;
    if (game.winningCondition()) return;
    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }

  // Reset button
  function reset(e) {
    location.reload();
  }

  boardDiv.addEventListener("click", clickHandlerBoard);
  resetBtn.addEventListener("click", reset)

  // Initial render
  updateScreen();

  // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
}

ScreenController();