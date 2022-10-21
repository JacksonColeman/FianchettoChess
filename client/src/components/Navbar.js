import React from 'react'
import { NavLink } from "react-router-dom"


export default function Navbar ({user}) {
    return(
        <div className="navbar-not-signed-in">
            <NavLink exact to ="/"> Home </NavLink>
            <NavLink to="/playvscomputer"> Play vs. Computer </NavLink>
            <NavLink to="/compvscomp"> Watch Computer vs. Computer </NavLink>
            <NavLink to="/compvsrand"> Watch Computer vs. Random </NavLink>
            <NavLink to="/randvsrand"> Watch Random vs. Random </NavLink>
            {/* <NavLink to="/signup"> Sign Up </NavLink> */}
            
            {user ? <NavLink to="/account"> View Account </NavLink> : 
                <NavLink to="/login"> Login </NavLink>
            }
            <NavLink to="/about"> About </NavLink>
        </div>
        
    )
}

