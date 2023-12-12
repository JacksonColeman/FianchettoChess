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
        <div>
            <div className="account-wrapper">
                <h3>Current user: {user ? user.username : "No User Signed In"}</h3>
                <img src="https://i.imgur.com/Ag2ZKU7.png" height="110px" width="100px"/>
                <Logout setUser={setUser}/>
                <button onClick={handleDeleteAccount}>Delete Account</button>
            </div>
            {/* Rendering Games */}
            <GamesContainer games={games}/>
        </div>
    )
}