function aiPlay() {
   
    function emptyCells(board) {
        return board.filter(cell => cell !== "O" && cell !== "X");
    }

    let bestPlay = minimax(gameBoard.board, player2.symbol).index;
        
    function minimax(newBoard, player) {
        let human = "X";
        let ai = "O";

        let availableSpots = emptyCells(newBoard);
    
        if (winning(newBoard, human)) {
            return { score: -10 };
        }
        else if (winning(newBoard, ai)) {
            return { score: 10 }
        }
        else if (availableSpots.length === 0) {
            return { score: 0 };
        }
        let moves = [];
        for (let i = 0; i < availableSpots.length; i++) {
            let move = {};
            move.index = newBoard[availableSpots[i]];
            newBoard[availableSpots[i]] = player;
    
            if (player === ai) {
                let result = minimax(newBoard, human);
                move.score = result.score;
            }
            else {
                let result = minimax(newBoard, ai);
                move.score = result.score;
            }
            newBoard[availableSpots[i]] = move.index;
            moves.push(move);
        }
    
            let bestMove;
            if (player === ai) {
                let bestScore = -10000;
                for (let i = 0; i < moves.length; i++) {
                    if (moves[i].score > bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            }
            else {
                let bestScore = 10000;
                for (let i = 0; i < moves.length; i++) {
                    if (moves[i].score < bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            }
            return moves[bestMove];
    }
    return bestPlay;
}
