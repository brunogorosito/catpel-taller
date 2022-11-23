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

  enviar(carrito : ItemCarrito[], id: number, amount: number, quantity: number)/* : Observable<any>*/{ 
   /*  let body = {
      private Float totalAmount;
      private LocalDateTime datePurchase;
  
      "client":{

        private String name;
        private String email;
      }, 
  
      "shoppingCart": {

      }
    } 
    return this.http.post("http://localhost:8083/rankings");*/
  }
  
}
