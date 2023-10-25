import React, { useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import './recette.css';
import styled from "styled-components";
import { Splide } from '@splidejs/react-splide';

function Recette() {
  const [cuisine, setCuisine] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  useEffect(() => {
    getCuisine();
  }, []);

  const getCuisine = async () => {
    try {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=821d2d6c62504983bf8d8dd394444d37&number=36`);
      const kitchen = await api.json();
      setCuisine(kitchen.recipes);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Ensure cuisine is not undefined before slicing
  const currentRecipes = cuisine ? cuisine.slice((currentPage - 1) * recipesPerPage, currentPage * recipesPerPage) : [];

  const pageNumbers = [];
  const pageCount = Math.ceil((cuisine?.length || 0) / recipesPerPage);

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="c1">
        {currentRecipes.map((recette) => (
          <Splide
            key={recette.id}
            options={{
              type: 'loop',
              arrows: false,
              height: '14rem',
              perPage: 2,
              perMove: 1,
              grid: {
                dimensions: [[1, 1], [2, 2], [2, 1], [1, 2], [2, 2], [3, 2]],
                gap: {
                  row: '6px',
                  col: '1px',
                },
              },
              breakpoints: {
                640: {
                  height: '8rem',
                  perPage: 1,
                  grid: {
                    dimensions: [[2, 2], [1, 1], [2, 1], [1, 2], [2, 2]],
                  },
                },
              }
            }}
          >
            <div className="contenu1">
              <img src={recette.image} alt="plat" className="plat"></img>
              <div className="info">
                <h>{recette.title}</h>
              </div>
            </div>
          </Splide>
        ))}
      </div>
      <div className="pagination-controls">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Recette;
