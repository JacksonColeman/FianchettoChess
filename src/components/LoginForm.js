import { useState } from "react";
import { useNavigate } from "react-router";

function LoginForm({setUser}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])

    let navigate = useNavigate();

    const submitLogin = (e) => {
      e.preventDefault();
      let user = {
        username,
        password,
      }
      fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
        })
        .then(r => r.json())
        .then(r => {
          console.log(r);
          if(r.id){
            setUser(r);
            navigate("/account")
          } else {
            setErrors(r.error);
            console.log(errors)
          }
        })
    
          
          
    }

    return (
      <div className="AccountCreation">
        <h3>Log In</h3>
        <form onSubmit={submitLogin}>
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
          <input type="submit" value="Log In" />
        </form>
        <h2>{errors}</h2>
      </div>
    );
  }
  
  export default LoginForm;