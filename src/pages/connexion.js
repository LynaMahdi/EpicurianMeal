import React from "react";
import { NavLink as Link} from 'react-router-dom';
import './connexion.css';
import './j.css'
function Connexion(){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleSubmit = (e) =>{
        e.preventDefault();
    }

    return(
        <>
        <div className="haut">

            <img src={require('./../images/Frame 104.png')} alt='connexion' className="connexion"></img>

        </div>


        <div className="registration-container">
        <div className="registration-image">
          <img src={require('./../images/4246.jpg')} alt='chef'></img>
        </div>

            <div className="registration-form">
            <form onSubmit={handleSubmit} >
                <h2>Bienvenue!</h2>
                <p>Connectez-vous pour découvrir toutes nos fonctionnalités.</p>
                
                    <div className="form-group">

                     <input type="email" placeholder="Entrez votre email"  onChange={e => setEmail(e.target.value)}/>
                     </div>

                     <div className="form-group">
                     <input type="password" placeholder="Entrez votre mot de passe" onChange={e => setPassword(e.target.value)}/>
                     </div>
                     </form>
                     <h5>Mot de passe oublié</h5>
                     <button>Se connecter</button>
                     <br></br>
                     <button className="google-button" type="button">
            Se connecter avec Google
            <img src={require("./../images/download 1.png")} alt="Google" className="google" />
          </button>
        <p>Vous n'avez pas compte? <a href="/inscription">S'inscrire</a></p>
                  
                 </div>
                 
                


            </div>


        </>
    )
}

export default Connexion;