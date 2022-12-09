const field = document.querySelector('.field'),
      columns = document.querySelectorAll('.column'),
      column = document.querySelector('.column'),
      moves = [];
let totalMoves = 0;

columns.forEach((i, index) => {
    i.style.cssText = `grid-area: 1 / ${index + 1} / 2 / ${index + 2}`;
});

for (let i = 0; i <= 6; i++) {
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
});

function chipRender (parent, columnNumber) {
    const element = document.createElement('div');
    
    element.classList.add('chip');

    if (totalMoves % 2 == 0) {
        element.classList.add('yellow-chip');
        moves[columnNumber].push('yellow');
    } else {
        element.classList.add('pink-chip');  
        moves[columnNumber].push('pink');  
    }

    element.style.transform = `translateY(-560px)`;
    parent.append(element);

    chipDrop(element);
    
    totalMoves++;
}

function chipDrop (element) {
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
            console.log(`${item} wins!`);
        }
    });

    row.forEach((item, index) => {
        if (item !== undefined && item === row[index + 1] && item === row[index + 2] && item === row[index + 3]) {
            console.log(`${item} wins!`);
        }
    });

    diagonal1.forEach((item, index) => {
        if (item !== undefined && item === diagonal1[index + 1] && item === diagonal1[index + 3] && item === diagonal1[index + 3]) {
            console.log(`${item} wins!`);
        }
    });

    diagonal2.forEach((item, index) => {
        if (item !== undefined && item === diagonal2[index + 1] && item === diagonal2[index + 3] && item === diagonal2[index + 3]) {
            console.log(`${item} wins!`);
        }
    });
}