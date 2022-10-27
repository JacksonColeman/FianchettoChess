import { Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router';
import Logout from './Logout';


export default function HomePage({user}){

    const navigate = useNavigate();

    return(
        <div className="home">
            <h1>Welcome to Fianchetto Chess</h1>
            {user ? <h4>Welcome, {user.username}!</h4> : <h4>Log in or sign up to get started — or, continue as a guest</h4>}
            <img src="https://chessandmusic.files.wordpress.com/2018/02/kandinsky-trente-1937-centre-pompidou1.jpg"/>
            {user ?
            null
            :
            <div className="home-buttons">
                <button onClick={() => navigate("/login")}>Log In</button>
                <button onClick={() => navigate("/signup")}>Sign Up</button>
            </div>
            }
        </div>
    )
}