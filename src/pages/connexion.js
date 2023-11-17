import React from "react";
import './connexion.css';
import './inscription.css';
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleAuth from "./google";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function Connexion({ user, updateUser }){
    const history= useHistory()
    const [captch, setCaptcha] = React.useState(null);
    const [utiliValide, setUtiValide] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const captcha=useRef(null)


    const handleSubmit = (e) => {
      e.preventDefault();
      if(captcha.current.getValue()){
        console.log('Vous netes pas un robot')
        setUtiValide(true)
      }else{
        console.log("acceptez le catcha")
        setUtiValide(false)
      }
      history.push("/recettes"); 

    };
   
    function onChange(value) {
      if(captcha.current.getValue()){
        console.log('Vous netes pas un robot')
      }
      setCaptcha(true)
    }
    
    return(
        <>
         
        <div className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
          <img src={require('./../images/Frame 104.png')} alt='connexion' className="connexion"></img>

          </NavLink>
        </div> 
        </div> 
        <div className="registration-container">
        <div className="registration-image">
          <img src={require('./../images/4246.jpg')} alt='chef'></img>
        </div>
            {!utiliValide &&
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
            <ReCAPTCHA className="ReCAPTCHA"
              ref={captcha}
               sitekey="6LfkGRIpAAAAAO6kWKjCehpjSd0ibRw62-7IpTki"
               onChange={onChange}/>

              <button type="submit" value="Register" onClick={handleSubmit}>
              Se connecter
            </button>
            <br></br>
            <div className="google-button">
              <GoogleAuth  user={user} updateUser={updateUser}/>      
            </div>
           <p1>Vous n'avez pas de compte? <a href="/inscription">S'inscrire</a></p1>
          </div>
}
        </div>
      </>
    )
}

export default Connexion;
