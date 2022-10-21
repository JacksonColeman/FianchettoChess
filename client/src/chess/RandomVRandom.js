import {Chess} from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect, useState } from "react";

function RandomVRandom(){
    const [chess, setChess] = useState(new Chess())
    const [FEN, setFEN] = useState(chess.fen())
    const [PlayPause, setPlayPause] = useState(false);


    // random game code from chess.js readme
    function randomMove(){
        if (!chess.isGameOver()) {
            const moves = chess.moves()
            const move = moves[Math.floor(Math.random() * moves.length)]
            console.log(move);
            chess.move(move)
            setFEN(chess.fen())
        }
    }

    const timedRandomMove = setTimeout(() => {
        if (PlayPause){
            randomMove()
        }
      }, 1000);

    useEffect(() => {
        return () => timedRandomMove
    }, [FEN])

    function handlePlayPauseClick(){
        setPlayPause(!PlayPause);
    }

    return (
        <div>
            <h1>Random vs. Random</h1>
            <Chessboard position={FEN}/>
            <button onClick={handlePlayPauseClick}>{PlayPause ? "Pause" : "Play"}</button>
            <p>
                Watch the computer play against itself with both sides making totally random moves!
                Play and pause the action using the button above.
            </p>
        </div>
      )
}

export default RandomVRandom;