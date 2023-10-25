import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.css";
import { FaSearch,FaHeart,FaUser } from "react-icons/fa";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
            <img src={require('./logo.png')} alt="logo" className="logo"/>  
			<nav ref={navRef}>
            
                <FaSearch className="icon-search"/>
                <input type="Search" placeholder="Recherche" className="Bar-recherche"/>
            <div className="a">
                <FaHeart className="fa" id="search-icon" />
				<a href="/#">Favoris</a>
            </div>
            <div className="a">
                <FaUser className="fa1" />
				<a href="/connexion">Connexion</a>
            </div>
				<button className="nav-btn nav-close-btn"  onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>

			
		</header>
	);
}

export default Navbar;