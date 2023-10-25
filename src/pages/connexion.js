import React from "react";
import { NavLink as Link} from 'react-router-dom';
import './connexion.css';


function Connexion(){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleSubmit = (e) =>{
        e.preventDefault();
    }

    return(
        <>
        <div className="haut">

            <img src={require('./../components/logo.png')} alt='logo' className="logoC"></img>
            <img src={require('./../images/Frame 104.png')} alt='connexion' className="connexion"></img>
            <div className="line"></div>

        </div>


        <div>
           <img src={require('./../images/4246.jpg')} alt='chef' className="chef" ></img>

            <div className="Box-Connexion">
                <h3>Bienvenue!</h3>
                <h7>Connectez-vous pour découvrir toutes nos fonctionnalités.</h7>
                 <div className="formulaire">
                    <form onSubmit={handleSubmit} >
                    <div className="partie">
                     <label>Email</label>
                     <input type="email" placeholder="Entrez votre email" className="email1"  onChange={e => setEmail(e.target.value)}/>
                     </div>

                     <div className="partie">
                     <label>Mot de passe</label>
                     <input type="password" placeholder="Entrez votre mot de passe" className="email1" onChange={e => setPassword(e.target.value)}/>
                     </div>
                     </form>
                     <h5>Mot de passe oublié</h5>
                     <button className="seConnecter">Se connecter</button>
                     <button className="seConnecter"  style={{ backgroundColor:`white`}}>
                        Se connecter avec Google
                        <img src={require("./../images/download 1.png")} alt="ggl" className="google"></img>
                     </button>


                     <label style={{top: `420px`, left: `165px`}}>Vous n'avez pas de compte ? </label>
                     <a href='/inscription' activeStyle={{ color: 'red' }}><label style={{top: `420px`, left: `365px`, color: `#F27054`}}>Insrivez-vous</label></a>
                 </div>
                 
                


            </div>

        </div>

        </>
    )
}

export default Connexion;