import React from "react";
import './connexion.css';
import axios from "axios";
import './inscription.css';
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleAuth from "./google";
import { NavLink } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom/cjs/react-router-dom.min";
function Connexion({ user, updateUser }){

  
    const history= useHistory()
    const [captch, setCaptcha] = React.useState(null);
    const[responseData,setresponseData]=React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const captcha=useRef(null)
    const location = useLocation()



    const handleSubmit = async (e) => {
      e.preventDefault();
     {/* if(captcha.current.getValue()){
        console.log('Vous netes pas un robot')
        setUtiValide(true)
      }else{
        console.log("acceptez le catcha")
        setUtiValide(false)
      }*/}
      if (email.length === 0) {
        alert("Veuillez saisir votre nom ");
      } else if (password.length === 0) {
        alert("Veuillez saisir votre adresse email");
      } else {
        const url = "https://linamahdi.alwaysdata.net/connexion.php";
        const searchParams = new URLSearchParams(location.search);
        const verification = searchParams.get("verification");
        let fdata = new FormData();
        fdata.append("email", email);
        fdata.append("password", password);
        fdata.append("verification",verification);
        try {
          const response = await axios.post(url, fdata, {
            withCredentials: true  // Indique au navigateur d'envoyer les cookies de session
          });
          const responseData = response.data;
          console.log(responseData)
          if (responseData.message === 'bienvenue') {
            sessionStorage.setItem('userEmail', email);
            console.log(sessionStorage)
            history.push("/recettes"); // Rediriger vers la page des recettes
          } else {
            setresponseData(responseData.message);
          }
        } catch (error) {
          console.error('Erreur lors de la requête:', error);
        }
      }

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
          <NavLink exact to="/connexion" className="nav-logo">
          <img src={require('./../images/Frame 104.png')} alt='connexion' className="connexion"></img>

          </NavLink>
        </div> 
        </div> 
        <div className="registration-container">
        <div className="registration-image">
          <img src={require('./../images/4246.jpg')} alt='chef'></img>
        </div>
           
            <div className="registration-form">

            <form onSubmit={handleSubmit} >
                <h2>Bienvenue!</h2>
                      
                <p>Connectez-vous pour découvrir toutes nos fonctionnalités.</p>
                {(responseData === 'Email or password do not match.' || responseData==='First verify your account and try again.') ? (
  <p3>{responseData}</p3>
):<p2>{responseData}</p2>}
                    <div className="form-group">
                     <input name='email' type="email" placeholder="Entrez votre email"  onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="form-group">
                     <input name='password' type="password" placeholder="Entrez votre mot de passe" onChange={e => setPassword(e.target.value)}/>
                    </div>
            </form>
            <a href="/Mot-de-passe-oublie"><h5>Mot de passe oublié</h5></a>
          {/*  <ReCAPTCHA className="ReCAPTCHA"
              ref={captcha}
               sitekey="6LfkGRIpAAAAAO6kWKjCehpjSd0ibRw62-7IpTki"
                onChange={onChange}/>*/}
              <button name="submit" type="submit" onClick={handleSubmit}>
              Se connecter
            </button>
            <br></br>
            <br></br>

            <div className="google-button">
              <GoogleAuth   user={user} updateUser={updateUser}/>      
            </div>
           <p1>Vous n'avez pas de compte? <a href="/inscription">S'inscrire</a></p1>
          </div>

        </div>
      </>
    )
}

export default Connexion;
