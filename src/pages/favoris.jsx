import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import Product from "../components/card";
import Footer from "../components/footer";
import { useHistory } from "react-router-dom";

function Favoris({ user, updateUser }) {
    const [favoris, setFavoris] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetchFavoris();
    }, []);

    const fetchFavoris = async () => {
      try {
          const userEmail =sessionStorage.getItem('userEmail');
          const response = await axios.get(`localhost/recup-favoris.php?userEmail=${userEmail}`);
          console.log(response.data);
          setFavoris(response.data);
      } catch (error) {
          console.error('Erreur lors de la récupération des favoris :', error);
      }
  };
  
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
          <br></br>
          <img className="Fav" src={require('./../images/Frame 138 (3).png')} alt='favoris' />


          <br></br>
        <div className="product-list">
                {Array.isArray(favoris) ? (
                        favoris.map((favori, index) => (
                            <Product id={favori.Idrecette} image={favori.image_favorie} title={favori.titre_favorie} />
                        ))
                    ) : (
                        <p>Aucun favori trouvé ou une erreur est survenue</p>
                    )}
            </div>
        <Footer/>
    </div>

       
    );
};

export default Favoris;
