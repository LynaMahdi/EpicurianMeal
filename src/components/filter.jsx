import React, { useState } from "react";
import './filter.css'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { InputLabel } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { NavLink } from "react-router-dom";

function Filter() {
    const [Cuisine, setCuisine] = React.useState('');
    const [dietaryPreferences, setDietaryPreferences] = React.useState({
        dairyFree: false,
        glutenFree: false,
        eggFree: false,
        sugarFree: false,
        vegetarian: false,
    });

    const [allergies, setAllergies] = React.useState({
        peanut: false,
        gluten: false,
        wheat: false,
        nuts: false,
        sesame: false,
    });

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

    return (
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
                            <NavLink to={'/cuisine/African'}><MenuItem value="African">Africaine</MenuItem></NavLink>
                            <NavLink to={'/cuisine/Asian'}>  <MenuItem value="Asian">Asiatique</MenuItem></NavLink>
                            <NavLink to={'/cuisine/American'}><MenuItem value="American">Americaine</MenuItem></NavLink>
                            <NavLink to={'/cuisine/British'}><MenuItem value="British">Anglaise</MenuItem></NavLink>
                            <NavLink to={'/cuisine/Chineese'}><MenuItem value="Chineese">Chinoise</MenuItem></NavLink>
                            <NavLink to={'/cuisine/Indian'}><MenuItem value="Indian">Indienne</MenuItem></NavLink>
                            <NavLink to={'/cuisine/French'}><MenuItem value="French">Française</MenuItem></NavLink>
                            <NavLink to={'/cuisine/Italian'}><MenuItem value="Italian">Italienne</MenuItem></NavLink>
                            <NavLink to={'/cuisine/Greek'}><MenuItem value="Greek">Grecque</MenuItem></NavLink>
                            <NavLink to={'/cuisine/Mexican'}><MenuItem value="Mexican">Mexicaine</MenuItem></NavLink>
                            <NavLink to={'/cuisine/Mediterranean'}><MenuItem value="Mediterranean">Méditerranéenne</MenuItem></NavLink>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </>
    );
}

export default Filter;
