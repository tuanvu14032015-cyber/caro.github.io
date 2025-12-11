const size = 5; // 🔥 đổi 9 thành 5
const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let cells = [];
let currentPlayer = "X";
let gameOver = false;

function createBoard() {
    board.innerHTML = "";
    cells = [];

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
        cells.push("");
    }

    statusText.textContent = "Lượt của X";
    gameOver = false;
}

function handleClick(e) {
    const index = e.target.dataset.index;

    if (cells[index] !== "" || gameOver) return;

    cells[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        statusText.textContent = `${currentPlayer} thắng!`;
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Lượt của ${currentPlayer}`;
}

function checkWin(player) {
    // kiểm tra hàng
    for (let r = 0; r < size; r++) {
        let ok = true;
        for (let c = 0; c < size; c++) {
            if (cells[r * size + c] !== player) ok = false;
        }
        if (ok) return true;
    }

    // kiểm tra cột
    for (let c = 0; c < size; c++) {
        let ok = true;
        for (let r = 0; r < size; r++) {
            if (cells[r * size + c] !== player) ok = false;
        }
        if (ok) return true;
    }

    // chéo chính
    let ok1 = true;
    for (let i = 0; i < size; i++) {
        if (cells[i * size + i] !== player) ok1 = false;
    }
    if (ok1) return true;

    // chéo phụ
    let ok2 = true;
    for (let i = 0; i < size; i++) {
        if (cells[i * size + (size - i - 1)] !== player) ok2 = false;
    }
    if (ok2) return true;

    return false;
}

resetBtn.addEventListener("click", createBoard);

createBoard();
