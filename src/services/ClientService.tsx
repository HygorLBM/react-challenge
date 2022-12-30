import Client from "../models/Client";

class ClientService {
    
    async getClients() {
        try{
            const response = fetch('/clients');
            const body = (await response).json();

            return body;

        } catch (e) {
            return [];
        }
     }

     async getClientsByName(name:string) {
        try{
            const response = fetch(`/clients/${name}`);
            const body = (await response).json();

            return body;

        } catch(e) {
            return [];
        }
     }

     async getClientsByCpf(cpf:string) {
        try{
            const response = fetch(`/clientByCPF/${cpf}`);
            const body = (await response).json();

            return body;

        } catch(e) {
            return [];
        }
     }

     async createClient(client:Client) {
        try{
            const response = fetch('/clients',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client)
            });
            const body = (await response).json();

            switch ((await response).status) {
                case 201:
                    return body;
                case 400:
                    return {error: 'ERRO: E-mail inválido'};
                case 409:
                    return {error: 'ERRO: CPF Já cadastrado'};
            }

        } catch(e) {
            return [];
        }
     }

     async updateClient(client:Client, id: number) {
        try{
            const response = fetch(`/client/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client)
            });
            const body = (await response).json();

            return body;

        } catch(e) {
            return [];
        }
     }

     async deleteClient(id: number) {
        try{
            const request = fetch(`/client/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                return null;
            });
        } catch(e) {
            return [];
        }
     }


}
export default ClientService