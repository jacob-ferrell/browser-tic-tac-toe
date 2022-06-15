const GameBoard = (() => {
    const gameBoard = Array(3).fill(Array(3).fill(''));

    const boardToDOM = () => {
        let container = document.querySelector('.board-container');
        gameBoard.forEach((row, r) => row.forEach((space, c) => {
            let newSpace = document.createElement('div');
            newSpace.id = `r${r}c${c}`
            container.appendChild(newSpace);
        }))
    }

    return {boardToDOM};
})();
GameBoard.boardToDOM();