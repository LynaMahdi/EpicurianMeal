import React from "react";
import './home.css'
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Trending from "../components/trending";
import French from "../components/specialRecette";
import Vegetariennes from "../components/vegetariennes";
function Home({user}){
    return(
     
        <>
        <Navbar user={user}/>
        <div className="apr-bar">
            <img className="image" src={require('./../images/7922893.jpg')} alt='femme' />
             <div>
            <img className="image1" src={require('./../images/home.png')} alt='recherche' />
            <div className="recherche-bar">
            <input className="search-field" type="search" name="search" aria-label="Search recipes" placeholder="Recherchez les recettes..." ></input>
            <button className="search-submit" aria-label="Submit" >
                <span>Rechercher</span>
            </button>
          </div>
          </div>
        </div>
        <div className="section">
        <Trending></Trending>
        </div>

        <div className="section">
        <French/>
        </div>

        <div className="section">
        <Vegetariennes/>
        </div>

        <Footer></Footer>
        </>
        
    )
}

export default Home;