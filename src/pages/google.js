import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // Import du useHistory
import { jwtDecode } from "jwt-decode";

export default function GoogleAuth({ user, updateUser }) {
  const history = useHistory(); // Initialisation de useHistory

  function handleCallback(res) {
    const user = jwtDecode(res.credential);
    console.log("JWT ID Token", user);
    updateUser(user);
    console.log({user})
    storeUserDataInSessionStorage(user);
    redirectToRecette(); 
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "356518142639-o9maap6kv0o00mqd1885mqpq8lmnemea.apps.googleusercontent.com",
      callback: handleCallback,
    });

    window.google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      width: "50px"
    
    });

    window.google.accounts.id.prompt();
  }, []);

  const handleSignOut = (e) => {
    updateUser({});
  };

  const redirectToRecette = () => {
    history.push("/recettes"); // Redirection vers la page recette
  };

  const storeUserDataInSessionStorage = (userData) => {
    sessionStorage.setItem('userEmail', JSON.stringify(userData));
    // Vous pouvez également stocker des éléments spécifiques de userData si nécessaire
  };

  return (
    <div className="App">

      <div id="signInDiv"></div>


    </div>
  );
}
