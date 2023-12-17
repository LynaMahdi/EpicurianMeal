import React, { useState } from "react";
import "./inscription.css";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
const Inscription1 = () => {
  const [nom, setName] = useState("");
  const [adressemail, setEmail] = useState("");
  const [mdp, setPassword] = useState("");
  const [error, setError] = React.useState("");
  const history = useHistory();
  const [captch, setCaptcha] = React.useState(null);
  const [utiliValide, setUtiValide] = React.useState(false);
  const [validationErrors, setValidationErrors] = useState({
    nom: "",
    email: "",
    password: "",
  });
  const captcha = useRef(null);
 const [responseData,setResposeData]=useState("")
  function onChange(value) {
    if (captcha.current.getValue()) {
      console.log("Vous netes pas un robot");
    }
    setCaptcha(true);
  }



  const checkMailAvailability = async () => {
    try {
      const response = await axios.post("https://linamahdi.alwaysdata.net/checkEmail.php", {
        email: adressemail,
      });

      console.log(response.data);

      if (!response.data.available) {
        // If the email exists, display an error message
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          email: "L'e-mail est déjà utilisé.",
        }));
      } else if (response.data.error) {
        // Handle server errors
        setError(response.data.error);
      } else {
        // If the email is available, clear any previous error message
        setValidationErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'e-mail:", error);
      // Handle other errors if necessary
    }
  };

  const validateEmail = async () => {
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(adressemail)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        email: "Le format de l'e-mail n'est pas respecté.",
      }));
    } else {
      await checkMailAvailability();
    }
  };

  const validateNom = () => {
    if (!/^[a-zA-Z]+$/.test(nom)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        nom: "The Username is invalid.",
      }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, nom: "" }));
    }
  };

  const validatePassword = () => {
    // Au moins 8 caractères, une majuscule, une minuscule et un chiffre
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(mdp)) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password:
        "The password must contain at least 8 characters, an uppercase letter, a lowercase letter and a number.",
      }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();

   // Validate inputs
    validateNom();
    validateEmail();
    validatePassword();

    // Check if there are any validation errors
    if (
      validationErrors.nom ||
      validationErrors.email ||
      validationErrors.password
    ) {
      // Handle validation errors, e.g., display error messages
      return;
    }
    if (nom.length === 0) {
      alert("Please enter your Username");
    } else if (adressemail.length === 0) {
      alert("Please enter your Email Address");
    } else if (mdp.length === 0) {
      alert("Please enter your Password");
    } else {
      const url = "localhost/traitement.php";

      let fdata = new FormData();
      fdata.append("nom", nom);
      fdata.append("adressemail", adressemail);
      fdata.append("mdp", mdp);
      try {
        const response = await axios.post(url, fdata);
        setResposeData(response.data.trim());
      } catch (error) {
      }
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="nav-container">
          <NavLink exact to="/inscription" className="nav-logo">
            <img
              src={require("./../images/Frame 104 (2).png")}
              alt="connexion"
              className="connexion"
            ></img>
          </NavLink>
        </div>
      </div>

      <div className="registration-container">
        <div className="registration-image">
          <img src={require("./../images/4246.jpg")} alt="chef"></img>
        </div>
        <div className="registration-form">



          {error && <p className="error-message">{error}</p>}




          <form onSubmit={handleSubmit}>
            <h2>Welcome!</h2>
            <p> Sign up to discover all our features.  </p>
            {(responseData === "We've send a verification link on your email address." ) ? (
              <p2>{responseData}</p2>
            ):<p3>{responseData}</p3>}
            {/* Ajout de la phrase ici */}
            <div className="form-group">
              <input
                type="text"
                name="nom"
                placeholder="Username"
                value={nom}
                onChange={(e) => setName(e.target.value)}
                onBlur={validateNom}

              />
              {validationErrors.nom && (
                <p className="validation-error">{validationErrors.nom}</p>
              )}
            </div>
            <div className="form-group">
              <input
                type="email"
                name="adresseemail"
                placeholder="Email Address"
                value={adressemail}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}

              />
               {validationErrors.email && (
                <p className="validation-error">{validationErrors.email}</p>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="mdp"
                placeholder="Password"
                value={mdp}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}

              />
               {validationErrors.password && (
                <p className="validation-error">{validationErrors.password}</p>
              )}
            </div>
            <br></br>
            <ReCAPTCHA
              className="ReCAPTCHA"
              ref={captcha}
              sitekey="6LfkGRIpAAAAAO6kWKjCehpjSd0ibRw62-7IpTki"
              onChange={onChange}
            />
            <button  type="submit" name="submit" value="Register" onClick={handleSubmit}>
              Register
            </button>
          </form>
            <br></br>
            <br></br>
          <p>
            Already have an account? <a href="/connexion">Log in </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Inscription1;
