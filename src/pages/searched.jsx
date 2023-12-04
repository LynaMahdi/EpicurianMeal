import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Search from "../components/barsearch";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Product from "../components/card";
import { useHistory } from "react-router-dom";
function Searched({user, updateUser}){
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const parmas = useParams();
  const history = useHistory();

  const getSearchedRecipes = async (search) => {
    const resp = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=821d2d6c62504983bf8d8dd394444d37&query=${search}`);
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
  const checkSession = () => {
    // Retrieve the stored value from sessionStorage
    const userEmail = sessionStorage.getItem('userEmail');
    console.log(userEmail)

    if (userEmail==null) {
      history.push('/connexion')
    } 
  };
  
  useEffect(() => {
    checkSession();
  }, []);

  
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
