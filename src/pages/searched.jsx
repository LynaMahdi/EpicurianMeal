import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Search from "../components/barsearch";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Product from "../components/card";
function Searched({user, updateUser}){
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const parmas = useParams();

  const getSearchedRecipes = async (search) => {
    const resp = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=23fb7cfb07dd46dfa99a286c28fa825c&query=${search}`);
    const data = await resp.json();
    console.log(data.results)
    return data.results;
  };

  console.log(searchedRecipes)
  useEffect(() => {
    let isMounted = true;
    console.log(parmas.search)
    getSearchedRecipes(parmas.search).then((data) => {
      if (isMounted) setSearchedRecipes(data);
    });

    return () => {
      isMounted = false;
    };
  }, [parmas.search]);


  
  return (
    <div className="Searchiiie">
        <Navbar user={user} updateUser={updateUser} />
        <br/>
        <div className="classBar">
            <Search/>
        </div>


<div className="product-list">
          {searchedRecipes.map((recipe) => (
            <Product id={recipe.id} image={recipe.image} title={recipe.title} />
          ))}
        </div>
      <Footer/>
    </div>
  );
};


export default Searched;
