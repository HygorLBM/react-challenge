    import { useState, useEffect } from 'react';
import City from '../../models/City';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './CityEditor.css';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import { states } from '../../constants/States';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';


    interface CityEditorProps {
        initialCity: City;
        cities: City[];
        changeToViewerMode: () => void,
        updateResources: (incomingResources: City[]) => void,
        createCity: (city: City) => Promise<any>,
        updateCity: (city: City, id:number) => Promise<any>
    }

    const CityEditor = ({initialCity, cities, changeToViewerMode, updateResources, createCity, updateCity}: CityEditorProps) => {
        const [editingCity, setEditingCity] = useState<City>(initialCity);
        const [modifiedResources, setModifiedResources] = useState<City[]>(cities)

        useEffect(()=> {
            if (modifiedResources !== cities) {
                updateResources(modifiedResources);
                changeToViewerMode();
            }
        }, [modifiedResources]);

        const handleEditingCityNameChange = (event: any) => {
            setEditingCity({...editingCity, name: event.target.value})
        }

        const handleEditingCityStateChange = (event: any, newValue: string) => {
            setEditingCity({...editingCity, state: newValue})
        }


        const handleEditCancel = (event : any) => {
            changeToViewerMode();
        }

        const handleSaveButtonClick = (event: any) => {
            if(initialCity.name !== '') {
                updateCity(editingCity, initialCity.id as number)
                    .then((response: City) => {
                        let newCities:City[] = [];
                        cities.map((eachCity) => eachCity.id === response.id ? newCities.push(response) : newCities.push(eachCity));
                        setModifiedResources(newCities);
                    })  
            } else {
              createCity(editingCity)
                .then((response: City) => {
                    let newCities: City[] = [];
                    cities.map((eachCity) => newCities.push(eachCity));
                    newCities.push(response);
                    setModifiedResources(newCities)
                })  
            }
        }




        return (
            <div className='whole-city-editor'>
                <div className='city-fields'> 
                    <TextField onChange={handleEditingCityNameChange} sx={{width: '100%', marginBottom: '1em' }} value={editingCity.name} id="id-text-field" label='Nome da cidade (Ex:Campinas)' variant="outlined" size='small' />
                    <Autocomplete onInputChange={handleEditingCityStateChange} value={editingCity.state} disablePortal id="combo-box-states" options={states} size='small' renderInput={(params) => <TextField {...params} label="UF" />} /> 
                </div>
                <div className='city-confirmation-buttons'>
                    <Button onClick={handleSaveButtonClick} variant="contained" startIcon={<SaveIcon />}>
                        Salvar
                    </Button>
                    <Button onClick={handleEditCancel} variant="contained" startIcon={<CancelIcon />}>
                        Cancelar
                    </Button>
                </div>
            </div>
        );
    };

    export default CityEditor;