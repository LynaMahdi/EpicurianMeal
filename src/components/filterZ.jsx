import React, { useState, useEffect } from "react";
import './filter.css';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { InputLabel } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Splide } from '@splidejs/react-splide';
import Pagination from '@mui/material/Pagination';



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
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9;
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
            // Construct the URL based on selected filters
            const apiKey = '821d2d6c62504983bf8d8dd394444d37';
            const dietaryFilters = Object.keys(dietaryPreferences).filter((preference) => dietaryPreferences[preference]);
            const allergyFilters = Object.keys(allergies).filter((allergy) => allergies[allergy]);
            const cuisineFilter = Cuisine !== '' ? `&cuisine=${Cuisine}` : '';
            const dietFilter = dietaryFilters.length > 0 ? `&diet=${dietaryFilters.join(',')}` : '';
            const allergyFilter = allergyFilters.length > 0 ? `&intolerances=${allergyFilters.join(',')}` : '';

            let apiUrl;

            if(cuisineFilter=="" && dietFilter=="" && allergyFilter==""){
                apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=821d2d6c62504983bf8d8dd394444d37&number=36`;
                try {
                    const response = await fetch(apiUrl);
                    if (!response.ok) {
                        throw new Error('Network response not ok');
                    }
                    const data = await response.json();
                    setFilteredData(data.recipes);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }else{
                apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}${cuisineFilter}${dietFilter}${allergyFilter}`;
                try {
                    const response = await fetch(apiUrl);
                    if (!response.ok) {
                        throw new Error('Network response not ok');
                    }
                    const data = await response.json();
                    setFilteredData(data.results);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
           
            console.log(apiUrl);
        };

        fetchData();


    }, [Cuisine, dietaryPreferences, allergies]);

      // Ensure cuisine is not undefined before slicing
  const currentRecipes = filteredData ? filteredData.slice((currentPage - 1) * recipesPerPage, currentPage * recipesPerPage) : [];

  const pageNumbers = [];
  const pageCount = Math.ceil((filteredData?.length || 0) / recipesPerPage);

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

    return (
        <div className="tout">
            <>
            <div className="TabFiltres">
                <h1>Filtres</h1>
                <div className="groups">
                    <h9>Régimes</h9>
                    <FormGroup className="FormGroup">
                        <FormControlLabel control={<Checkbox />}
                            label="sans produits laitiers"
                            checked={dietaryPreferences.dairyFree}
                            onChange={() => handleDietaryPreferenceChange('dairyFree')}
                        />
                    </FormGroup>
                    <FormGroup className="FormGroup">
                        <FormControlLabel control={<Checkbox />}
                            label="Sans Gluten"
                            checked={dietaryPreferences.glutenFree}
                            onChange={() => handleDietaryPreferenceChange('glutenFree')}
                        />
                    </FormGroup>
                    <FormGroup className="FormGroup">
                        <FormControlLabel control={<Checkbox />}
                            label="Sans oeufs"
                            checked={dietaryPreferences.eggFree}
                            onChange={() => handleDietaryPreferenceChange('eggFree')}
                        />
                    </FormGroup>
                    <FormGroup className="FormGroup">
                        <FormControlLabel control={<Checkbox />}
                            label="Sans sucre"
                            checked={dietaryPreferences.sugarFree}
                            onChange={() => handleDietaryPreferenceChange('sugarFree')}
                        />
                    </FormGroup>
                    <FormGroup className="FormGroup">
                        <FormControlLabel control={<Checkbox />}
                            label="Végétarien"
                            checked={dietaryPreferences.vegetarian}
                            onChange={() => handleDietaryPreferenceChange('vegetarian')}
                        />
                    </FormGroup>
                </div>

                <div className="groups">
                    <h9>Allergies</h9>
                    <FormGroup className="FormGroup">
                        <FormControlLabel control={<Checkbox />}
                            label="Arachide"
                            checked={allergies.peanut}
                            onChange={() => handleAllergiesChange('peanut')}
                        />
                    </FormGroup>
                    <FormGroup className="FormGroup">
                        <FormControlLabel control={<Checkbox />}
                            label="Gluten"
                            checked={allergies.gluten}
                            onChange={() => handleAllergiesChange('gluten')}
                        />
                    </FormGroup>
                    <FormGroup className="FormGroup">
                        <FormControlLabel control={<Checkbox />}
                            label="Blé"
                            checked={allergies.wheat}
                            onChange={() => handleAllergiesChange('wheat')}
                        />
                    </FormGroup>
                    <FormGroup className="FormGroup">
                        <FormControlLabel control={<Checkbox />}
                            label="Noix"
                            checked={allergies.nuts}
                            onChange={() => handleAllergiesChange('nuts')}
                        />
                    </FormGroup>
                    <FormGroup className="FormGroup">
                        <FormControlLabel control={<Checkbox />}
                            label="Sésame"
                            checked={allergies.sesame}
                            onChange={() => handleAllergiesChange('sesame')}
                        />
                    </FormGroup>
                </div>

                <div className="groups">
                    <h9>Cuisine</h9>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className="FormControl">
                        <InputLabel className="InputLabel" id="demo-simple-select-standard-label">Cuisine</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={Cuisine}
                            onChange={(e) => {
                                const selectedCuisine = e.target.value;
                                setCuisine(selectedCuisine);
                            }}
                            label="Cuisine"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                           <MenuItem value="African">Africaine</MenuItem>
                           <MenuItem value="Asian">Asiatique</MenuItem>
                          <MenuItem value="American">Americaine</MenuItem>
                           <MenuItem value="British">Anglaise</MenuItem>
                           <MenuItem value="Chineese">Chinoise</MenuItem>
                           <MenuItem value="Indian">Indienne</MenuItem>
                            <MenuItem value="French">Française</MenuItem>
                           <MenuItem value="Italian">Italienne</MenuItem>
                           <MenuItem value="Greek">Grecque</MenuItem>
                           <MenuItem value="Mexican">Mexicaine</MenuItem>
                          <MenuItem value="Mediterranean">Méditerranéenne</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </>
        <div >
      <div className="c1">
        {currentRecipes.map((recipe) => (
          <Splide
            key={recipe.id}
            options={{
              type: 'loop',
              arrows: false,
              height: '14rem',
              perPage: 2,
              perMove: 1,
              grid: {
                dimensions: [[1, 1], [2, 2], [2, 1], [1, 2], [2, 2], [3, 2]],
                gap: {
                  row: '6px',
                  col: '1px',
                },
              },
              breakpoints: {
                640: {
                  height: '8rem',
                  perPage: 1,
                  grid: {
                    dimensions: [[2, 2], [1, 1], [2, 1], [1, 2], [2, 2]],
                  },
                },
              }
            }}
          >
            <div className="contenu1">
              <img src={recipe.image} alt="plat" className="plat"></img>
              <div className="info">
                <h>{recipe.title}</h>
              </div>
            </div>
          </Splide>
        ))}
      </div>
      
    </div>
    <div className="pagination-controls">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
        </div>
    );
}

export default FilterZ;
