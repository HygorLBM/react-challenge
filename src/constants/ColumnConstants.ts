import { GridColDef } from "@mui/x-data-grid";

export const citiesColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50},
    { field: 'name', headerName: 'Cidade', width: 150},
    { field: 'state', headerName: 'Estado', width: 150}
   
];

export const clientsColumns: GridColDef[] = [
    {field: 'id', headerName:'ID', width: 30},
    {field: 'cpf', headerName: 'CPF', width:130},
    {field: 'name', headerName: 'Nome', width:130},
    {field: 'email', headerName: 'Email', width:170},
    {field: 'birth_date' , headerName: 'Nascido em', width: 140},
    {field: 'city', headerName: 'Cidade' , width: 140, valueGetter: (params) => { return `${params.row.city.name} (${params.row.city.state})`}}

]

