import City from "./City";

export class Client {
    id?: number;
    cpf: string;
    name: string;
    email: string;
    gender: "MASCULINO" | "FEMININO" | "NÃO_BINÁRIO" | "OUTRO";
    birth_date: Date;
    city: City;


    constructor(cpf:string, name:string, email:string, gender:"MASCULINO" | "FEMININO" | "NÃO_BINÁRIO" | "OUTRO", birth_date: Date, city:City, id?:number){
        this.id = id;
        this.cpf = cpf;
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.birth_date = birth_date
        this.city = city;
    }
}

export default Client;