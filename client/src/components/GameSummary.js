import { Navigate, useNavigate } from "react-router";
import WatchRecap from "../chess/WatchRecap";
import {Routes, Route} from "react-router-dom"
import { useState } from "react";

export default function GameSummary({game}){
    const [deletes, setDeletes] = useState(0);

    let winner;
    if (game.winner == "w"){
        winner = game.white_user.username;
    } else if (game.winner == "b"){
        winner = game.black_user.username;
    } else {
        winner = "Draw"
    }

    function handleDeleteGame(){
        let deleteConfirm = prompt("Are you sure you want to remove this game from your profile? This cannot be undone. Type 'yes' to confirm.")
        if (deleteConfirm == "yes"){
            // delete
            fetch(`http://localhost:3000/games/${game.id}`, 
            {method: 'DELETE'})
            .then(setDeletes(deletes+1))
        }
    }



    return (
        <div className="game-summary">
            <h4>{game.white_user.username} vs. {game.black_user.username} </h4>
            <h6> Winner: {winner} </h6>
            {/* <button onClick={GameRecap}>Watch Recap</button> */}
            <button onClick={handleDeleteGame}>Remove From Profile</button>
        </div>
        
    )
}