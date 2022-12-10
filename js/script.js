const field = document.querySelector('.field'),
      columns = document.querySelectorAll('.column'),
      moves = [],
      player1Scoreboard = document.querySelector('.player1 > h2'),
      player2Scoreboard = document.querySelector('.player2 > h2');
let totalMoves = 0,
    player1Wins = 0,
    player2Wins = 0;

columns.forEach((i, index) => {
    i.style.cssText = `grid-area: 1 / ${index + 1} / 2 / ${index + 2}`;
});

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

    if (target && target.classList.contains('column') && moves[columnNumber].length <= 6) {
        chipRender (target, columnNumber);
    } 

    winCheck (columnNumber);

    if (totalMoves === Math.pow(columns.length, 2)) {
        restartGame();
    }
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

    element.style.transform = `translateY(-560px)`;
    parent.append(element);

    chipDropAnimation(element);
    
    totalMoves++;
}

function chipDropAnimation (element) {
    let positionChip = element.parentElement.parentElement.clientHeight;

    let chipDropping = setInterval(() => {
        if (positionChip > 0 && positionChip >= 30) {
            positionChip -= 30;
            element.style.transform = `translateY(${-positionChip}px)`;
        } else if (positionChip > 0 && positionChip < 30) {
            element.style.transform = `translateY(${0}px)`;
            positionChip = 0;
        } else if (positionChip ===  0) {
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
            restartGame ();
        }
    });

    row.forEach((item, index) => {
        if (item !== undefined && item === row[index + 1] && item === row[index + 2] && item === row[index + 3]) {
            scoreBoardsDisplay (item);
            restartGame ();
        }
    });

    diagonal1.forEach((item, index) => {
        if (item !== undefined && item === diagonal1[index + 1] && item === diagonal1[index + 3] && item === diagonal1[index + 3]) {
            scoreBoardsDisplay (item);
            restartGame ();
        }
    });

    diagonal2.forEach((item, index) => {
        if (item !== undefined && item === diagonal2[index + 1] && item === diagonal2[index + 3] && item === diagonal2[index + 3]) {
            scoreBoardsDisplay (item);
            restartGame ();
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
    if (winner === 1) {
        ++player1Wins;
    } else if (winner === 2) {
        ++player2Wins;
    }

    player1Scoreboard.textContent = `${player1Wins}`;
    player2Scoreboard.textContent = `${player2Wins}`;
}
