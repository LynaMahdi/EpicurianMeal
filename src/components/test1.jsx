import React from 'react';
import './recette.css'


const Product1 = ({ name, price, image }) => {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>${price}</p>
    </div>
  );
};

export default Product1;
