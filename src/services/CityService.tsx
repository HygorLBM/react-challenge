import City from "../models/City";

class CityService {
    
    async getCities() {
        try{
            const response = fetch('/cities');
            const body = (await response).json();

            return body;

        } catch (e) {
            return [];
        }
     }

     async getCitiesByName(name:string) {
        try{
            const response = fetch(`/cities/${name}`);
            const body = (await response).json();

            return body;

        } catch(e) {
            return [];
        }
     }

     async getCitiesByState(state:string) {
        try{
            const response = fetch(`/citiesByState/${state}`);
            const body = (await response).json();

            return body;

        } catch(e) {
            return [];
        }
     }

     async createCity(city:City) {
        try{
            const response = fetch('/cities',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(city)
            });
            const body = (await response).json();

            return body;

        } catch(e) {
            return [];
        }
     }

     async updateCity(city:City, id: number) {
        try{
            const response = fetch(`/city/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(city)
            });
            const body = (await response).json();

            return body;

        } catch(e) {
            return [];
        }
     }

     async deleteCity(id: number) {
        try{
            const request = fetch(`/city/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response.status !== 409) {
                    return null;
                } else {
                    return {error: 'ERROR: Essa cidade está sendo usada por um cliente'}
                }
            });
        } catch(e) {
            return [];
        }
     }


}
export default CityService