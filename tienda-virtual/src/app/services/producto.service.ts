import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { productosUrl, unProductoStockUrl, unProductoUrl, aplicarFiltro } from '../config/api';
import { Filtro } from '../models/filtro';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  constructor(private http: HttpClient,
    private authService: AuthService) { }

  getProductos(): Observable<any>{

    const headers = { 'Content-Type': 'application/json; charset=utf-8',
    /* 'Authorization': 'Bearer ' + this.authService.getToken() */};
    return this.http.get<Producto[]>("http://localhost:8081/products?page=0&size=2&sort=ASC",{headers});
  }

  getPlantin(id: number)/* : Observable<any> */{
    return null
/*     const headers = {'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'Bearer ' + this.authService.getToken()};
    return this.http.get<Producto>(unProductoUrl + id,{headers}); */
  }

  getCarrito (): Observable<any>{
    const headers = {'Content-Type': 'application/json; charset=utf-8',

    /* 'Authorization': 'Bearer ' + this.authService.getToken();*/}
    return this.http.get<Producto>("http://localhost:8082/shopping-carts/"  + this.authService.getUserIdValue() ,  {headers}); 
  }

  agregarAlCarrito(producto: any): Observable<any>{
     return this.http.post("http://localhost:8082/shopping-carts/" + 1 + "/product",{
        id : producto.id,
        title : producto.title,
        amount: producto.amount,
        shoppingCartList : []
      }) 
  }



}
