import React, { } from 'react'

import "./HomePage.css"
import {  useNavigate } from "react-router-dom";
const HomePage=()=>{
    const navigate= useNavigate()

    return(
    <div> 
         
         <div className="header">
    <h1>Welcome to the Education Platform</h1>
</div>
<div  className="container">
    <h2 className="section-title">Meet Our Community</h2>
    <div className="grid">
        <div onClick={()=>navigate("/students")} className="card">
            <img src="https://via.placeholder.com/120" alt="Student"/>
            <h3>Students</h3>
            
            <button className="button">Like</button>
        </div>
        <div  onClick={()=>navigate("/teachers")} className="card">
            <img src="https://via.placeholder.com/120" alt="Teacher"/>
            <h3>Teachers</h3>
            
            <button className="button">Like</button>
        </div>
        <div onClick={()=>navigate("/classes")} className="card">
            <img src="https://via.placeholder.com/120" alt="Class"/>
            <h3>Classes</h3>
           
            <button className="button">Like</button>
        </div>
    </div>
</div>
</div>
  )
}

export default HomePage