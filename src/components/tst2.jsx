import React,{useEffect,useState} from 'react';
import './filter.css'
import Product from './card';
const ProductList = ({ products }) => {
const [categorie, setCategorie] = useState([]);

  useEffect(() => {
    getCategorie();
  }, []);

  const getCategorie = async () => {
    try {

    const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=0a99dc9c27874eb2af7712643ff4d1b8&number=36`;


      const api = await fetch(apiUrl);
      const kitchen = await api.json();
      setCategorie(kitchen.recipes);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  return (
    <div className="product-list">
      {categorie.map((product) => (
        <Product
          image={product.image}
          title={product.title}
        />
      ))}
    </div>
  );
};

export default ProductList;
