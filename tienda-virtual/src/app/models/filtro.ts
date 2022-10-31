export class Filtro {
    
    startAmount: number;
    endAmount: number;
    role: string;
    name: string;

    constructor(desde: number, hasta: number, role: string, nombre: string) {
        this.startAmount = desde;
        this.endAmount = hasta;
        this.role = role;
        this.name = nombre;
    }

}
