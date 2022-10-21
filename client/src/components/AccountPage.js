import { useEffect, useState} from "react";
import Logout from "./Logout";

export default function AccountPage({user, setUser}){

    const [games, setGames] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/users/${user.id}/games`)
            .then(res => res.json())
            .then(setGames)
    }, [])

    return(
        <div><div>
        <h3>Current user: {user ? user.username : "No User Signed In"}</h3>
        <h3>Elo: {user ? user.elo: "No User Signed In"}</h3>
        <Logout setUser={setUser}/>
      </div></div>
    )
}