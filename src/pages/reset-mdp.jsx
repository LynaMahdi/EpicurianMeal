import React from "react";
import './connexion.css';
import axios from "axios";
import './inscription.css';

import { NavLink } from "react-router-dom";
import { useHistory ,useLocation} from "react-router-dom/cjs/react-router-dom.min";
function ResetMdp(){
    const history= useHistory()
    const [password, setPassword] = React.useState("");
    const [repassword, setRePassword] = React.useState("");
    const location = useLocation()
    const[responseData,setResponseData]=React.useState("");

    const handleSubmit = async (e) => {
        if (password.length === 0) {
            alert("Veuillez saisir votre adresse email ");
          }else if (repassword.length === 0) {
            alert("Veuillez saisir votre adresse email");
          }  else {
            const url = "https://linamahdi.alwaysdata.net/reset-mot-de-passe.php";
            const searchParams = new URLSearchParams(location.search);
            const verification = searchParams.get("verification");
            console.log({verification})
            let fdata = new FormData();
            fdata.append("password", password);
            fdata.append("repassword", repassword);
            fdata.append("verification",verification);
            try {
              const response = await axios.post(url, fdata);
              const m = response.data.trim();
              setResponseData(m)
              console.log(m);
              if (m === 'connexion') {
                history.push("/connexion");
              } 
            } catch (error) {
              alert(error);
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
                <p>Changez votre mot de passe pour découvrir toutes nos fonctionnalités.</p>
                {(responseData === 'code do not exist' || responseData==='Password and Confirm Password do not match') ? (
  <p3>{responseData}</p3>
):<p2>{responseData}</p2>}
                <div className="form-group">
                     <input name='password' type="password" placeholder="Entrez votre mot de passe" onChange={e => setPassword(e.target.value)}/>
                </div>

                <div className="form-group">
                     <input name='repassword' type="password" placeholder="Confirmez votre mot de passe" onChange={e => setRePassword(e.target.value)}/>
                </div>
                    
            </form>
            

              <button name="submit" type="submit" onClick={handleSubmit}>
              Reset Password
            </button>
            <br></br>
            
           <p>Revenir à la <a href="/connexion">connexion?</a></p>
          </div>

        </div>
      </>
    )
}

export default ResetMdp;
