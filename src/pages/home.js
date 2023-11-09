import React from "react";
import './home.css'
import {FaAngleLeft,FaAngleRight} from "react-icons/fa";
import Navbar from "../components/navbar";
import Recette from "../components/recette";
import Footer from "../components/footer";
import Trending from "../components/trending";
import ReCat from "../components/recette_categorie";
import FilterZ from "../components/filterZ";

function Home(){
    return(
     
        <>
        <Navbar/>
        <img className="image" src={require('./../images/7922893.jpg')} alt='femme' />
       
         <Trending/>
         <FilterZ/>
        <Footer/>
        
        </>
        
    )
}

export default Home;