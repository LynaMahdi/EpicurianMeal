import React, { useEffect, useRef ,useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import './trending.css'; // Your custom CSS

function Trending() {
    const [populaire, setPopulaire] = useState([]);
    const ref = useRef();

    useEffect(() => {
        getTrending();
    }, []);

    const getTrending = async () => {
        const api = await fetch(
            'https://api.spoonacular.com/recipes/random?apiKey=821d2d6c62504983bf8d8dd394444d37&number=9'
        );
        const recette = await api.json();
        setPopulaire(recette.recipes);
    };

    return (
        <div>
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
                            <div className="contenu5">
                                <img src={recette.image} alt="plat" className="plat1" />
                                <div className="info1">
                                    <h>{recette.title}</h>
                                </div>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
}

export default Trending;
