import React from "react";
import "./footer.css";
import logo from "./logo.png"; // Import your logo image

function Footer() {
  return (
    <div className="footer">
      <div className="coté">
        <img src={logo} alt="logo" className="f" />
        <p>
          Cook is a recipe website with a wide variety of delicious recipes,<br/>
          easy-to-use search function. Join our community and let's cook
          together!
        </p>
      </div>

      <div className="coté">
        <h3>Company</h3>
        <ul>Home</ul>
        <ul>Explore</ul>
        <ul>Favorites</ul> {/* Corrected the spelling here */}
      </div>

      <div className="coté">
        <img src={logo} alt="logo" className="f" />
        <input placeholder="Entrez votre email" className="email" />
        <button className="subscribe">Subscribe</button>
      </div>
    </div>
  );
}

export default Footer;
