import React, { useState } from 'react';
import './j.css'
const CC = () => {
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
    e.preventDefault();
    // la logique d'inscription
  };

  return (

    <>
   <div className="haut">

        <img src={require('./../images/inscription.png')} alt='connexion' className="connexion"></img>
        <div className="line"></div>

    </div>

    <div className="registration-container">
        <div className="registration-image">
          <img src={require('./../images/4246.jpg')} alt='chef'></img>
        </div>
    <div className="registration-form">
      <form onSubmit={handleSubmit}>
        <h2>Bienvenue!</h2>
        <p>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</p> {/* Ajout de la phrase ici */}

        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <p>Vous avez déjà un compte? <a href="/connexion">Se connecter </a></p>
    </div>
    </div>
    </>
  );
};

export default CC;
