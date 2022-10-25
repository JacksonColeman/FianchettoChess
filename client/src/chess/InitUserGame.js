import { useState } from "react";
import UserVComputer from "./UserVComputer";

export default function InitUserGame({user}){
    const [gameStart, setGameStart] = useState(false);
    const [userColor, setUserColor] = useState("");
    const [CPUDiff, setCPUDiff] = useState("");

    const handleStartGame = () => {
        if (userColor != "" && CPUDiff != ""){
            setGameStart(!gameStart)
        }
    }

    return(
        <div>
        {gameStart ? 
        <div> 
            <UserVComputer user={user} userColor={userColor} difficulty={CPUDiff}/>
        </div>
        :
            <div>
                <h1>Game Setup</h1>
                <select onChange={(e) => setUserColor(e.target.value)}>
                    <option value="default">Play as White or Black?</option>
                    <option value="w">White</option>
                    <option value="b">Black</option>
                </select>
                <select onChange={(e) => setCPUDiff(e.target.value)}>
                    <option value="default">Select Computer Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button onClick={handleStartGame}>Start Game!</button>
                <p>
                    Select what color you wish to play as and the difficulty of the computer.
                    The computer algorithm will search deeper into the analysis tree at higher difficulties!
                </p>
            </div>   
        }
        </div>
    )
}

