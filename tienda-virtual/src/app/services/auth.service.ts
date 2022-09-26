import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject, tap} from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { loginUrl, registerUrl, logoutUrl, restorePasswordUrl, updatePasswordUrl } from '../config/api';
import {JwtHelperService} from "@auth0/angular-jwt";
import { User } from '../models/pedido';
import jwt_decode from 'jwt-decode';
import UserLogged from '../models/userLogged';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth2: gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);
  private _user: BehaviorSubject<UserLogged> = new BehaviorSubject<UserLogged>(null);
  jwtHelper: JwtHelperService = new JwtHelperService();
  authUrl = '/auth/login';
  authSocial = '/auth/google';

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '727664343771-m056917vlu3i4v3f5gvo73rk0g2a8aj2.apps.googleusercontent.com'
      })
    })
  }

  public singout() {
    this.subject.next(null);
    localStorage.clear()
  }

  public observable(): Observable<gapi.auth2.GoogleUser> {
    return this.subject.asObservable();
  }

  get user(): Observable<UserLogged> {
    return this._user.asObservable().pipe(filter(user => user != null));
  }

  getUserValue(): UserLogged {
    return this._user.getValue();
  }

  login(email: string, password: string): Observable<any> {

    let body = new URLSearchParams();
    body.set("email",email);
    body.set("password",password);
    const header = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = { headers: header}
    return this.http.post("http://localhost:8080/user",body,options)
  }

  logout() {
    this._user.next(null);
    localStorage.removeItem(environment.tokenName);
    this.router.navigate(['login']);
    this.http.put(logoutUrl,null)
    localStorage.clear()
  }

  setUserIn(user: any) {
    localStorage.setItem(environment.tokenName,user.accessToken)
    let u = new UserLogged(user.id,user.username)
    this._user.next(u);
}


  getToken() {
    return localStorage.getItem(environment.tokenName); 
  }

  isLoggedIn() {
    const token = localStorage.getItem(environment.tokenName);
    if (token === null){
      return false;
    }else{
      return true;
    }
  }

  register(lastname: string,mail:string,name:string,password: string, profile: any): Observable<any>{
    const body = {
      "id": null,
      "lastname": lastname,
      "mail": mail,
      "name": name,
      "password": password,
      "profile": profile,
      "username": mail
    }
    return this.http.post(registerUrl,body)
  }

  restorePassword(email: string): Observable<any>{
    const body = {
      "email": email,
    }
    return this.http.post(restorePasswordUrl,body)
  }

  updatePassword(id: string, newPassword: string, oldPassword: string): Observable<any>{
    const body = {
      "id": id,
      "newPassword": newPassword,
      "password": oldPassword
    }
    return this.http.post(updatePasswordUrl,body,{headers: new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+ this.getToken()})})
  }
}
  
