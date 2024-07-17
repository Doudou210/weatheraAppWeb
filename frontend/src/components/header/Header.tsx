import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
        <nav style={{display: "inline-flex", background:"skyblue",width:"100%",height:"50px", justifyContent:"space-evenly", alignItems: "center"}}>
            <h1>Logo</h1>
            <Link to={"/authuser"}>Login</Link>
            <Link to={"/regisuser"}>Sign Up</Link>
        </nav>
    </div>
  )
}
