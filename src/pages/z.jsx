import React from 'react';
import './home.css';
import ReCat from '../components/recette_categorie';
function Grid() {
  return (
    <div className="grid-container">

      <ReCat></ReCat>

    </div>
  );
}

function GridItem({ children }) {
  return <div className="grid-item">{children}</div>;
}

export default Grid;
