import React from "react";
import {useForm} from 'react-hook-form'
import './profil.css'
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Profil(){

    return(
     
        <>
            <Navbar/>
            <img className="profil" src={require('./../images/Frame 138.png')} alt="mon profil" />
            <div className="container5">
                <div className="profil-container">
                    
                </div>
            </div>

             <Footer/>
        
        </>
        
    )
}

export default Profil;