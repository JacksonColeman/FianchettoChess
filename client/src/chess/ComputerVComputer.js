import { MINIMAX } from "./Minimax";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect, useState } from "react";

function ComputerVComputer(){
    const [chess, setChess] = useState(new Chess())
    const [FEN, setFEN] = useState(chess.fen())
    const [PlayPause, setPlayPause] = useState(false);

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
        return () => timedMinimaxMove
    }, [FEN])

    function handlePlayPauseClick(){
        setPlayPause(!PlayPause);
    }

  return(
    <div>
        <h1>Computer vs. Computer</h1>
        <Chessboard position={FEN}/>
        <button onClick={handlePlayPauseClick}>{PlayPause ? "Pause" : "Play"}</button>
        <p>Watch an intelligent chess computer face off against itself!</p>
    </div>
  )
}

export default ComputerVComputer;