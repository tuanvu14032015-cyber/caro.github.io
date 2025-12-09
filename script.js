// HIỆU ỨNG NỀN MATRIX MƯA SỐ 0 1
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Thiết lập kích thước canvas phù hợp màn hình
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Ký tự 0 1
const letters = ['0', '1'];
const fontSize = 18;
let columns = Math.floor(canvas.width / fontSize);

let drops = [];
function initDrops() {
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * canvas.height / fontSize;
    }
}
initDrops();
window.addEventListener('resize', initDrops);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';
    ctx.fillStyle = '#0F0';
    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i] += 1;
    }
}
setInterval(drawMatrix, 40);

// ---------------------- GAME CARO ----------------------

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
