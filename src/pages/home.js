import React from "react";
import './home.css'
import {FaAngleLeft,FaAngleRight} from "react-icons/fa";
import Navbar from "../components/navbar";
import Recette from "../components/recette";
import Footer from "../components/footer";
import Trending from "../components/trending";
import Filter from "../components/filter";
import ReCat from "../components/recette_categorie";
import FilterZ from "../components/filterZ";

function Home(){
    return(
     
        <>
            <Navbar/>
        <img className="image" src={require('./../images/7922893.jpg')} alt='femme' />
        <div className="container1">
            <img className="populaire" src={require('./../images/Group 18132.png')} alt="titre" />
            <div className="sliding">
                <Trending/>
            </div>
          
        </div>

        <div className="container2">
            <div className="contenu">
                <FilterZ/>
            </div>
            <div className="Filtered">
            </div>
     
          
        </div>

        <Footer/>
        
        </>
        
    )
}

export default Home;