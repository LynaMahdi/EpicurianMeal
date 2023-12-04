import React from "react";
import "./footer.css";
import logo from "./../images/logo.png"; // Import your logo image

function Footer() {
  return (
    <div className="Boox"> {/* Utilisez la classe CSS Boox */}
   

      <div className="FooterContainer"> {/* Utilisez la classe CSS FooterContainer */}
                <div className="Row"> {/* Utilisez la classe CSS Row */}

                <div className="widerColumn"> {/* Utilisez la classe CSS Column */}
                        <a className="FooterLink" href="#"> {/* Utilisez la classe CSS FooterLink */}
                             <img src={logo} alt="logo" className="f" />
                              <br/>
                              Epicurean Meal is a recipe website with a wide variety of delicious recipes,
                              easy-to-use search function. Join our community and let's cook
                              together!
                        </a>
                      
                    </div>

                    <div className="Column"> {/* Utilisez la classe CSS Column */}
                        <p className="Heading">About Us</p> {/* Utilisez la classe CSS Heading */}
                        <a className="FooterLink" href="#"> {/* Utilisez la classe CSS FooterLink */}
                            Team
                        </a>
                        <a className="FooterLink" href="/"> {/* Utilisez la classe CSS FooterLink */}
                            Vision
                        </a>
                        
                    </div>
                   
                    <div className="Column"> {/* Utilisez la classe CSS Column */}
                        <p className="Heading">Services</p> {/* Utilisez la classe CSS Heading */}
                        <a className="FooterLink" href="#"> {/* Utilisez la classe CSS FooterLink */}
                            See all recipes
                        </a>
                        <a className="FooterLink" href="#"> {/* Utilisez la classe CSS FooterLink */}
                            Favorites
                        </a>

                    </div>
                   
                </div>
            </div>

     
    </div>
  );
}

export default Footer;
