import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { citiesUrl, citiUrl, createPagoUrl, cuotasUrl, getTokenUrl, ivaConditionUrl, metodosUrl, metodoUrl, meUrl, provincesUrl, provinceUrl, tiposDeCondicionesUrl, tiposDeDocumentosUrl, updateUserUrl } from '../config/api';
import { ItemCarrito } from '../models/item-carrito';
import { Pedido } from '../models/pedido';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  getTiposDeDocumentos():Observable<any>{
    const headers = { 'Content-Type': 'application/json; charset=utf-8'};
    return this.http.get<any[]>(tiposDeDocumentosUrl);
  }

  getCondicionesFrenteAlIVA():Observable<any>{
    const headers = { 'Content-Type': 'application/json; charset=utf-8'};
    return this.http.get<any[]>(tiposDeCondicionesUrl);
  }

  getProvinces():Observable<any>{
    const headers = { 'Content-Type': 'application/json; charset=utf-8'};
    return this.http.get<any[]>(provincesUrl);
  }

  getProvinceById(idProvince: string):Observable<any>{
    const headers = { 'Content-Type': 'application/json; charset=utf-8'};
    return this.http.get<any[]>(provinceUrl + idProvince);
  }

  getIvaConditionById(idIvaCondition: string):Observable<any>{
    const headers = { 'Content-Type': 'application/json; charset=utf-8'};
    return this.http.get<any[]>(ivaConditionUrl + idIvaCondition);
  }

  getCitiesByProvince(idProvince: string):Observable<any>{
    const headers = { 'Content-Type': 'application/json; charset=utf-8'};
    return this.http.get<any[]>(citiesUrl + idProvince);
  }

  getMetodosDePago(): Observable<any>{
    const headers = { 'Content-Type': 'application/json; charset=utf-8'};
    return this.http.get<any[]>(metodosUrl);
  }
  
  getCitiById(idCity: string):Observable<any>{
    const headers = { 'Content-Type': 'application/json; charset=utf-8'};
    return this.http.get<any>(citiUrl + idCity);
  }

  getMethodById(idMethod: string):Observable<any>{
    const headers = { 'Content-Type': 'application/json; charset=utf-8'};
    return this.http.get<any>(metodoUrl + idMethod);
  }
  
  getMe(id: string) :Observable<any>{
    return this.http.get(meUrl + id + '/profile', {headers: new HttpHeaders({'Authorization':'Bearer '+ this.authService.getToken()})})
  }

  getCuotas(amount: string, bin: string, payment_method_id: string): Observable<any>{
    const headers = { 'Content-Type': 'application/json; charset=utf-8'};
    return this.http.get<any>(cuotasUrl +
       "amount="+amount+
       "&bin="+bin+
       "&payment_method_id="+payment_method_id);
  }

  createToken(bin: string, securityCode: string, expYear: number, expMonth: number, docType: string, docNum: string, titular: string ): Observable<any>{
    const headers = {'Content-Type': 'application/json; charset=utf-8'}
    return this.http.post<any>(getTokenUrl, {
      cardNumber: bin,
      securityCode: securityCode,
      expirationYear: expYear,
      expirationMonth: expMonth,
      type: docType,
      number: docNum,
      nameCardHolder: titular
    },{headers})
  }

  createPago(installmentsId : string, orderDTOList: ItemCarrito[], payment: Pedido, paymentMethodId: string,tokenMP: string): Observable<any>{
    return this.http.post<any>(createPagoUrl, {
      id: null,
      installmentsId : installmentsId,
      orderDTOList: orderDTOList,
      payment : payment,
      paymentMethodId : paymentMethodId,
      tokenMP: tokenMP,
    },{headers: new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+ this.authService.getToken()})})
  }

  updateData(id: string,lastname: string,mail:string,name:string,password: string, profile: any): Observable<any>{

    const body = {
      "id": id,
      "lastname": lastname,
      "mail": mail,
      "name": name,
      "password": password,
      "profile": profile,
      "username": mail
    }

    return this.http.put(updateUserUrl,body,{headers: new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+ this.authService.getToken()})});

  }
}
