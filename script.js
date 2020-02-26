const btn = document.querySelector('#start-btn')
const menu = document.querySelector('#menu-container')
const game = document.querySelector('#game-container')
const grid = document.querySelector('#game-board')
const stats = document.querySelector('#stats')
const header = document.querySelector('#header')
const cellElements = document.querySelectorAll('.cell')

let currentPlayer = 'X'
let activeGame = false

const winCriteria = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

header.addEventListener('click', function() {
	if (activeGame) {

	const scoreElements = document.querySelectorAll('.score')
	scoreElements.forEach(cell => {
		cell.innerHTML = ''
	})

	resetGame()
	unfade(menu);
	activeGame = false
	}
})

btn.addEventListener('click', function() {
	if (!activeGame) {
		game.style.display = 'grid'
		activeGame = true
		displayScore()
		fade(menu);
	}
})

cellElements.forEach(cell => {
	cell.addEventListener('click', function() {
		this.innerHTML = currentPlayer
		this.classList.add(currentPlayer)
		this.classList.add('checked')

		if (checkWin(currentPlayer) || checkTie()) {
			winState();
		}

		placeMark();
	})

	cell.addEventListener('mouseover', function() {
		if (!this.classList.contains('checked')) {
			this.innerHTML = currentPlayer
		}
	})

	cell.addEventListener('mouseout', function() {
		if (!this.classList.contains('checked')) {
			this.innerHTML = ''
		}
	})
})

function placeMark() {
	if (currentPlayer == 'X') {
		currentPlayer = 'O'
	} else {
		currentPlayer = 'X'
	}
}

function displayScore() {
	const player1 = document.querySelector('#player1-name').value
	const player2 = document.querySelector('#player2-name').value
	let p1 = document.createElement('div');
	p1.classList.add('score')

	let p2 = document.createElement('div');
	p2.classList.add('score')

	p1.innerHTML = `${player1} 0`
	p2.innerHTML = `${player2} 0`
	stats.appendChild(p1);
	stats.appendChild(p2);
}

function checkWin(currentClass) {
	return winCriteria.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}

function checkTie() {
	return [...cellElements].every(cell => {
		return cell.classList.contains('X') || cell.classList.contains('O')
	})
}

function winState() {
	resetGame();
}

function resetGame() {
	cellElements.forEach(cell => {
		cell.innerHTML = ''
		cell.classList.remove('X')
		cell.classList.remove('O')
		cell.classList.remove('checked')
		placeMark();
	})
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'grid';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}