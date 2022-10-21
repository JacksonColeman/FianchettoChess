import { MINIMAX } from "./Minimax";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect, useState } from "react";

function ComputerVComputer(){
    const [chess, setChess] = useState(new Chess())
    const [FEN, setFEN] = useState(chess.fen())
    const [PlayPause, setPlayPause] = useState(false);
    const [inProgress, setInProgress] = useState(true);

    function makeMinimaxMove(game, depth, white){
        if (!game.isGameOver()) {
            const minimaxMove = MINIMAX(game, depth, white)[1];
            console.log(minimaxMove)
            game.move(minimaxMove)
            setFEN(game.fen())
        }
    }

    const timedMinimaxMove = setTimeout(() => {
        if (PlayPause){
            makeMinimaxMove(chess, 2, chess.turn()=="w")
        }
      }, 1000);

    useEffect(() => {
        if (!chess.isGameOver()){
            return () => timedMinimaxMove
        } else {
            setInProgress(false);
        }

    }, [FEN])

    function handlePlayPauseClick(){
        setPlayPause(!PlayPause);
    }

    let winner;
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
        <h1>Computer vs. Computer</h1>
        <Chessboard position={FEN}/>
        <button onClick={handlePlayPauseClick}>{PlayPause ? "Pause" : "Play"}</button>
        {!inProgress ? <p>{gameOverMessage()}</p> : null}
        <p>Watch an intelligent chess computer face off against itself!</p>
    </div>
  )
}

export default ComputerVComputer;