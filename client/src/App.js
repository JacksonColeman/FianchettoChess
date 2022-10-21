import { useState, useEffect } from "react";
import CreateAccount from "./components/CreateAccount";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import {Routes, Route} from "react-router-dom"
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import RandomVRandom from "./chess/RandomVRandom";
import ComputerVComputer from "./chess/ComputerVComputer";
import ComputerVRandom from "./chess/ComputerVRandom";
import InitUserGame from "./chess/InitUserGame";
import AccountPage from "./components/AccountPage";

function App() {
  const [user, setUser] = useState(null);


  return (
    <div className="App">
      
      <Navbar user={user}/>
      <Routes>
        <Route path = '/signup' element = {<CreateAccount/>} />
          
        <Route path = '/login'
          element = {
          <div>
            <CreateAccount/>
            <LoginForm setUser={setUser}/>
          </div>}
        />

        <Route path = '/account' element = {<AccountPage user={user} setUser={setUser}/>
        } />

        <Route path = '/randvsrand' element = {<RandomVRandom/>}/>

        <Route path = '/about' element = {<AboutPage/>}/>

        <Route path = '/' element = {<HomePage/>}/>

        <Route path = "/playvscomputer" element = {<InitUserGame user={user}/>}/>

        <Route path = '/compvscomp' element = {<ComputerVComputer/>}/>

        <Route path = '/compvsrand' element = {<ComputerVRandom/>}/>

        

        <Route path = '*' element = {<h1>404 not found</h1>}/>
        
        {/* <Logout setUser={setUser}/> */}
      </Routes>
    </div>
  );
}

export default App;
