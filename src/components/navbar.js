import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Navbar({ user, updateUser }) {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = () => setClick(!click);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkSession = () => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleSignOut = async (e) => {
    try {
      setIsLoggedIn(false);
      sessionStorage.removeItem('userEmail');
      updateUser({});
      history.push("/connexion");
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <nav className="navbar">
    <div className="nav-container">
      <NavLink exact to="/" className="nav-logo">
        <img src={require('./Icons/logo.jpg')} alt="logo" className="logo" />
      </NavLink>

      <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        <li className="nav-item">
          <NavLink
            exact
            to="/recettes"
            activeClassName="active"
            className="nav-links"
            onClick={handleClick}
          >
            Recipes
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
            Favorites
          </NavLink>
        </li>
              <li className="nav-item">
                {isLoggedIn ? (
                  <div>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                         <AccountCircleIcon style={{ boxShadow: 'none' }} />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      PaperProps={{ style: {  marginTop: 50 , width: 150 ,height: 200} }} // Ajustez ces valeurs selon vos besoins

                    >   
                    
                    <NavLink
                    exact
                    to="/profile"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClose}
                  >
                      
                      <MenuItem onClick={handleClose}>Profile</MenuItem></NavLink>
                      <NavLink
                    exact
                    to="/connexion"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleSignOut}
                  >
                    <MenuItem onClick={handleClose}>Log Out</MenuItem></NavLink>
                    </Menu>
                  </div>
                ) : (
                  <NavLink
                    exact
                    to="/connexion"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Log In
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
  );
}

export default Navbar;
