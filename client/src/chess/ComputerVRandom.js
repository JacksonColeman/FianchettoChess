import { MINIMAX } from "./Minimax";
import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect, useState } from "react";

function ComputerVRandom(){
    const [chess, setChess] = useState(new Chess())
    const [FEN, setFEN] = useState(chess.fen())
    const [PlayPause, setPlayPause] = useState(false);

    function makeMinimaxMove(game, depth, white){
        const minimaxMove = MINIMAX(game, depth, white)[1];
        console.log(minimaxMove)
        game.move(minimaxMove)
        setFEN(game.fen())
    }

    function randomMove(){
        if (!chess.isGameOver()) {
            const moves = chess.moves()
            const move = moves[Math.floor(Math.random() * moves.length)]
            console.log(move);
            chess.move(move)
            setFEN(chess.fen())
        }
    }

    const timedMove = setTimeout(() => {
        if (PlayPause && chess.turn()=="w"){
            makeMinimaxMove(chess, 2, true)
        } else if (PlayPause && chess.turn()=="b") {
            randomMove();
        }
      }, 1000);

    useEffect(() => {
        return () => timedMove
    }, [FEN])

    function handlePlayPauseClick(){
        setPlayPause(!PlayPause);
    }

  return(
    <div>
        <h1>Computer vs. Random</h1>
        <Chessboard position={FEN}/>
        <button onClick={handlePlayPauseClick}>{PlayPause ? "Pause" : "Play"}</button>
        <p>In this demonstration, an intelligent chess computer is playing as the white pieces, while the
            black pieces are moved at random. Enjoy!
        </p>
    </div>
  )
}

export default ComputerVRandom;