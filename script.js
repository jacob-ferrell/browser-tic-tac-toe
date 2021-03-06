
//create a player and assign player letter as x or o depending on player number
const Player = (playerNumber, name) => {
    const letter = playerNumber == 1 ? 'X' : 'O';
    return {name, letter};
}

const Game = () => {
    const player1 = Player(1, document.getElementById('player1-name').value);
    const player2 = Player(2, document.getElementById('player2-name').value);
    
    const GameBoard = (() => {
        //create 3x3 array filled with empty strings
        const gameBoard = [['', '', ''], ['', '', ''], ['', '', '']]
        //create div elements for every space, assign unique ID in row-column format, and append to board-container
        const boardToDOM = () => {
            let container = document.querySelector('.board-container');
            gameBoard.forEach((row, r) => row.forEach((space, c) => {
                let newSpace = document.createElement('div');
                newSpace.id = `r${r}c${c}`
                container.appendChild(newSpace);
            }))
        }
        const makeMove = (currentPlayer) => {
            document.querySelectorAll('.board-container div').forEach(space => space.addEventListener('click', (event) => {
                if (!gameOver(gameBoard) && !space.textContent) {
                let nextPlayer = getNextPlayer(currentPlayer);
                Prompt.promptPlayer(nextPlayer);
                let [r , c] = getCoordinate(event);
                letter = currentPlayer.letter;
                gameBoard[r][c] = letter;
                writeToBoard(space, letter);
                currentPlayer = nextPlayer;  
                gameOver(gameBoard);
                } 
    
            }))
    
        const getCoordinate = (event) => event.target.id.match(/\d/g);
        const writeToBoard = (space, letter) => {
            space.textContent = letter;
            colorClass = letter == 'X' ? 'player1' : 'player2'
            space.classList.add(colorClass);
        }
        }
    
        return {boardToDOM, makeMove};
    })();

    const startGame = (() => {
        
        GameBoard.boardToDOM();
        Prompt.promptPlayer(player1);
        GameBoard.makeMove(player1);
    })();
    
    const getNextPlayer = (currentPlayer) => {
        if (currentPlayer == player1) {
            return player2;
        } else {
            return player1;
        }
    }
    
    
    const gameOver = (gameBoard) => {
        if (!getEmptySpaces(gameBoard).length) {
            Prompt.declareTie();
            return true;
        } else if (getWinner(gameBoard)) {
            winner = getWinner(gameBoard);
            Prompt.declareWinner(winner);
            return true;
        }
    }

    const getEmptySpaces = (gameBoard) => {
        let emptySpaces = [];
        gameBoard.forEach(row => row.forEach(space => {
            if (!space) {
            emptySpaces.push(space);
            }
            
        }))
        return emptySpaces;
    }

    const getWinner = (gameBoard) => {
        combos = getCombos(gameBoard);
        const getWinningCombo = (letter) => combos.filter(e => e.every(l => l === letter));
        winningCombo = getWinningCombo('X').concat(getWinningCombo('O'));
        let winnerLetter = winningCombo.length ? winningCombo[0][0] : '';
        return winnerLetter  == 'X' ? player1 : winnerLetter == 'O' ? player2 : '';
    }

    const getCombos = (gameBoard) => {
        let combos = []
        gameBoard.forEach(row => combos.push(row));
        getDiagonals(gameBoard).forEach(e => combos.push(e));
        getColumns(gameBoard).forEach(e => combos.push(e));
        return combos;
    }

    const getDiagonals = (gameBoard) => {
        let diags = [[],[]];
        gameBoard.forEach((e, i) => {
            diags[0].push(e[i]);
            diags[1].push(e[2 - i]);
        });
        return diags;
    }

    const getColumns = (gameBoard) => {
        columns = [[], [], []];
        for (let i = 0; i < 3; i++) {
            gameBoard.forEach(row => columns[i].push(row[i]));
        }
        return columns;
    }

    return {startGame, gameOver, getNextPlayer};
};

const Prompt = (() => {
    const promptElement = document.getElementById('prompt');
    const promptPlayer = (currentPlayer) => changePrompt(`${currentPlayer.name}, make your move!`)
    const declareTie = () => changePrompt(`It's a tie!`);
    const declareWinner = (winner) => changePrompt(`${winner.name} wins!`);
    const changePrompt = (text) => promptElement.textContent = text;
    return {promptPlayer, declareTie, declareWinner};
})();

const getNames = (() => {
    const submitNames = document.getElementById('submit-names');
    submitNames.addEventListener('click', () => {
        let player1Name = document.getElementById('player1-name').value;
        let player2Name = document.getElementById('player2-name').value;
        if (player1Name && player2Name) {
            const newGame = Game();
            document.querySelector('.input-container').remove();
            document.getElementById('new-game').style.display = 'flex';
        }
        })
    
})();


