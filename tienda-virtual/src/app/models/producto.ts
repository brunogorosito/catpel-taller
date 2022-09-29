export interface Producto {
    id: number;
    title: string;
    price: number;
    exitDate:Date;
    format:string;
    image:string;
    status:string;
    summary:string;
    gender: Gender;
    personList: Person[];
    discountList: Discount[];
}

interface Gender {
    id: number;
    desscription: string;
}

interface Person {
    id: number;
    name: string;
    lastname: string;
    personType: PersonType;
}

export enum PersonType {
    director, 
    actor
}

interface Discount{
    id: number;
    name: string;
    description: string;
    startDate: Date ;
    endDate: Date ;
    amount: number;
}




