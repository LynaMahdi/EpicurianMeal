import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Product from './card';

function Carousel({ recipes }) {
  const settings = {

    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },

        {
          breakpoint: 786,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
  };

  return (
    <Slider {...settings}>

      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <Product
            id={recipe.id}
            image={recipe.image}
            title={recipe.title}
          />
        </div>
      ))}
      
    </Slider>
  );
}

export default Carousel;
