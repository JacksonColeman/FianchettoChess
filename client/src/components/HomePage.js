import { Button, ButtonGroup } from '@mui/material';


export default function HomePage({user}){

    return(
        <div className="home">
            <h1>Welcome to Fianchetto Chess</h1>
            {user ? <p>Welcome, {user.username}!</p> : <p>Log in or sign up to get started — or, play as a guest</p>}
            <img src="https://chessandmusic.files.wordpress.com/2018/02/kandinsky-trente-1937-centre-pompidou1.jpg"/>
        </div>
    )
}