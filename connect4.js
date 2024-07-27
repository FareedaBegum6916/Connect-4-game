var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColumns;

var rows = 6;
var columns = 7;

var player1Score = 0;
var player2Score = 0;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPlace);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }

    updatePlayerIndicator(); // Update player indicator initially
}

function setPlace() {
    if (gameOver==true) {
        alert("please restart the game either u can reload the page or Restart ");
        location.reload();
        return;
    }
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-peice");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-peice");
        currPlayer = playerRed;
    }
    r -= 1;
    currColumns[c] = r;

    checkWinner();
    updatePlayerIndicator(); // Update player indicator after a move
}

function checkWinner() {
    // Your existing checkWinner function...
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Hooray! Red wins";
        winner.style.color="red";
        player1Score++;
        document.getElementById('player1-score').textContent = player1Score;
    } else {
        winner.innerText = "Hooray! Yellow Wins";
        winner.style.color="yellow";
        player2Score++;
        document.getElementById('player2-score').textContent = player2Score;
    }
    gameOver = true;
    disableClicks();
}

function disableClicks() {
    let tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.removeEventListener('click', setPlace);
    });
}

function restartGame() {
    location.reload(); // Reloads the page
}

document.getElementById('restart-button').addEventListener('click', restartGame);

function updatePlayerIndicator() {
    let playerIndicator = document.getElementById('player-indicator');
    if (currPlayer == playerRed) {
        playerIndicator.textContent = "Player 1's turn ( Red )";
        playerIndicator.style.color = "red";
    } else {
        playerIndicator.textContent = "Player 2's turn ( Yellow )";
        playerIndicator.style.color = "yellow";
    }
}
