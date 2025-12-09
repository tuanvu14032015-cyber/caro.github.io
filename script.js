const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let cells, currentPlayer, boardState, gameActive;

function createBoard() {
    board.innerHTML = '';
    cells = [];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
        cells.push(cell);
    }
}

function resetGame() {
    currentPlayer = "X";
    boardState = Array(9).fill("");
    gameActive = true;
    cells.forEach(cell => cell.textContent = "");
    statusDiv.textContent = "Lượt của người chơi: " + currentPlayer;
}

function handleCellClick(index) {
    if (!gameActive || boardState[index] !== "") return;

    boardState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWin()) {
        statusDiv.textContent = "Người chơi " + currentPlayer + " thắng!";
        gameActive = false;
    } else if (boardState.every(cell => cell !== "")) {
        statusDiv.textContent = "Hòa!";
        gameActive = false;
    } else {
        currentPlayer = (currentPlayer === "X") ? "O" : "X";
        statusDiv.textContent = "Lượt của người chơi: " + currentPlayer;
    }
}

function checkWin() {
    const winCombinations = [
        [0,1,2],[3,4,5],[6,7,8], // Hàng
        [0,3,6],[1,4,7],[2,5,8], // Cột
        [0,4,8],[2,4,6]            // Chéo
    ];
    return winCombinations.some(comb => 
        comb.every(idx => boardState[idx] === currentPlayer)
    );
}

// Khởi tạo
createBoard();
resetGame();

resetBtn.addEventListener('click', resetGame);
