import React, { useState } from "react";
import axios from "axios";
import './j.css'
function Inscription() {
  const [nom, setName] = useState("");
  const [adressemail, setEmail] = useState("");
  const [mdp, setPassword] = useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    if (nom.length === 0) {
      alert("Veuillez saisir votre nom ");
    } else if (adressemail.length === 0) {
      alert("Veuillez saisir votre adresse email");
    } else if (mdp.length === 0) {
      alert("Veuillez saisir un mot de passe");
    } else {
      const url = "./traitement.php";

      let fdata = new FormData();
      fdata.append("nom", nom);
      fdata.append("adressemail", adressemail);
      fdata.append("mdp", mdp);
      axios
        .post(url, fdata)
        .then((response) => alert(response.data))
        .catch((error) => alert(error));
    }
  };

  return (
    <>
      <div className="haut">
        <img
          src={require("./../images/inscription.png")}
          alt="connexion"
          className="connexion"
        />
        <div className="line"></div>
      </div>

      <div className="registration-container">
        <div className="registration-image">
          <img src={require("./../images/4246.jpg")} alt="chef" />
        </div>
        <div className="registration-form">
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <h2>Bienvenue!</h2>
            <p>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</p>
            <div className="form-group">
              <input
                type="text"
                name="nom"
                placeholder="Nom d'utilisateur"
                value={nom}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="adressemail"
                placeholder="Adresse email"
                value={adressemail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="mdp"
                placeholder="Mot de passe"
                value={mdp}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" value="Register" onClick={handleSubmit}>
              S'inscrire
            </button>
          </form>
          <p>
            Vous avez déjà un compte? <a href="/connexion">Se connecter </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Inscription;
