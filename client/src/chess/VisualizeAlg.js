import { EVALUATE_POSITION, GENERATE_MOVES, UPDATE_POSITION, MOVE_COMPARE } from "./Minimax";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect, useState } from "react";
import TreeVisualizer from "./TreeVisualizer";

function VisualizeAlg(){
    const [chess, setChess] = useState(new Chess())
    const [FEN, setFEN] = useState(chess.fen())
    const [inProgress, setInProgress] = useState(true);
    const [winner, setWinner] = useState(null)
    
    const [initialPosition, setInitialPosition] = useState([]);
    const [position_tree, setPositionTree] = useState({});
    const [thinking, setThinking] = useState("");

    const mc = MOVE_COMPARE;

    // ALG

    function MINIMAX_ALPHA_BETA(game, depth, white_turn, alpha, beta){
        if (depth == 0){   
            return [EVALUATE_POSITION(game), null]
        }
    
        else if (white_turn){
            let bestVal = -Infinity;
            let bestMove = null;
            let moves = GENERATE_MOVES(game);

            // safeguard against drawn positions being evaluated as a win
            if (moves == null){
                console.log("no moves!")
                return [EVALUATE_POSITION(game), null]
            }

            for (let m in moves){
                let newPos = UPDATE_POSITION(game, moves[m]);
                let value = MINIMAX_ALPHA_BETA(newPos, depth-1, false, alpha, beta)[0];

                if (value > bestVal){
                    bestVal = value;
                    bestMove = moves[m]
                }
                alpha = Math.max(alpha, bestVal)

                if (!position_tree[game.ascii()]){
                    position_tree[game.ascii()] = [];
                }
                position_tree[game.ascii()].push([newPos.ascii(), moves[m].san, value, alpha, beta])
                //viz
    
                if (beta <= alpha){
                    position_tree[game.ascii()].push(["beta <= alpha","break","NA",alpha,beta])
                    break;
                }
            }

            if (bestMove == null){
                bestMove = moves[Math.floor(Math.random() * moves.length)]
            }

            if (depth == cpudepth){
                setInitialPosition([game.ascii(), bestMove.san, bestVal, alpha, beta]);
            }

            

            return [bestVal, bestMove];
        }
    
        else if (white_turn == false){
            let bestVal = Infinity;
            let bestMove = null;
            let moves = GENERATE_MOVES(game);

            // safeguard against drawn positions being evaluated as a win
            if (moves == null){
                console.log("no moves!")
                return [EVALUATE_POSITION(game), null]
            }

            for (let m in moves){
                let newPos = UPDATE_POSITION(game, moves[m]);
                let value = MINIMAX_ALPHA_BETA(newPos, depth-1, true, alpha, beta)[0];
                
                //viz

                if (value < bestVal){
                    bestVal = value;
                    bestMove = moves[m]
                }
                beta = Math.min(beta, bestVal)

                // viz
                if (!position_tree[game.ascii()]){
                    position_tree[game.ascii()] = [];
                }
                position_tree[game.ascii()].push([newPos.ascii(), moves[m].san, value, alpha, beta])
    
                if (beta <= alpha){
                    position_tree[game.ascii()].push(["beta <= alpha","NA","NA",alpha,beta])
                    break;
                }
            }
            

            if (bestMove == null){
                bestMove = moves[Math.floor(Math.random() * moves.length)]
            }

            if (depth == cpudepth){
                setInitialPosition([game.ascii(), bestMove.san, bestVal, alpha, beta]);
            }

            return [bestVal, bestMove];
        }
    
    }

    // ALG

    const userColor = "w";

    // set computer depth based on difficulty
    let cpudepth = 3; // setting depth 3

    function makeMinimaxABMove(game, depth, white){
        if (!game.isGameOver()) {
            const minimaxABMove = MINIMAX_ALPHA_BETA(game, depth, white, -Infinity, Infinity)[1];
            game.move(minimaxABMove)
            setFEN(game.fen())
        }
    }

    const timedMove = setTimeout(() => {
        if (chess.turn()!=userColor){
            setThinking("Thinking...")
            makeMinimaxABMove(chess, cpudepth, chess.turn()=="w")
            setThinking("")
        } 
      }, 100);

    useEffect(() => {
        if (!chess.isGameOver()){
            return () => timedMove;
        } else if (chess.isGameOver()){
            setInProgress(false)
        }
    }, [FEN])

    function onDrop(pieceFrom, pieceTo, piece){
        // if user turn
        if (chess.turn() == userColor){
            let move = {
                from: pieceFrom,
                to: pieceTo
            }

            // check if promotion possible
            if (piece == "wP" && pieceTo.includes("8")){
                move = {...move, promotion: "q"}
            } else if (piece == "bP" && pieceTo.includes("1")){
                move = {...move, promotion: "q"}
            }

            chess.move(move);
            setFEN(chess.fen())
            setPositionTree({})

            if (chess.isCheckmate()){
                setInProgress(false)
                if (chess.turn()=="w"){
                    setWinner("b") // black
                } else {
                    setWinner("w") // white
                }
            } else if (chess.isGameOver()){
                setInProgress(false)
                setWinner("d")
            }

        } else {
            console.log("not your turn!")
        }
    }

    function gameOverMessage(){
        if (winner == "b"){
            return "Game over! Black wins!"
        } else if (winner == "w"){
            return "Game over! White wins!"
        } else if (winner == "d"){
            return "It's a draw!"
        }
    }

  return(
    <div>
        <h1>Visualize Algorithm</h1>
        <h2>Minimax with Alpha-Beta Pruning </h2>
        {thinking ? <h2>{thinking}</h2> : null}
        <div className="board">
            <Chessboard className="board" position={FEN} onPieceDrop={onDrop}/>
        </div>
        {inProgress ? null 
        : 
            <div>
                <p>{gameOverMessage()}</p>
            </div>
               
        }
        <p>Play as white to see how the computer will respond as black</p>
        <TreeVisualizer positionTree={position_tree} initialPosition={initialPosition}/>

    </div>
  )
}

export default VisualizeAlg;