import React from "react";
import './home.css'
import { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Trending from "../components/trending";
import French from "../components/specialRecette";
import Vegetariennes from "../components/vegetariennes";
import Search from "../components/barsearch";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



function Home({user, updateUser}){
    const [searchTerm, setSearchTerm] = useState("");
    const history = useHistory();
  
    const submitHandler = (e) => {
      e.preventDefault();
      history.push(`/searched/${searchTerm}`);
    };
    return(
     
        <>
        <Navbar user={user} updateUser={updateUser}/>
        <div className="apr-bar">
            <img className="image" src={require('./../images/7922893.jpg')} alt='femme' />
             <div>
            <img className="image1" src={require('./../images/Group 18134.png')} alt='recherche' />
            <Search/>
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