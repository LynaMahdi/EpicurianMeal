import React from 'react';
import './filter.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { NavLink } from 'react-router-dom';
const Product = ({ id,image, title }) => {
  return (
    <div className="contenu1">
      <img src={image} alt="plat" />
      <div className="info">
        <p>{title}</p>
        <div className="button-container">
          <button className="like-button">
            <FavoriteBorderIcon />
          </button>
          <NavLink to={'/recette/'+id}>
         <button className="read-more-button">Voir plus </button> 
         </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Product;
