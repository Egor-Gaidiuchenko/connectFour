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
});

function chipRender (parent, columnNumber) {
    const element = document.createElement('div');
    
    element.classList.add('chip');

    if (totalMoves % 2 == 0) {
        element.classList.add('yellow-chip');
        moves[columnNumber].push(1);
    } else {
        element.classList.add('pink-chip');  
        moves[columnNumber].push(0);  
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
        } else if (positionChip === 0) {
            clearInterval(chipDropping);
        }
    }, 20);
}

