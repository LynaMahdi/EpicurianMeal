import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Product from './card';
import Carousel from './caroussel';
import '@splidejs/react-splide/css';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import './trending.css';

function French() {
    const [populaire, setPopulaire] = useState([]);
    const ref = useRef();

    useEffect(() => {
        getTrending();
    }, []);

    const getTrending = async () => {
        const apiKey='821d2d6c62504983bf8d8dd394444d37'
        const apikey2='0a99dc9c27874eb2af7712643ff4d1b8'
        const apiKey3='23fb7cfb07dd46dfa99a286c28fa825c'
        const apiKey4='3210da7ed0e5412fad84b8d8b8757610'

        const api = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey3}&cuisine=French`
        );
        const recette = await api.json();
        setPopulaire(recette.results);
    };

    const settings = {
      slidesToShow: 4,
      slidesToScroll: 1,
      style: {
        width: '98%', },
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            style: {
              width: '94%', 
              margin: '0 auto', 
            },
          },
        },
        {
          breakpoint: 786,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            style: {
              width: '94%', 
              margin: '0 auto', // Center the slider if needed
            },
          },
        },
      ],
    };
    
    return (
      <div className='container1'>
      <div >
        <img  src={require('./../images/Group 18132 (5).png')} alt="titre"  />  
      </div>
    <Slider {...settings}>

{populaire.map((recipe) => (
    <Product
      id={recipe.id}
      image={recipe.image}
      title={recipe.title}
    />
))}

</Slider>  
    </div>
    );
}

export default French;
