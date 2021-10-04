import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private store: StorageService,
    private router: Router
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const helper = new JwtHelperService();

      const decodedToken = helper.decodeToken(this.store.localStorage.token);
      
      // Other functions
      const expirationDate = helper.getTokenExpirationDate(this.store.localStorage.token);
      const isExpired = helper.isTokenExpired(this.store.localStorage.token); 
      console.log(decodedToken, expirationDate, isExpired);
      if (isExpired == false) {
        return true;
      }
      else {
        this.router.navigate(['']);
        return false
      }
  }
  
}
