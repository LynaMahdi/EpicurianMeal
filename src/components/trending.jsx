import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide';
// Default theme
import '@splidejs/react-splide/css';
import './trending.css'

// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';

import {Grid} from'@splidejs/splide-extension-grid';
// or only core styles
import '@splidejs/react-splide/css/core';




function Trending() {
    const [populaire,setPopulaire]=useState([])
    useEffect(()=>{

        getTrending();
    },[])
    const getTrending=async()=>{
        const api=await fetch(`https://api.spoonacular.com/recipes/random?apiKey=821d2d6c62504983bf8d8dd394444d37&number=9`);
        const recette=await api.json();
        setPopulaire(recette.recipes);
        console.log(recette.recipes)
    }


    
  return (
    <div>
       <wrapper>
                    <Splide options={{ perPage: 4, breakpoints: {
      640: {
        perPage: 4, // Réduire à 1 élément par page lorsque la largeur de l'écran est inférieure à 768px
      },
      
    },grid       : {
    // You can define rows/cols instead of dimensions.
    dimensions: [ [ 1, 1 ], [ 2, 2 ], [ 2, 1 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ] ],
    gap: {
      row: '6px',
      col: '6px',
    },
  },arrows: false,pagination: false, drag: 'free', gap: "5rem"}}>
                    {populaire.map((recette) => {
                        return(
                            <SplideSlide>
                            <div className="contenu1">
                              <img src={recette.image} alt="plat"  className="plat"></img>
                              <div className="info">
                                   <h>{recette.title}</h>   
                              </div>
                             </div>
                            </SplideSlide>
                        );
                    })}
                    </Splide>
        </wrapper>            
    </div>  )
}




export default Trending