import { ItemCarrito } from "./item-carrito";

export class Pedido {
    id: string;
    idMercadoPago: string;
    itemsQuantity: number;
    state : string;
    sale : ItemCarrito[];
    registrationDate: Date;
    registrationDateNotified: Date;
    student : User;
    amount: number;


    constructor(sale: ItemCarrito[], id: string, amount: number, itemsQuantity: number, state: string,
        student: User) {
            this.idMercadoPago = null;
            this.registrationDate = null;
            this.registrationDateNotified= null;
        this.sale = sale;
        this.id = id;
        this.amount = amount;
        this.itemsQuantity = itemsQuantity;
        this.state = state;
        this.student = student;
    }

}

export class User{
    id : string;
    name : string;
    lastname : string;
    email: string;
    cuilCuit: string;
    ivaCondition: IvaCondition
    documentType: string ;
    document: string ;
    address: Address; 
    phone: string;
    payerCuilCuit: string;
    thirdParties: boolean;
    businessName: string;

    constructor(id: string ,firstname: string, lastname: string, email: string, cuitCuil: string,
        address: Address, document: string, documentType: string,ivaCondition: IvaCondition, phone: string, payerCuilCuit: string,
        thirdParties: boolean, businessName: string){
        this.id = id;
        this.name = firstname;
        this.lastname = lastname;
        this.email = email;
        this.cuilCuit = cuitCuil;
        this.address = address;
        this.document = document;
        this.documentType = documentType;
        this.ivaCondition = ivaCondition;
        this.phone = phone;
        this.payerCuilCuit = payerCuilCuit;
        this.thirdParties = thirdParties;
        this.businessName = businessName;
    }
}

export class IvaCondition{
    id: string;
    name: string;
}

export class DocumentTypes{
    id: string;
    name: string;
}

export class Address{
    id: string;
    street: string;
    number: string;
    floor: string;
    dpto: string;
    city: City;

    constructor(street: string, number: string, floor: string, dpto: string, city: City){
        this.street = street;
        this.number = number;
        this.floor = floor;
        this.dpto = dpto;
        this.city = city;
    }
}

export class City{
    id: number;
    provinceDTO: Province;
    name: string;
    zipCode: number;
}

export class Province{
    id: string;
    name: string;

    constructor(id: string, name: string){
        this.id = id;
        this.name = name;
    }

}
