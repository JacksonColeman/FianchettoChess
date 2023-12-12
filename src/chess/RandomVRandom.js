import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect, useState } from "react";

function RandomVRandom() {
  const [chess, setChess] = useState(new Chess());
  const [FEN, setFEN] = useState(chess.fen());
  const [PlayPause, setPlayPause] = useState(false);
  const [inProgress, setInProgress] = useState(true);
  const [winner, setWinner] = useState(null);

  // random game code from chess.js readme
  function randomMove() {
    if (!chess.isGameOver()) {
      const moves = chess.moves();
      const move = moves[Math.floor(Math.random() * moves.length)];
      console.log(move);
      chess.move(move);
      setFEN(chess.fen());
    }
  }

  const timedRandomMove = setTimeout(() => {
    if (PlayPause) {
      randomMove();
    }
  }, 1000);

  useEffect(() => {
    if (!chess.isGameOver()) {
      return () => timedRandomMove;
    } else if (chess.isCheckmate()) {
      setInProgress(false);
      if (chess.turn() == "w") {
        setWinner("b"); // black
      } else {
        setWinner("w"); // white
      }
    } else if (chess.isGameOver()) {
      setInProgress(false);
      setWinner("d");
    }
  }, [FEN]);

  function handlePlayPauseClick() {
    setPlayPause(!PlayPause);
  }

  function gameOverMessage() {
    if (winner == "b") {
      return "Game over! Black wins!";
    } else if (winner == "w") {
      return "Game over! White wins!";
    } else if (winner == "d") {
      return "It's a draw!";
    }
  }

  return (
    <div>
      <h1>Random vs. Random</h1>
      <p>
        Watch the computer play against itself with both sides making totally
        random moves! Play and pause the action using the button above.
      </p>
      <div className="board">
        <Chessboard position={FEN} />
      </div>
      <button onClick={handlePlayPauseClick}>
        {PlayPause ? "Pause" : "Play"}
      </button>
      {!inProgress ? <p>{gameOverMessage()}</p> : null}
    </div>
  );
}

export default RandomVRandom;
