import React from "react";
import Navbar from "../components/navbar";
import './favoris.css'
export default function favoris({user,updateUser}){
    return(
        <>
            <Navbar user={user} updateUser={updateUser}/>
            <img className="Fav" src={require('./../images/Frame 138 (1).png')} alt='favoris' />


        </>
    )
}