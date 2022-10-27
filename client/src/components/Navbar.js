import React from 'react'
import { NavLink } from "react-router-dom"


export default function Navbar ({user}) {
    return(
        <div className="navbar">
            <NavLink className="main" exact to ="/">Fianchetto Chess</NavLink>
            {/* <NavLink exact to ="/"> Home </NavLink> */}
            <NavLink to="/playvscomputer"> Play vs. AI </NavLink>
            <NavLink to="/compvscomp"> Watch AI vs. AI</NavLink>
            <NavLink to="/compvsrand"> Watch AI vs. Random </NavLink>
            <NavLink to="/randvsrand"> Watch Random vs. Random </NavLink>
            <NavLink to="/visualize"> Visualize The AI Algorithm</NavLink>
            <NavLink to="/about"> About </NavLink>
            {/* <NavLink to="/signup"> Sign Up </NavLink> */}
            
            {user ? <NavLink to="/account"> Hi, {user.username} </NavLink> : 
                <NavLink to="/login"> Hi, Guest </NavLink>
            }
            
        </div>
        
    )
}

