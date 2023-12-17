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

      if (email.length === 0) {
        alert("Veuillez saisir votre email ");
      } else if (password.length === 0) {
        alert("Veuillez saisir votre password");
      } else {
        const url = "localhost/connexion.php";
        const searchParams = new URLSearchParams(location.search);
        const verification = searchParams.get("verification");
        let fdata = new FormData();
        fdata.append("email", email);
        fdata.append("password", password);
        fdata.append("verification",verification);
        try {
          const response = await axios.post(url, fdata, {
            withCredentials: true  
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
          <img 
          src={require('./../images/Frame 104 (3).png')}
           alt='connexion' 
           className="connexion">
           </img>

          </NavLink>
        </div> 
        </div> 
        <div className="registration-container">
        <div className="registration-image">
          <img src={require('./../images/4246.jpg')} alt='chef'></img>
        </div>
           
            <div className="registration-form">

            <form>
            <h2>Welcome!</h2>
            <p>Log in to discover all our features.</p>
            {responseData === 'Email or password do not match.' || responseData === 'First verify your account and try again.' ? (
              <p3>{responseData}</p3>
            ) : (
              <p2>{responseData}</p2>
            )}
            <div className="form-group">
              <input name="email" type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <input name="password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            
          <a href="/Mot-de-passe-oublie"><h5>Forgot Password</h5></a>
          <br></br>

          <ReCAPTCHA
              className="ReCAPTCHA"
              ref={captcha}
              sitekey="6LfkGRIpAAAAAO6kWKjCehpjSd0ibRw62-7IpTki"
              onChange={onChange}
            />
           <button type="submit" onClick={handleSubmit}>
              Log In
            </button>

          </form>

          <br></br>
          <br></br>

          <div className="google-button">
            <GoogleAuth user={user} updateUser={updateUser} />
          </div>
          <p1>Don't have an account? <a href="/inscription">Sign Up</a></p1>
          </div>


        </div>
      </>
    )
}

export default Connexion;
