    import Client from '../../models/Client';
    import City from '../../models/City';
    import { useEffect, useState } from 'react';
    import TextField from '@mui/material/TextField';
    import Button from '@mui/material/Button';
    import Alert from '@mui/material/Alert';
    import './ClientEditor.css';
    import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
    import SaveIcon from '@mui/icons-material/Save';
    import CancelIcon from '@mui/icons-material/Cancel';
    import { gender } from '../../constants/Gender';


    interface ClientEditorProps {
        initialClient: Client;
        clients: Client[];
        cities: City[];
        attachedCities: string[],
        changeToViewerMode: () => void,
        updateResources: (incomingResources: Client[]) => void,
        createClient: (client: Client) => Promise<any>,
        updateClient: (client: Client, id:number) => Promise<any>
    }

    const ClientEditor = ({initialClient, clients, cities, attachedCities, changeToViewerMode, updateResources, createClient, updateClient}: ClientEditorProps) => {
        const [editingClient, setEditingClient] = useState<Client>(initialClient);
        const [modifiedClients, setModifiedClients] = useState<Client[]>(clients);
        const [errorMessage, setErrorMessage] = useState<string | null>(null)
        
        useEffect(() =>{
            if (modifiedClients !== clients) {
                updateResources(modifiedClients)
                changeToViewerMode()
            }
        },[modifiedClients])
    
        const handleEditingClientNameChange = (event: any) => {
            setEditingClient({...editingClient, name: event.target.value})
        }

        const handleEditingClientCpfChange = (event: any) => {
            setEditingClient({...editingClient, cpf: event.target.value})
        }

        const handleEditingClientEmailChange = (event: any) => {
            setEditingClient({...editingClient, email: event.target.value})
        }

        const handleEditingClientGenderChange = (event: any, newValue: string) => {
            setEditingClient({...editingClient, gender: newValue as "MASCULINO" | "FEMININO" | "NÃO_BINÁRIO" | "OUTRO"});
        }

        const handleEditingClientBirthDateChange = (event: any) => {
            setEditingClient({...editingClient, birth_date: event.target.value})
        }

        const handleEditingClientCityChange = (event: any, newValue: string) => {
            newValue = newValue.substring(0, newValue.indexOf('(') -1);
            cities.forEach((eachCity) => {
                if (eachCity.name === newValue) {
                    setEditingClient({...editingClient, city: eachCity})
                }
            })

        }

        const handleEditCancel = (event : any) => {
            changeToViewerMode();
        }

        const handleSaveButtonClick = (event: any) => {
            // UPDATE an already existing client
            if(initialClient.name !== '') {
                updateClient(editingClient, initialClient.id as number)
                    .then((response: Client) => {
                        let newClients:Client[] = [];
                        clients.map((eachClient) => eachClient.id === response.id ? newClients.push(response) : newClients.push(eachClient));
                        setModifiedClients(newClients);
                    })  
            } else {
            // Create a new client
            createClient(editingClient)
                .then((response: any) => {
                    if (!response.error) {
                    let newClients: Client[] = [];
                    clients.map((eachClient) => newClients.push(eachClient));
                    newClients.push(response as Client);
                    setModifiedClients(newClients)
                    } else {
                        setErrorMessage((response as {error: string}).error);
                    }
                })  
            }
        }

        return (
            <div className='whole-client-editor'>
                <div className='client-fields'> 
                    <TextField onChange={handleEditingClientNameChange} sx={{width: '100%', marginBottom: '1em' }} value={editingClient.name} id="client-name-field" label='Nome (Ex:João da Silva)' variant="outlined" size='small' />
                    <TextField onChange={handleEditingClientCpfChange} sx={{width: '100%', marginBottom: '1em' }} value={editingClient.cpf} id="client-cpf-field" label='CPF (Ex:745.196.500-70)' variant="outlined" size='small' />
                    <TextField onChange={handleEditingClientEmailChange} sx={{width: '100%', marginBottom: '1em' }} value={editingClient.email} id="client-email-field" label='Email (Ex:mail@somemail.com)' variant="outlined" size='small' />
                    <TextField onChange={handleEditingClientBirthDateChange} sx={{width: '100%', marginBottom: '1em' }} value={editingClient.birth_date} id="client-birthdate-field" label='Data de nascimento (Ex:YYYY-MM-DD)' variant="outlined" size='small' />
                    <Autocomplete sx={{width: '100%', marginBottom: '1em' }} onInputChange={handleEditingClientGenderChange} value={editingClient.gender} disablePortal id="combo-box-gender" options={gender} size='small' renderInput={(params) => <TextField {...params} label="Gênero" />} /> 
                    <Autocomplete onInputChange={handleEditingClientCityChange} value={editingClient?.city?.name || null}  disablePortal id="combo-box-cities" options={attachedCities as readonly string[] || null} size='small' renderInput={(params) => <TextField {...params} label="Cidade" />} />
                    {errorMessage 
                        ? <Alert onClose={()=> {setErrorMessage(null)}}severity="warning">{errorMessage}</Alert>
                        : <></>
                    }
                </div>
                <div className='client-confirmation-buttons'>
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

    export default ClientEditor;