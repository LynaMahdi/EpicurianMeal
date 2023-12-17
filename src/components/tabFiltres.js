// Filter.js
import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { InputLabel } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './filter.css'

const Filter = ({
  dietaryPreferences,
  allergies,
  Cuisine,
  handleDietaryPreferenceChange,
  handleAllergiesChange,
  setCuisine,
}) => {
  return (
    <div className="Color">
 
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

                           <MenuItem value="Asian">Asiatique</MenuItem>
                          <MenuItem value="American">Americaine</MenuItem>
                           <MenuItem value="British">Anglaise</MenuItem>
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
    </div>

  );
};

export default Filter;
