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

  public singin() {
    this.auth2.signIn({
      scope: 'https://www.googleapis.com/auth/gmail.readonly'
    }).then(user => {
      this.subject.next(user);
     /*  this.loginSocial(user.getAuthResponse().id_token)
        .subscribe(
          success => {
            console.log("SUCCES", success);
            localStorage.setItem("token", success.accessToken);
            this.setUserIn();
            this.ngZone.run(() => this.router.navigate(['home'])).then();
          },
          err => {
            // this.pushMsg(MessageSeverity.ERROR, 'Intento de ingreso fallido', 'Usuario o contraseña incorrecta.');
            console.log("login invalido");
          }); */
    }).catch(() => {
      this.subject.next(null);
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

    const headers = { 'Content-Type': 'application/json; charset=utf-8'};

    const request = JSON.stringify({
      "email" : email,
      "password": password
    });

    return this.http.post(loginUrl,request,{headers}).pipe(tap(res => {
        localStorage.setItem(environment.tokenName, res.token);
        this.setUserIn(res.token);
      }));
  }

  logout() {
    this._user.next(null);
    localStorage.removeItem(environment.tokenName);
    this.router.navigate(['login']);
    this.http.put(logoutUrl,null)
    localStorage.clear()
  }

  setUserIn(token: string) {
    if (this.getToken() != null) {
      const tokenInfo = this.getDecodedAccessToken(token);
      let id = tokenInfo.userId
      let username = tokenInfo.username
      let firstName = tokenInfo.name
      let lastName  = tokenInfo.lastname
      let email = tokenInfo.mail
      let u = new UserLogged(id,username,firstName,lastName,email);
      this._user.next(u);
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
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
  
