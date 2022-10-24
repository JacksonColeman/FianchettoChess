import { Chess } from "chess.js";

export const pieceValue = {
    "k": 20000,
    "p": 100,
    "n": 300,
    "b": 320,
    "r": 500,
    "q": 900
}

let POSITIONS_HASH = {};

export function MINIMAX(game, depth, white_turn){
    let moves = GENERATE_MOVES(game);
    let moveValues = [];
    for (let m in moves){
        let newPos = UPDATE_POSITION(game, moves[m]);
        if (depth == 1){
            moveValues[m] = EVALUATE_POSITION(newPos) + Math.random() - 0.5;
        } else {
            moveValues[m] = MINIMAX(newPos, depth-1, !white_turn)[0];
        }
    }

    let bestVal;
    if (white_turn == true){
        bestVal = Math.max(...moveValues);
    } else {
        bestVal = Math.min(...moveValues)
    }

    let index_of = moveValues.indexOf(bestVal);
    let best_move = game.moves()[index_of]
    

    let output = [bestVal, best_move]

    return output;
}

let totalCalls = 0;
export function MINIMAX_ALPHA_BETA(game, depth, white_turn, alpha, beta){
    if (depth == 0){   
        return [EVALUATE_POSITION(game), null]
    }

    else if (white_turn){
        let bestVal = -Infinity;
        let bestMove = null;
        let moves = GENERATE_MOVES(game);
        for (let m in moves){
            let newPos = UPDATE_POSITION(game, moves[m]);
            let value = MINIMAX_ALPHA_BETA(newPos, depth-1, false, alpha, beta)[0];
            if (value > bestVal){
                bestVal = value;
                bestMove = moves[m]
            }
            alpha = Math.max(alpha, bestVal)

            debugger;

            if (beta <= alpha){
                console.log(`beta (${beta}) <= alpha (${alpha})`)
                break;
            }
        }
        return [bestVal, bestMove];
    }

    else if (white_turn == false){
        let bestVal = Infinity;
        let bestMove = null;
        let moves = GENERATE_MOVES(game);
        for (let m in moves){
            let newPos = UPDATE_POSITION(game, moves[m]);
            let value = MINIMAX_ALPHA_BETA(newPos, depth-1, true, alpha, beta)[0];
            if (value < bestVal){
                bestVal = value;
                bestMove = moves[m]
            }
            beta = Math.min(beta, bestVal)

            if (beta <= alpha){
                console.log(`beta (${beta}) <= alpha (${alpha})`)
                break;
            }
        }
        return [bestVal, bestMove];
    }

}

export function GENERATE_MOVES(game){
    // get moves
    let moves = game.moves({verbose:true});
    return moves;
}

export function EVALUATE_POSITION(Game){
    // if game is over, assign +/- infinity
    if (Game.isDraw()){
        return 0;
    } else if (Game.isCheckmate()){
        if (Game.turn() == "b"){
            return 100000;
        } else {
            return -100000;
        }
    }

    const board = Game._board

    let whiteScore = 0;
    let blackScore = 0;
    for (let square in board){
        // get piece value
        const piece = board[square]
        const pVal = pieceValue[piece.type]
        const totalVal = pVal;

        // assign to correct side
        if (piece.color =="w"){
            whiteScore += totalVal;;
        } else if (piece.color == "b"){
            blackScore += totalVal;
        }
    }

    let output = whiteScore - blackScore;
    return output;
}

export function UPDATE_POSITION(game, move){
    let gameCopy = new Chess(game.fen())
    gameCopy.move(move);
    return gameCopy;
}
