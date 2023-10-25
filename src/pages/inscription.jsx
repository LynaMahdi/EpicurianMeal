import React from "react";
import { NavLink as Link} from 'react-router-dom';
import './inscription.css';


function Inscription(){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [prenom, setPrenom] = React.useState("");

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
                <h7>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</h7>
                 <div className="formulaire">
                    <form onSubmit={handleSubmit} >
                    <div className="partie">
                     <label>Nom</label>
                     <input type="text" placeholder="Entrez votre nom" className="email1"  onChange={e => setName(e.target.value)}/>
                     </div>
                     <div className="partie">
                     <label>Nom d'utîlisateur</label>
                     <input type="text" placeholder="Entrez votre nom d'utilisateur" className="email1"  onChange={e => setPrenom(e.target.value)}/>
                     </div>
                    <div className="partie">
                     <label>Email</label>
                     <input type="email" placeholder="Entrez votre email" className="email1"  onChange={e => setEmail(e.target.value)}/>
                     </div>

                     <div className="partie">
                     <label>Mot de passe</label>
                     <input type="password" placeholder="Entrez votre mot de passe" className="email1" onChange={e => setPassword(e.target.value)}/>
                     </div>
                     <button className="button" type="submit" >S'inscrire</button>
                     </form>
                     <div className="link-btn" >Vous avez déjà un compte?<a  href='/connexion' className="link-btn" style={{bottom: `0px`, left: `190px`, color: `#F27054`}}>Se connecter</a > </div>
                 </div>
                 
                


            </div>

        </div>

        </>
    )
}

export default Inscription;