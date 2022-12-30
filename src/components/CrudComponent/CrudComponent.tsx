    import React, { useEffect, useState } from 'react';
    import City from '../../models/City';
    import Client from '../../models/Client';
    import './CrudComponent.css';
    import ResourceViewer from '../ResourceViewer/ResourceViewer';
    import CityService from '../../services/CityService';
    import ClientService from '../../services/ClientService';
    import OperationalButtons from '../OperationalButtons/OperationalButtons';
    import {citiesColumns, clientsColumns} from '../../constants/ColumnConstants'
    import CityEditor from '../CityEditor/CityEditor';
    import ClientEditor from '../ClientEditor/ClientEditor';
    import { attachStatesToCities } from '../../utils/StateAttachmentUtils';

    interface CrudComponentProps {
        resourceName:string,
    }

    const CrudComponent = ({resourceName}: CrudComponentProps) => {
        const [resources, setResources] = useState<City[] | Client []>([]);
        const [viewerMode, setViewerMode] = useState<boolean>(true);
        const [resourceToEdit, setResourceToEdit] = useState<City | Client> (new City('', 'AC'));
        const [attachedCities, setAttachedCities] = useState<string[]>([])
        const [cities, setCities] = useState<City[]>([])
        let cityService = new CityService();
        let clientService = new ClientService();
    
        
        useEffect(() => {
            let tempCities:City[] = [];
            cityService.getCities()
            .then((response) => {
                (response as City[]).forEach((eachCity) => {
                    tempCities.push(eachCity)
                });
                setCities(tempCities);
            });
        },[])

        useEffect(()=> {
            setAttachedCities(attachStatesToCities(cities));
        },[cities])
        

        const fetchResources = (resourceName: string) => {
            if(resourceName === 'Cidade'){
                cityService.getCities()
                    .then((response) => {
                        setResources(response as City[]);
                    })
            } else {
                clientService.getClients()
                    .then((response) => {
                        setResources(response as Client[]);
                    })
            }
        }

        useEffect(() => {
            fetchResources(resourceName)
        },[])


        const updateResources = (incomingResources: City[] | Client[]) => {
            setResources(incomingResources)
        }

        const changeToEditorMode = (resourceId: number) => {
            let resourceBeingEdit: City | Client;
            resources.map((eachResource) => {
                if (eachResource.id == resourceId) {
                    resourceBeingEdit = eachResource
                    setResourceToEdit(resourceBeingEdit)
                }
            })
            setViewerMode(false);

        }

        const changeToViewerMode = () => {
            setViewerMode(true);
            setResourceToEdit(new City('', 'AC'));
        }

        const buildResourceViewerByResourceName = (resourceName: string) => {
            if (resourceName === 'Cidade') {
                return <ResourceViewer 
                    otherSearchParameter='UF' 
                    searchByName={cityService.getCitiesByName} 
                    searchByOtherParameter={cityService.getCitiesByState}
                    updateResources={updateResources}
                    columns={citiesColumns}
                    resources={resources}
                />
            } else {
                return <ResourceViewer 
                    otherSearchParameter='CPF' 
                    searchByName={clientService.getClientsByName} 
                    searchByOtherParameter={clientService.getClientsByCpf} 
                    updateResources={updateResources}
                    columns={clientsColumns}
                    resources={resources}
                />
            }
        }

        const buildOperationalButtonsByResourceName = (resourceName: string) => {
            if (resourceName === 'Cidade') {
                return <OperationalButtons 
                    deleteResourceById = {cityService.deleteCity}
                    updateResources={updateResources}
                    changeToEditorMode={changeToEditorMode}
                    resources={resources}

                />        
            } else {
                return <OperationalButtons
                    deleteResourceById={clientService.deleteClient}
                    updateResources={updateResources}
                    changeToEditorMode={changeToEditorMode}
                    resources={resources}
                />
            }
        }

        const buildResourceEditorByResourceName = (resourceName: string) => {
            if (resourceName === 'Cidade') {
                return <CityEditor initialCity ={resourceToEdit as City} cities={resources as City[]} updateResources={updateResources} changeToViewerMode={changeToViewerMode} 
                createCity={cityService.createCity} updateCity={cityService.updateCity}/>
            } else {
                return <ClientEditor initialClient ={resourceToEdit as Client} clients={resources as Client[]} cities={cities} attachedCities={attachedCities} updateResources={updateResources} changeToViewerMode={changeToViewerMode} 
                createClient={clientService.createClient} updateClient={clientService.updateClient}/>
            }
        }

        return (
            <div className='crud-component'>
                {viewerMode
                    ?   <div className='resource-viewer'>
                            {buildResourceViewerByResourceName(resourceName)}
                        </div>
                    :   <div className='resource-editor'>
                            {buildResourceEditorByResourceName(resourceName)}
                        </div>
                }
                <div className='operational-buttons'>
                    {buildOperationalButtonsByResourceName(resourceName)}
                </div>
            </div>
        //    
        );
    };

    export default CrudComponent;