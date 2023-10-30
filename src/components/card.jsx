import React from 'react';
import './trending.css'

const Product = ({image,title }) => {
  return (
    <div  className="contenu1">
      <img src={image} alt='plat'  />
      <div className="info">
           <h>{title}</h>
      </div>

    </div>
  );
};

export default Product;
