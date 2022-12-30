export class City {
    id?: number;
    name: string;
    state: string;

    constructor(name:string, state:string, id?:number) {
        this.id = id;
        this.name = name;
        this.state = state;
    }
}

export default City;