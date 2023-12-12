import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router";
import Logout from "./Logout";

export default function HomePage({ user }) {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to Fianchetto Chess</h1>
      <img src="https://chessandmusic.files.wordpress.com/2018/02/kandinsky-trente-1937-centre-pompidou1.jpg" />
      {user ? null : (
        <div className="home-buttons">
          <button onClick={() => navigate("/playvscomputer")}>
            Play a Game Against the AI
          </button>
        </div>
      )}
    </div>
  );
}
