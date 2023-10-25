import React, { useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import { useParams } from 'react-router-dom';
import './recette.css';
import { Splide } from '@splidejs/react-splide';

export default function ReCat() {
  const [categorie, setCategorie] = useState([]);
  const params = useParams();

  useEffect(() => {
    getCategorie(params.type, params.values);
  }, [params.type, params.values]);

  const getCategorie = async (type, values) => {
    try {
      let apiUrl = "";

      if (type === "diet") {
        apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=821d2d6c62504983bf8d8dd394444d37&diet=${values}`;
      } else if (type === "intolerance") {
        apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=821d2d6c62504983bf8d8dd394444d37&intolerances=${values}`;
      } else if (type === "cuisine") {
        apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=821d2d6c62504983bf8d8dd394444d37&cuisine=${values}`;
      } else {
        // Handle the default case here
        return;
      }

      const api = await fetch(apiUrl);
      const kitchen = await api.json();
      setCategorie(kitchen.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="c1">
      {categorie.map((recette) => (
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
  );
}
