let currentSize = 4;
const board = document.getElementById('chessboard');
const boardFrame = document.getElementById('boardFrame');
const squareInfo = document.getElementById('squareInfo');

function renderBoard(size) {
    board.innerHTML = '';
    board.className = `chessboard grid-${size}`;
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (let r = size; r >= 1; r--) {
        for (let c = 0; c < size; c++) {
            const square = document.createElement('div');
            const isLight = (r + c) % 2 === 0;
            const coord = `${files[c]}${r}`;

            square.className = `square ${isLight ? 'light' : 'dark'}`;
            square.dataset.coord = coord;
            square.dataset.color = isLight ? 'Light Square' : 'Dark Square';
            square.textContent = coord;

            square.addEventListener('click', () => {
                document.querySelectorAll('.square').forEach(s => s.classList.remove('selected'));
                square.classList.add('selected');
                squareInfo.textContent = `${coord.toUpperCase()} (${square.dataset.color})`;
            });

            board.appendChild(square);
        }
    }
}

function setBoardSize(size) {
    currentSize = size;
    document.getElementById('btn4x4').classList.toggle('active', size === 4);
    document.getElementById('btn8x8').classList.toggle('active', size === 8);
    squareInfo.textContent = 'None (Click any square)';
    renderBoard(size);
}

function setBoardTheme(themeName) {
    boardFrame.className = `board-frame ${themeName}`;
    event.target.parentElement.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

// Initial Render
renderBoard(4);
