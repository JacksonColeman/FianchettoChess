import { useState } from "react";
import { useNavigate } from "react-router";

function Logout({setUser}) {

    let navigate = useNavigate();

    const handleLogoutClick = (e) => {
      fetch('http://localhost:3000/logout', {
          method: 'DELETE'
        })
        .then(r => {
            if (r.ok){
                setUser(null);
                let path = "/login"
                navigate(path);
            }
        })
    }

    return (
        <div>
            <button onClick={handleLogoutClick}>Log Out</button>
        </div>
    );
  }
  
  export default Logout;