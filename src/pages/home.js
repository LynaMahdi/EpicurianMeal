import React from "react";
import './home.css'
import {FaAngleLeft,FaAngleRight} from "react-icons/fa";
import Navbar from "../components/navbar";
import Recette from "../components/recette";
import Footer from "../components/footer";
import Trending from "../components/trending";
import ReCat from "../components/recette_categorie";
import FilterZ from "../components/filterZ";
import ProductList from "../components/tst2";

function Home(){
    return(
     
        <>
        <Navbar/>
        <img className="image" src={require('./../images/7922893.jpg')} alt='femme' />
        <div className="container1">
            <div className="populaire">
            <img  src={require('./../images/Group 18132.png')} alt="titre" />  
                  <Trending/>
            </div>
        </div>

        
         <FilterZ/>

        <Footer/>
        
        </>
        
    )
}

export default Home;