import React, { useState, useRef,useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '../components/trending.css'; 
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

const initialItems = Array.apply(null, Array(6)).map(
  (value, index) => index + 1
);

export default function Cc() {
  const [populaire, setPopulaire] = useState([]);

  const ref = useRef();
  const [items, setItems] = useState(initialItems);
  function addItems() {
    setItems(items => [...items, items.length + 1]);
  }
  function resetItems() {
    setItems(initialItems);
  }
  function goToLastSlide() {
    ref.current.splide.go(ref.current.splide.length - 1);
  }
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
    <>
     
      <hr />
      <Splide
        ref={ref}
        options={{
          rewind: false,
          perPage: 5,
          perMove: 5,
          gap: 10,
          padding: "3rem",
          pagination: false,
          breakpoints: {
            623: {
              perPage: 1            
            },
            935: {
              perPage: 1
            },
            1247: {
              perPage: 1
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
        }}
      >
        
                    {populaire.map((recette) => (
                        <SplideSlide key={recette.id} className="slide">
                            <div className="contenu1">
                                <img src={recette.image} alt="plat" className="plat" />
                                <div className="info">
                                    <h>{recette.title}</h>
                                </div>
                            </div>
                        </SplideSlide>
                    ))}
      </Splide>
    </>
  );
}
