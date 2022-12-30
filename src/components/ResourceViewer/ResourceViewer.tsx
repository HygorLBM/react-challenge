import { useState } from 'react';
import './ResourceViewer.css';
import City from '../../models/City';
import Client from '../../models/Client';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Cidade', width: 150 },
  { field: 'state', headerName: 'Estado', width: 150 },
 
];

interface ResourceViewerProps  {
    otherSearchParameter: string,
    searchByName: (name: string) => Promise<any>,
    searchByOtherParameter: (cpf: string) => Promise<any>,
    updateResources: (resources: Client[] | City[]) => void,
    columns: GridColDef[],
    resources: City[] | Client []
}


const ResourceViewer = ({searchByName, searchByOtherParameter, updateResources, columns, resources, otherSearchParameter} :ResourceViewerProps ) => {
    const [searchText, setSearchText] = useState<string>('');
    const [searchParameter, setSearchParameter] = useState<string>('Nome');
    
    const handleSearchParameterChange = (event: SelectChangeEvent) => {
        setSearchParameter(event.target.value);
      };

    const handleSearchTextChange = (event: any) => {
        setSearchText(event.target.value)
    }
    
    const handleSearch = (event: any) => {
        if (searchParameter === 'Nome') {
            searchByName(searchText).then(result => {
                updateResources(result as City[] | Client[])
            })
        } else {
            searchByOtherParameter(searchText).then((result: City[] | Client) => {
                let newResources: any[] = [];
                if  (Array.isArray(result)) {
                    (result as City[]).map((eachResult:City) => {newResources.push(eachResult)})
                } else {
                    newResources.push(result as any);
                }
                updateResources(newResources as City[] | Client[])
            })
        }
    }

    const handleLabels = () => {
        let labelText: string = '';
        if (searchParameter === 'Nome') {
            labelText = otherSearchParameter === 'CPF'  ? 'Nome (Ex:João)' : 'Nome (Ex:Campinas)'
        } else { 
            labelText = otherSearchParameter === 'CPF'  ? 'CPF (Ex:911.534.750-81)' : 'UF (Ex:SP)';
        }

        return labelText;
    }

    return (
        <div className='whole-resource-viewer'>
            <div className='viewer'>
                <DataGrid
                    rows={resources}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />           
            </div>
            <div className='searcher'>
                <div className='search-text'>
                    <TextField sx={{width: '100%'}} size='small' onChange={handleSearchTextChange} id="search-text" label={handleLabels()} variant="outlined" />
                </div>
                <div className='search-parameter-select'>
                    <Select
                        sx={{width: '100%'}}
                        labelId="select-search--type-label"
                        id="select-search-type"
                        value={searchParameter}
                        onChange={handleSearchParameterChange}
                        autoWidth
                        label="Procurar por"
                        size='small'
                    >
                        <MenuItem value='Nome'>Procurar por nome</MenuItem>
                        <MenuItem value={otherSearchParameter}>{"Procurar por " + otherSearchParameter}</MenuItem>
                    </Select>
                </div>  
                <div className='search-button'>
                    <IconButton sx={{width: '100%'}} onClick={handleSearch} color="primary" aria-label="search-by-params" component="label"> 
                        <SearchIcon />
                    </IconButton>
                </div>
                
            </div>
        </div>
        
    );
};

export default ResourceViewer;