import { MINIMAX, MINIMAX_ALPHA_BETA } from "./Minimax";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect, useState } from "react";

function UserVComputer({ user, userColor, difficulty }) {
  const [chess, setChess] = useState(new Chess());
  const [FEN, setFEN] = useState(chess.fen());
  const [inProgress, setInProgress] = useState(true);
  const [winner, setWinner] = useState(null);
  const [submittedGame, setSubmittedGame] = useState(false);
  const [guest, setGuest] = useState(user == null);

  // user color as full string ("white/black")
  let userColorFull;
  // let whiteUserID;
  // let blackUserID;

  if (userColor == "w") {
    userColorFull = "white";
    if (!guest) {
      whiteUserID = user.id;
      blackUserID = 999;
    }
  } else if (userColor == "b") {
    userColorFull = "black";
    if (!guest) {
      blackUserID = user.id;
      whiteUserID = 999;
    }
  }

  // set computer depth based on difficulty
  let cpudepth;
  switch (difficulty) {
    case "Easy":
      cpudepth = 2;
      break;
    case "Medium":
      cpudepth = 3;
      break;
    case "Hard":
      cpudepth = 4;
      break;
  }

  function makeMinimaxMove(game, depth, white) {
    if (!game.isGameOver()) {
      const minimaxMove = MINIMAX(game, depth, white)[1];
      console.log(minimaxMove);
      game.move(minimaxMove);
      setFEN(game.fen());
    }
  }

  function makeMinimaxABMove(game, depth, white) {
    if (!game.isGameOver()) {
      const minimaxABMove = MINIMAX_ALPHA_BETA(
        game,
        depth,
        white,
        -Infinity,
        Infinity
      )[1];
      game.move(minimaxABMove);
      setFEN(game.fen());
    }
  }

  function randomMove() {
    if (!chess.isGameOver()) {
      const moves = chess.moves();
      const move = moves[Math.floor(Math.random() * moves.length)];
      console.log(move);
      chess.move(move);
      setFEN(chess.fen());
    }
  }

  const timedMove = setTimeout(() => {
    if (chess.turn() != userColor) {
      makeMinimaxABMove(chess, cpudepth, chess.turn() == "w");
    }
  }, 1000);

  useEffect(() => {
    if (!chess.isGameOver()) {
      return () => timedMove;
    } else if (chess.isGameOver()) {
      setInProgress(false);
    }
  }, [FEN]);

  function onDrop(pieceFrom, pieceTo, piece) {
    // if user turn
    if (chess.turn() == userColor) {
      let move = {
        from: pieceFrom,
        to: pieceTo,
      };

      // check if promotion possible
      if (piece == "wP" && pieceTo.includes("8")) {
        move = { ...move, promotion: "q" };
      } else if (piece == "bP" && pieceTo.includes("1")) {
        move = { ...move, promotion: "q" };
      }

      chess.move(move);
      setFEN(chess.fen());
      console.log(chess.history());

      if (chess.isCheckmate()) {
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
    } else {
      console.log("not your turn!");
    }
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

  // const saveGameClick = () => {
  //     const game = {
  //         white_user_id: whiteUserID,
  //         black_user_id: blackUserID,
  //         winner: winner,
  //         pgn: chess.pgn()
  //     }

  //     // post
  //     fetch('http://localhost:3000/games', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(game)
  //     })
  //     .then(res => res.json())
  //     .then(console.log)

  //     setSubmittedGame(true);
  // }

  return (
    <div>
      <h1>Play vs. Computer</h1>
      <h2>Opponent: AI, Difficulty: {difficulty}</h2>
      <div className="board">
        <Chessboard
          position={FEN}
          onPieceDrop={onDrop}
          boardOrientation={userColorFull}
        />
      </div>
      {inProgress ? null : (
        <div>
          <p>{gameOverMessage()}</p>
          {/* {guest ? 
                null :
                    submittedGame ? 
                    <p>Game Saved To Profile!</p>
                    :
                    <button onClick={saveGameClick}>Save Game To Profile</button>
                } */}
        </div>
      )}
      <p>Can you beat the computer?</p>
    </div>
  );
}

export default UserVComputer;
