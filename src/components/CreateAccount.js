import { useState } from "react";
import { useNavigate } from "react-router";

function CreateAccount() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    let navigate = useNavigate();

    const submitCreateAccount = (e) => {
      e.preventDefault();
      let user = {
        username: username,
        password: password,
        elo: 1000
      }
      fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(console.log)
        .then(navigate('/login'))
    }

    return (
      <div className="AccountCreation">
        <h3>Create Your Account!</h3>
        <form onSubmit={submitCreateAccount}>
          <label>Username: 
          <input 
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          </label>
          <label> Password: 
          <input 
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          </label>
          <input type="submit" value="Create Account" />
        </form>
      </div>
    );
  }
  
  export default CreateAccount;