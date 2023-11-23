import { useState } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    history.push(`/searched/${searchTerm}`);
  };

  return (
    <div className="recherche-bar">
            <input className="search-field" type="search" name="search" aria-label="Search recipes" placeholder="Recherchez les recettes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            <button className="search-submit" aria-label="Submit"  onClick={submitHandler}>
                <span>Rechercher</span>
            </button>
    </div>
  );
};


export default Search;
