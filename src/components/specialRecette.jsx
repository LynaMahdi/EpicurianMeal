import React, { useEffect, useRef ,useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import './trending.css';
import Product from './card';
function French() {
    const [populaire, setPopulaire] = useState([]);
    const ref = useRef();

    useEffect(() => {
        getTrending();
    }, []);

    const getTrending = async () => {
        const apiKey='821d2d6c62504983bf8d8dd394444d37'
        const apikey2='0a99dc9c27874eb2af7712643ff4d1b8'
        const api = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey2}&cuisine=American`
        );
        const recette = await api.json();
        setPopulaire(recette.results);
    };

    return (
        <div className='container1'>
          <div className='populaire'>
            <img  src={require('./../images/Group 18132 (2).png')} alt="titre"  />  
          </div>
        <div className="wrapper">
                <Splide  ref={ref}
  options={{
    rewind: false,
    perPage: 5,
    perMove: 5,
    gap: 320,
    padding: "2rem",
    pagination: false,
    breakpoints: {
        623: {
          perPage: 2,
          perMove: 2
        },
        935: {
          perPage: 3,
          perMove: 3
        },
        1247: {
          perPage: 4,
          perMove: 4
        }
      }
  }}
        onMounted={() => {
          console.log("mounted");
        }}
        onUpdated={() => {
          console.log("updated");
        }}
        onMoved={() => {
          console.log("moved");
        }}
        onVisible={(splide, slide) => {
          console.log("visible", slide.index);
        }}>
                     {populaire.map((recette) => (
                        <SplideSlide key={recette.id} className="slide">
                                        <Product id={recette.id} image={recette.image} title={recette.title} />

                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
}

export default French;
