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
            const url = "localhost/reset-mot-de-passe.php";
            const searchParams = new URLSearchParams(location.search);
            const verification = searchParams.get("verification");
            let fdata = new FormData();
            fdata.append("password", password);
            fdata.append("repassword", repassword);
            fdata.append("verification",verification);
            try {
              const response = await axios.post(url, fdata);
              const m = response.data.trim();
              setResponseData(m)
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
                <p>Change your password to discover our fonctionnalities.</p>
                {(responseData === 'code do not exist' || responseData==='Password and Confirm Password do not match') ? (
  <p3>{responseData}</p3>
):<p2>{responseData}</p2>}
                <div className="form-group">
                     <input name='password' type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)}/>
                </div>

                <div className="form-group">
                     <input name='repassword' type="password" placeholder="Confirm your password" onChange={e => setRePassword(e.target.value)}/>
                </div>
                    
            </form>
            

              <button name="submit" type="submit" onClick={handleSubmit}>
              Reset Password
            </button>
            <br></br>
            
           <p>Return to <a href="/connexion">Login?</a></p>
          </div>

        </div>
      </>
    )
}

export default ResetMdp;
