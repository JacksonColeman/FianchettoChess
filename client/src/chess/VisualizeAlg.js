import { EVALUATE_POSITION, GENERATE_MOVES, UPDATE_POSITION } from "./Minimax";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect, useState } from "react";
import TreeVisualizer from "./TreeVisualizer";

function VisualizeAlg({user}){
    const [chess, setChess] = useState(new Chess())
    const [FEN, setFEN] = useState(chess.fen())
    const [inProgress, setInProgress] = useState(true);
    const [winner, setWinner] = useState(null)
    const [submittedGame, setSubmittedGame] = useState(false)
    
    const [initialPosition, setInitialPosition] = useState([]);
    const [position_tree, setPositionTree] = useState({});

    // ALG



    function MINIMAX_ALPHA_BETA(game, depth, white_turn, alpha, beta){
        // reset position tree upon new initial call


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

                if (!position_tree[game.ascii()]){
                    position_tree[game.ascii()] = [];
                }
                position_tree[game.ascii()].push([newPos.ascii(), value])
                //viz

                if (value > bestVal){
                    bestVal = value;
                    bestMove = moves[m]
                }
                alpha = Math.max(alpha, bestVal)
    
                if (beta <= alpha){
                    console.log(`beta (${beta}) <= alpha (${alpha})`)
                    break;
                }
            }
            if (depth == 3){
                setInitialPosition([game.ascii(), bestVal]);
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

                // viz
                if (!position_tree[game.ascii()]){
                    position_tree[game.ascii()] = [];
                }
                position_tree[game.ascii()].push([newPos.ascii(), value])

                
                //viz

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

            if (depth == 3){
                setInitialPosition([game.ascii(), bestVal]);
            }

            return [bestVal, bestMove];
        }
    
    }




    // ALG

    const userColor = "w";

    // user color as full string ("white/black")
    let userColorFull
    let whiteUserID;
    let blackUserID;

    if (userColor == "w"){
        userColorFull = "white"
        whiteUserID = user.id;
        blackUserID = 999;
    } else if (userColor == "b"){
        userColorFull = "black"
        blackUserID = user.id;
        whiteUserID = 999;
    }

    // set computer depth based on difficulty
    let cpudepth = 3;

    function makeMinimaxABMove(game, depth, white){
        if (!game.isGameOver()) {
            const minimaxABMove = MINIMAX_ALPHA_BETA(game, depth, white, -Infinity, Infinity)[1];
            game.move(minimaxABMove)
            setFEN(game.fen())
        }
    }


    const timedMove = setTimeout(() => {
        if (chess.turn()!=userColor){
            makeMinimaxABMove(chess, cpudepth, chess.turn()=="w")
        } 
      }, 1000);

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


    const saveGameClick = () => {
        const game = {
            white_user_id: whiteUserID,
            black_user_id: blackUserID,
            winner: winner,
            pgn: chess.pgn()
        }

        // post
        fetch('http://localhost:3000/games', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(game)
        })
        .then(res => res.json())
        .then(console.log)

        setSubmittedGame(true);
    }
        debugger;

  return(
    <div>
        <h1>Play vs. Computer</h1>
        <h2>Opponent: Computer </h2>
        <Chessboard position={FEN} onPieceDrop={onDrop} boardOrientation={userColorFull}/>
        {user ? <h2>Playing as: {user.username}</h2> : <h2>Playing as Guest</h2>}
        {inProgress ? null 
        : 
            <div>
                <p>{gameOverMessage()}</p>
            </div>
               
        }
        <h1>ALGORITHM VISUALIZATION</h1>
        <TreeVisualizer positionTree={position_tree} initialPosition={initialPosition}/>
    </div>
  )
}

export default VisualizeAlg;