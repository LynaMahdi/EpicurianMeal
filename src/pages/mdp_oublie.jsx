import React from "react";
import './connexion.css';
import axios from "axios";
import './inscription.css';
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleAuth from "./google";
import { NavLink } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom/cjs/react-router-dom.min";
function Mdp({ user, updateUser }){
    const history= useHistory()
    const [email, setEmail] = React.useState("");
    const[responseData,setResponseData]=React.useState("");
    const captcha=useRef(null)

    const handleSubmit = async (e) => {
        if (email.length === 0) {
            alert("Veuillez saisir votre adresse email ");
          } else {
            const url = "https://linamahdi.alwaysdata.net/Mot-de-passe-oubie.php";
            console.log({email})
            let fdata = new FormData();
            fdata.append("email", email);
            try {
                const response = await axios.post(url, fdata);
                const m= response.data.trim()
                setResponseData(response.data.trim())
              console.log(responseData);
              if (m === "We've send a verification link on your email address.") {
                history.push("/Reset-Mot-de-passe-oublie");
              } 
            } catch (error) {
            }
          }
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
           
            <div className="registration-form">

            <form onSubmit={handleSubmit} >
                <h2>Bienvenue!</h2>
                <p>Connectez-vous pour découvrir toutes nos fonctionnalités.</p>
                {responseData}
                    <div className="form-group">
                     <input name='email' type="email" placeholder="Entrez votre email"  onChange={e => setEmail(e.target.value)}/>
                    </div>

                    
            </form>
            

              <button name="submit" type="submit" onClick={handleSubmit}>
              Envoyer le lien
            </button>
            <br></br>
            
           <p>Revenir à la <a href="/connexion">connexion?</a></p>
          </div>

        </div>
      </>
    )
}

export default Mdp;
