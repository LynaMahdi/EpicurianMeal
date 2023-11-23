// FilterZ.js
import React, { useState, useEffect } from "react";
import Filter from "./tabFiltres";
import Product from "./card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons"; // Import the filter icon
import { fetchRecipes } from './api'; // Import the fetchRecipes function


function FilterZ() {
  const [Cuisine, setCuisine] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState({
    dairyFree: false,
    glutenFree: false,
    eggFree: false,
    sugarFree: false,
    vegetarian: false,
  });

  const [allergies, setAllergies] = useState({
    peanut: false,
    gluten: false,
    wheat: false,
    nuts: false,
    sesame: false,
  });

  const [filteredData, setFilteredData] = useState([]);

  const handleDietaryPreferenceChange = (preference) => {
    setDietaryPreferences({
      ...dietaryPreferences,
      [preference]: !dietaryPreferences[preference],
    });
  };

  const handleAllergiesChange = (allergy) => {
    setAllergies({
      ...allergies,
      [allergy]: !allergies[allergy],
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecipes({ cuisine: Cuisine, dietaryPreferences, allergies });
      setFilteredData(data);
    };

    fetchData();
  }, [Cuisine, dietaryPreferences, allergies]);



  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
    <div className="tout">
    <div className="grid">

      <div className={`tout1 ${showSidebar ? 'sidebar-open' : ''}`}>
        <div className="sidebar-button" onClick={() => toggleSidebar()}>
          <FontAwesomeIcon icon={faFilter} />
        </div>
        <Filter
          dietaryPreferences={dietaryPreferences}
          allergies={allergies}
          Cuisine={Cuisine}
          handleDietaryPreferenceChange={handleDietaryPreferenceChange}
          handleAllergiesChange={handleAllergiesChange}
          setCuisine={setCuisine}
        />
        </div>
        <div className="grid">
        <div className="product-list">
          {filteredData.map((recipe) => (
            <Product id={recipe.id} image={recipe.image} title={recipe.title} />
          ))}
        </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default FilterZ;
