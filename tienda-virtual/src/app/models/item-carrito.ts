import { Producto } from "./producto";

export class ItemCarrito {
  amount: number;
  id: number;
  saleDTO: Producto;
  quantity : number;
  stock: number;
  
    constructor(id: number, saleDTO: Producto, amount: number, quantity: number, stock: number) {
      this.id = null;
      this.saleDTO = saleDTO;
      this.amount = amount;
      this.quantity = quantity;
      this.stock = stock;
    }
}
