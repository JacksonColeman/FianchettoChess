import { useEffect, useState} from "react";
import GamesContainer from "./GamesContainer";
import Logout from "./Logout";
import { useNavigate } from "react-router";

export default function AccountPage({user, setUser}){

    const [games, setGames] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:3000/users/${user.id}/games`)
            .then(res => res.json())
            .then(setGames)
    }, [])

    function handleDeleteAccount(){
        let deleteConfirm = prompt("Are you sure you want to delete your account? Type 'delete' to confirm.")
        if (deleteConfirm == "delete"){
            // delete
            fetch(`http://localhost:3000/users/${user.id}`, {
            method: 'DELETE'})
            .then(r => {
            if (r.ok){
                setUser(null);
                let path = "/login"
                navigate(path);
            }
        })
        }
    }

    return(
        <div><div>
        <h3>Current user: {user ? user.username : "No User Signed In"}</h3>
        <h3>Elo: {user ? user.elo: "No User Signed In"}</h3>
        <Logout setUser={setUser}/>
        <button onClick={handleDeleteAccount}>Delete Account</button>
        {/* Rendering Games */}
        <GamesContainer games={games}/>
      </div></div>
    )
}