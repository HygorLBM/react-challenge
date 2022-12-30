import City from "../models/City";

export const attachStatesToCities = (cities: City[]) => {
    let attachedCities:string[] = [];
    cities.forEach((eachCity) => {
        attachedCities.push(`${eachCity.name} (${eachCity.state})`);
    });
    return attachedCities;
}