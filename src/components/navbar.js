import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import {  HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function Navbar({user, updateUser}) {
  const [click, setClick] = useState(false);
  const history = useHistory(); // Initialisation de useHistory
  const handleClick = () => setClick(!click);
  const handleSignOut = (e) => {
    updateUser({})
    history.push("/connexion"); // Redirection vers la page recette

  };
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
          <img src={require("./Icons/logo.jpg")} alt="logo" className="logo"/>  
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>

		  <li className="nav-item">
              <NavLink
                exact
                to="/recettes"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Recettes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/favoris"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Favoris
              </NavLink>
            </li>
            <li className="nav-item">
            {Object.keys(user).length == 0 && (
        <NavLink
        exact
        to="/connexion"
        activeClassName="active"
        className="nav-links"
        onClick={handleClick}
      >
        
        Connexion
      </NavLink>
      )}
           {Object.keys(user).length !== 0 && (
        <NavLink
        exact
        to="/connexion"
        activeClassName="active"
        className="nav-links"
        onClick={handleSignOut }
      >
        
        Deconnexion
      </NavLink>
      )}
              
            </li>

          </ul>
          <div className="nav-icon" onClick={handleClick}>

            {click ? (
				 <span className="icon">
				 <HamburgetMenuClose />
			   </span>
              
            ) : (
				<span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
