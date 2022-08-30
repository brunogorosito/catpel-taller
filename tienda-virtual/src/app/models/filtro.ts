export class Filtro {
    
    startPrice: number;
    endPrice: number;
    role: string;
    name: string;

    constructor(desde: number, hasta: number, role: string, nombre: string) {
        this.startPrice = desde;
        this.endPrice = hasta;
        this.role = role;
        this.name = nombre;
    }

}
