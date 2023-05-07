// Получаем элементы игровой доски и сообщения о результате
const board = document.querySelector(".board");
const resultMessage = document.getElementById("result-message");

// Игровая доска представлена матрицей 3x3
const boardMatrix = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Крестики ходят первыми
let currentPlayer = "X";

// Обработчик клика на ячейку игровой доски
board.addEventListener("click", function(event) {
    // Получаем координаты ячейки
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    // Если ячейка уже заполнена, выходим из функции
    if (boardMatrix[row][col] !== null) {
    return;
    }

    // Заполняем ячейку значением текущего игрока
    boardMatrix[row][col] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("played");

    // Проверяем, есть ли победитель
    const winner = checkWinner();
    if (winner !== null) {
    // Если есть, выводим сообщение и блокируем дальнейшие клики на ячейки
    resultMessage.textContent = `${winner} выиграл!`;
    board.classList.add("game-over");
    return;
    }

    // Проверяем, есть ли ничья
    if (checkTie()) {
    // Если есть, выводим сообщение и блокируем дальнейшие клики на ячейки
    resultMessage.textContent = "Ничья!";
    board.classList.add("game-over");
    return;
    }

    // Сменяем текущего игрока
    currentPlayer = currentPlayer === "X" ? "O" : "X";
});

// Функция для проверки, есть ли победитель
function checkWinner() {
    // Проверяем диагонали
    if (
    (boardMatrix[0][0] !== null && boardMatrix[0][0] === boardMatrix[1][1] && boardMatrix[1][1] === boardMatrix[2][2]) ||
    (boardMatrix[0][2] !== null && boardMatrix[0][2] === boardMatrix[1][1] && boardMatrix[1][1] === boardMatrix[2][0])
    ) {
    return boardMatrix[1][1];
    }

    // Проверяем строки и столбцы
    for (let i = 0; i < 3; i++) {
    if (
    (boardMatrix[i][0] !== null && boardMatrix[i][0] === boardMatrix[i][1] && boardMatrix[i][1] === boardMatrix[i][2]) ||
    (boardMatrix[0][i] !== null && boardMatrix[0][i] === boardMatrix[1][i] && boardMatrix[1][i] === boardMatrix[2][i])
    ) {
    return boardMatrix[i][i];
    }
    }

    return null;
}

// Функция для проверки, есть ли ничья
function checkTie() {
    for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
    if (boardMatrix[row][col] === null) {
    return false;
    }
    }
    }
    return true;
}
