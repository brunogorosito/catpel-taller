import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.evaluate(route, state);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.evaluate(childRoute, state);
  }

  private evaluate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if (this.authService.isLoggedIn()) return true;

    /*if(route.data && route.data.fx && (route.data.fx as string[]).some(fx => fx === "User.UPDATE")){
      return true;
    }*/

    this.router.navigate(['login']);
    //return true;
  }

}
