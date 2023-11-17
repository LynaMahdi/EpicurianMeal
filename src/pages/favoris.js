import React from "react";
import Navbar from "../components/navbar";
import './favoris.css'
export default function favoris(user={user}){
    return(
        <>
            <Navbar user={user}/>
            <img className="Fav" src={require('./../images/Frame 138 (1).png')} alt='favoris' />


        </>
    )
}