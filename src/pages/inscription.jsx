import React, { useState } from 'react';
import './inscription.css'
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef} from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
const Inscription1 = () => {
  const [nom, setName] = useState("");
  const [adressemail, setEmail] = useState("");
  const [mdp, setPassword] = useState("");
  const [error, setError] = React.useState("");
  const history= useHistory()
  const [captch, setCaptcha] = React.useState(null);
  const [utiliValide, setUtiValide] = React.useState(false);
  const captcha=useRef(null)



 
  function onChange(value) {
    if(captcha.current.getValue()){
      console.log('Vous netes pas un robot')
    }
    setCaptcha(true)
  }
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    if (nom.length === 0) {
      alert("Veuillez saisir votre nom ");
    } else if (adressemail.length === 0) {
      alert("Veuillez saisir votre adresse email");
    } else if (mdp.length === 0) {
      alert("Veuillez saisir un mot de passe");
    } else {
      const url = "https://linamahdi.alwaysdata.net/traitement.php";

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
         <div className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
          <img src={require('./../images/inscription.png')} alt='connexion' className="connexion"></img>

          </NavLink>
        </div> 
        </div> 

    <div className="registration-container">
        <div className="registration-image">
          <img src={require('./../images/4246.jpg')} alt='chef'></img>
        </div>
    <div className="registration-form">
    {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <h2>Bienvenue!</h2>
        <p>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</p> {/* Ajout de la phrase ici */}

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
        <br></br>
        <ReCAPTCHA className="ReCAPTCHA"
              ref={captcha}
               sitekey="6LfkGRIpAAAAAO6kWKjCehpjSd0ibRw62-7IpTki"
               onChange={onChange}/>
            <button type="submit" value="Register" onClick={handleSubmit}>
              S'inscrire
            </button>
      </form>
      
      <p>Vous avez déjà un compte? <a href="/connexion">Se connecter </a></p>
    </div>
    </div>
    </>
  );
};

export default Inscription1;
