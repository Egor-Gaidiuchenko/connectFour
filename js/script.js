const field = document.querySelector('.field'),
      columns = document.querySelectorAll('.column'),
      moves = [],
      restartButton = document.querySelector('.restart-button');
let totalMoves = 0,
    player1Wins = 0,
    player2Wins = 0,
    isAnimated = false,
    isReadyForGame = true;

for (let i = 0; i <= columns.length - 1; i++) {
    moves[i] = [];
}

field.addEventListener('click', (e) => {
    const target = e.target;
    let columnNumber = Number;

    columns.forEach((i, index) => {
        if (i === target) {
            columnNumber = index;
        }
    });

    if (target && target.classList.contains('column') && moves[columnNumber].length <= 6 && isAnimated === false && isReadyForGame === true) {
        chipRender (target, columnNumber);
    } 
});

restartButton.addEventListener('click', () => {
    restartGame();
});

function chipRender (parent, columnNumber) {
    const element = document.createElement('div');
    
    element.classList.add('chip');

    if (totalMoves % 2 == 0) {
        element.classList.add('yellow-chip');
        moves[columnNumber].push(1);
    } else {
        element.classList.add('pink-chip');  
        moves[columnNumber].push(2);  
    }

    element.style.transform = `translateY(-${parent.clientHeight}px)`;
    parent.append(element);

    chipDropAnimation(element, columnNumber);
    
    totalMoves++;
}

function chipDropAnimation (element, columnNumber) {
    let positionChip = element.parentElement.parentElement.clientHeight;
  
    let chipDropping = setInterval(() => {
        isAnimated = true;

        if (positionChip > 0 && positionChip >= 30) {
            positionChip -= 30;
            element.style.transform = `translateY(${-positionChip}px)`;
        } else if (positionChip > 0 && positionChip < 30) {
            element.style.transform = `translateY(${0}px)`;
            positionChip = 0;
        } else if (positionChip ===  0) {
            isAnimated = false;

            winCheck(columnNumber);
            if (totalMoves === Math.pow(columns.length, 2)) {
                showWinnerPanel (0);
            }

            clearInterval(chipDropping);
        }
    }, 20);
}

function winCheck (columnNumber) {
    const column = moves[columnNumber],
          position = moves[columnNumber].length - 1,
          row = moves.map((item) => item[position]),
          diagonal1 = [column[position]],
          diagonal2 = [column[position]];
    
    let j = 1;
    for (let i = columnNumber - 1; i >= 0; i--) {
        diagonal1.unshift(moves[i][position - j]);
        j++;
    }
    j = 1;
    for (let i = columnNumber + 1; i < moves.length; i++) {
        diagonal1.push(moves[i][position + j]);
        j++;
    }
    j = 1;
    for (let i = columnNumber - 1; i >= 0; i--) {
        diagonal2.unshift(moves[i][position + j]);
        j++;
    }
    j = 1;
    for (let i = columnNumber + 1; i < moves.length; i++) {
        diagonal2.push(moves[i][position - j]);
        j++;
    }

    column.forEach((item, index) => {
        if (item !== undefined && item === column[index + 1] && item === column[index + 2] && item === column[index + 3]) {
            scoreBoardsDisplay (item);
            showWinnerPanel(item);
        }
    });

    row.forEach((item, index) => {
        if (item !== undefined && item === row[index + 1] && item === row[index + 2] && item === row[index + 3]) {
            scoreBoardsDisplay (item);
            showWinnerPanel(item);
        }
    });

    diagonal1.forEach((item, index) => {
        if (item !== undefined && item === diagonal1[index + 1] && item === diagonal1[index + 2] && item === diagonal1[index + 3]) {
            scoreBoardsDisplay (item);
            showWinnerPanel(item);
        }
    });

    diagonal2.forEach((item, index) => {
        if (item !== undefined && item === diagonal2[index + 1] && item === diagonal2[index + 2] && item === diagonal2[index + 3]) {
            scoreBoardsDisplay (item);
            showWinnerPanel(item);
        }
    });
}

function restartGame () {
    for (let i = 0; i <= columns.length - 1; i++) {
        moves.forEach(item => {
            item.pop();
        });
    }

    for (let i = 1; i <= columns.length; i++) {
        columns.forEach(item => {
            if (item.childNodes[0] !== undefined) {
                item.childNodes[0].remove(); 
            }
        });
    }

    totalMoves = 0;
}

function scoreBoardsDisplay (winner) {
    const player1Scoreboard = document.querySelector('.player1 > h2'),
          player2Scoreboard = document.querySelector('.player2 > h2');

    if (winner === 1) {
        ++player1Wins;
    } else if (winner === 2) {
        ++player2Wins;
    }

    player1Scoreboard.textContent = `${player1Wins}`;
    player2Scoreboard.textContent = `${player2Wins}`;
}

function showWinnerPanel (winner) {
    const winnerPanel = document.querySelector('.winner-panel'),
          winnerName = winnerPanel.querySelector('h1'),
          nextGame = winnerPanel.querySelector('button');

    isReadyForGame = false;

    winnerPanel.style.display = 'grid';
    document.body.style.overflow = 'hidden';

    if (winner === 1) {
        if (window.innerWidth > 768) {
            winnerPanel.style.gridArea = '1 / 1 / 2 / 2';
            winnerPanel.style.justifySelf = 'end';
        }
        nextGame.style.backgroundColor = 'rgb(253, 253, 124)';
    } else if (winner === 2) {
        if (window.innerWidth > 768) {
            winnerPanel.style.gridArea = '1 / 3 / 2 / 4';
            winnerPanel.style.justifySelf = 'start';
        } 
        nextGame.style.backgroundColor = 'rgb(255, 154, 171)';
    } else if (winner === 0) {
        if (window.innerWidth > 768) {  
            winnerPanel.style.gridArea = '1 / 2 / 2 / 3';
            winnerPanel.style.justifySelf = 'center';
        }
        nextGame.style.backgroundColor = '#9d6fff';
    }
    
    if (winner === 1 || winner === 2) {
        winnerName.textContent = `Player ${winner} won!`;
    } else if (winner === 0) {
        winnerName.textContent = `Draw!`;
    }
    
    nextGame.addEventListener('click', () => {
        restartGame();
        winnerPanel.style.display = 'none';
        isReadyForGame = true;
    });
}