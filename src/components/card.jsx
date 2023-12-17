import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart, faHeart as fasHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import './filter.css'
const Product = ({ id, image, title }) => {
  const [favoritedItems, setFavoritedItems] = useState({});
  const [isFavorited, setIsFavorited] = useState(
    () => JSON.parse(localStorage.getItem(`favorited_${id}`)) || false
  );
  
  const addToFavorites = async (recipeId) => {
    let userEmail = sessionStorage.getItem('userEmail');
    try {
      const fdata = new FormData();
      fdata.append('id', recipeId);
      fdata.append('userEmail', userEmail);
      fdata.append('image', image); // Assure-toi que 'image' est défini
      fdata.append('title', title); // Assure-toi que 'title' est défini
  
      let url = 'https://linamahdi.alwaysdata.net/favoris.php'; // Endpoint pour ajouter aux favoris
      const response = await axios.post(url,fdata);
      const responseData = response.data;
      console.log(responseData);

      // Mettre à jour l'état local avec un nouvel objet contenant les états favoris mis à jour
      setFavoritedItems({ ...favoritedItems, [recipeId]: true });
    } catch (error) {
      console.error('Erreur lors de l\'ajout aux favoris :', error);
    }
  };

  const removeFromFavorites = async (recipeId) => {
    let userEmail = sessionStorage.getItem('userEmail');
    try {
      const fdata = new FormData();
      fdata.append('id', recipeId);
      fdata.append('userEmail', userEmail);
      fdata.append('image', image); // Assure-toi que 'image' est défini
      fdata.append('title', title); // Assure-toi que 'title' est défini
  
      let url = 'https://linamahdi.alwaysdata.net/remove-favoris.php'; // Endpoint pour supprimer des favoris
      const response = await axios.post(url, fdata);
      const responseData = response.data;
      console.log(responseData);

      // Mettre à jour l'état local avec un nouvel objet contenant les états favoris mis à jour
      setFavoritedItems({ ...favoritedItems, [recipeId]: false });
    } catch (error) {
      console.error('Erreur lors de la suppression des favoris :', error);
    }
  };



  const handleFavorite = (recipeId) => {
    if (favoritedItems[recipeId]) {
      removeFromFavorites(recipeId);
      localStorage.removeItem(`favorited_${recipeId}`);
    } else {
      addToFavorites(recipeId);
      localStorage.setItem(`favorited_${recipeId}`, JSON.stringify(recipeId));
    }
  };



  return (
    <div className="col-sm mb-5 ml-8"> 
      <div className="card card-cascade card-ecommerce wider shadow mb-5 h-100 ms-5">
        <div className="view view-cascade overlay text-center">
          <img className="card-img-top" src={image} alt="" />
          <a>
            <div className="mask rgba-white-slight"></div>
          </a>
        </div>

        <div className="card-body card-body-cascade text-center">
          
          <p className="card-text">{title}</p>
          <br></br>
          <br></br>

          <div className="card-footer position-absolute bottom-0 start-0 end-0 bg-transparent ">
          <button className="btn bg-transparent" onClick={() => handleFavorite(id)}>
          <FontAwesomeIcon
                icon={isFavorited ? solidHeart : farHeart}
                color={isFavorited ? 'red' : 'black'}
              />            </button>
            <NavLink to={`/recette/${id}`}>
              <button className="btn btn-primary profile-button mt-3">Voir plus</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
