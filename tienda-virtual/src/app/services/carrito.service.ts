import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCarrito } from '../models/item-carrito';
//import { carritoUrl } from '../config/api';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto';
import { enviarCarrito } from '../config/api';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  enviar(carrito : ItemCarrito[], id: number, amount: number, quantity: number): Observable<ItemCarrito>{
    const headers = {'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'Bearer ' + this.authService.getToken()};
    return this.http.post<ItemCarrito[]>(enviarCarrito, {
      id : id,
      orderDTOList: carrito,
    },{headers}).pipe(map((response: any) => {
      (response.content as ItemCarrito[]).map(item => {
        return item;
      });
      return response;
    })); 

  }
  
}
