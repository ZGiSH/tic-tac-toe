const btn = document.querySelector('#start-btn')
const menu = document.querySelector('#menu-container')
const game = document.querySelector('#game-container')
const grid = document.querySelector('#game-board')
const stats = document.querySelector('#stats')
const header = document.querySelector('#header')
const cpuSelect = document.querySelector('#input-cpu')
const pOneInput = document.querySelector('#player1-name')
const pTwoInput = document.querySelector('#player2-name')
const winScreen = document.querySelector('#win-screen')
const winPlayerDisp = document.querySelector('h2')
const cellElements = document.querySelectorAll('.cell')
const statDisplay = document.querySelectorAll('.score')

let currentPlayer = 'X'
let activeGame = false
let activeCPU = false
let cpuTurn = false

let player1
let player2
let score = 0

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

const playerFactory = (name, side) => {
	return { name, side, score };
};

winScreen.addEventListener('click', function() {
	unfade(game);
	setTimeout(function() {
		winScreen.style.display = 'none'
	}, 1000)
})

cpuSelect.addEventListener('change', function() {
	if (cpuSelect.value == 'none') {
		pTwoInput.disabled = false;
		pTwoInput.value = ''
	} else {
		pTwoInput.disabled = true;
		pTwoInput.value = 'COMPUTER'

	}
})

header.addEventListener('click', function() {
	if (activeGame) {

	const scoreElements = document.querySelectorAll('.score')
	scoreElements.forEach(cell => {
		cell.innerHTML = ''
	})

	resetGame()
	unfade(menu);

	currentPlayer = 'X'
	activeGame = false
	cpuSelect.value = 'none'
	pOneInput.value = ''
	pTwoInput.value = ''
	pOneInput.placeholder = 'P1 NAME'
	pTwoInput.placeholder = 'P2 NAME'
	pTwoInput.disabled = false
	header.innerHTML = '<h1>TIC-TAC-TOE</h1>'
	}
})

btn.addEventListener('click', function() {
	if (pOneInput.value !== '' && pTwoInput.value !== '') {

		if (!activeGame) {
			const pOneName = document.querySelector('#player1-name').value
			const pTwoName = document.querySelector('#player2-name').value
			player1 = playerFactory(pOneName, 'X');
			player2 = playerFactory(pTwoName, 'O');

			game.style.display = 'grid'
			activeGame = true
			displayScore()
			fade(menu);
			header.innerHTML = '<h1>BACK</h1>'
		}

	} else if (pOneInput.value == '' && pTwoInput.value == '') {
		pOneInput.placeholder = 'REQUIRED NAME'
		pTwoInput.placeholder = 'REQUIRED NAME'
	} else if (pOneInput.value !== '' && pTwoInput.value == '') {
		pTwoInput.placeholder = 'REQUIRED NAME'
	} else {
		pOneInput.placeholder = 'REQUIRED NAME'
	}

	activeCPU = (cpuSelect.value == 'none') ? false : true
})

cellElements.forEach(cell => {
	cell.addEventListener('click', function() {
		if (!this.classList.contains('checked')) {
			this.innerHTML = currentPlayer
			this.classList.add(currentPlayer)
			this.classList.add('checked')
			this.classList.remove('unchecked')

			if (checkWin(currentPlayer)) {
				winState();
			} else if (checkTie()) {
				tieState();
			}

			switchPlayer();

			if (activeCPU == true && currentPlayer == 'O') {
				cpuTurn = true;
				logicCPU();
			}
		}
	})

	cell.addEventListener('mouseover', function() {
		if (!this.classList.contains('checked') && cpuTurn == false) {
			this.innerHTML = currentPlayer
		}
	})

	cell.addEventListener('mouseout', function() {
		if (!this.classList.contains('checked') && cpuTurn == false) {
			this.innerHTML = ''
		}
	})
})

function switchPlayer() {
	if (currentPlayer == 'X') {
		currentPlayer = 'O'
	} else {
		currentPlayer = 'X'
	}
}

function displayScore() {

	let last_div = stats.lastElementChild;
	while (last_div) {
		stats.removeChild(last_div);
		last_div = stats.lastElementChild;
	}

	let p1 = document.createElement('div');
	p1.classList.add('score')

	let p2 = document.createElement('div');
	p2.classList.add('score')

	p1.innerHTML = `${player1.name} - ${player1.score}`
	p2.innerHTML = `${player2.name} - ${player2.score}`
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

	if (currentPlayer == 'X') {
		player1.score++
		winPlayerDisp.innerHTML = `${player1.name} Won!`
		displayScore()
	} else {
		player2.score++
		winPlayerDisp.innerHTML = `${player2.name} Won!`
		displayScore()
	}
	fade(game);
	resetGame();

	winScreen.style.display = 'flex'
}

function tieState() {

	winPlayerDisp.innerHTML = `Game Tied!`

	fade(game);
	resetGame();
	switchPlayer();

	winScreen.style.display = 'flex'
}

function resetGame() {
	cellElements.forEach(cell => {
		cell.innerHTML = ''
		cell.classList.remove('X')
		cell.classList.remove('O')
		cell.classList.remove('checked')
		cell.classList.add('unchecked')
	})
	cpuTurn = false
}

function logicCPU() {
	let cellsChecked = document.querySelectorAll('.unchecked')
	var randNum = Math.floor(Math.random() * (cellsChecked.length))
	let currentChoice = cellsChecked[randNum]

	if (cpuSelect.value == 'easy') {
		currentChoice.innerHTML = currentPlayer
		setTimeout(function () {
			currentChoice.click();
			cpuTurn = false;
		}, 500)
	}
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

