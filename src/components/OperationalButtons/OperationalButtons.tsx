import React, { useState, useEffect } from 'react';
import City from '../../models/City';
import Client from '../../models/Client';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import './OperationalButtons.css';

interface OperationalButtonsProps {
    deleteResourceById: (id: number) => Promise<any>,
    updateResources: (updatable: City[] | Client[]) => void,
    changeToEditorMode: (resourceId: number) => void,
    resources: City[] | Client[]
}

const OperationalButtons = ({deleteResourceById, updateResources, changeToEditorMode, resources}: OperationalButtonsProps) => {
    const [modifiedResources, setModifiedResources] = useState<City[] | Client[]>(resources);
    const [resourceId, setResourceId] =useState<number>(0);
    const [errorMessage, seterrorMessage] = useState<string | null>(null);

    useEffect(()=> {
        setModifiedResources(resources);
    },[resources])  
    
    useEffect(() => {
        updateResources(modifiedResources);
    },[modifiedResources])

    const handleIdChange = (event: any) => {
        setResourceId(event.target.value);
    }

    const handleDeleteClick = () => {
            deleteResourceById(resourceId)
            .then((response) => {
                    let newResources: (any[]) = [...modifiedResources].filter(eachResource => eachResource.id != resourceId);
                    setModifiedResources(newResources);
            })
    }

    const handleNewResource = () => {
        changeToEditorMode(0);
    }

    const handleEditResource = () => {
        changeToEditorMode(resourceId);
    }


    return (
        <div className='whole-operational-buttons'>
             {errorMessage
                        ? <Alert onClose={()=> {seterrorMessage(null)}}severity="warning">{errorMessage}</Alert>
                        : <></>
            }
            <div className='new-resource'>
                <Button onClick={handleNewResource}variant="contained" startIcon={<AddCircleIcon />}>
                    Novo
                </Button>
            </div>
            <div className='edit-or-remove-resource'>
                <div className='id-text'>
                    <TextField onChange={handleIdChange} id="id-text-field" label='ID (Ex: 1)' variant="outlined" size='small' />
                </div>
                <div className='id-related-operations'>
                    <Button variant="contained" endIcon={<DeleteIcon />} disabled={resourceId === 0} onClick={handleDeleteClick}>
                        Deletar
                    </Button>
                    <Button onClick={handleEditResource} variant="contained" endIcon={<EditIcon />} disabled={resourceId === 0}>
                        Editar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OperationalButtons;