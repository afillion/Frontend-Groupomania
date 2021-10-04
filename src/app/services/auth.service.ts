import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: boolean;
  
  constructor(
    private store: StorageService,
  ) { this.authState = false; }
  
  isAuth(): boolean {
    const helper = new JwtHelperService();
    
    const decodedToken = helper.decodeToken(this.store.localStorage.token);
    
    // Other functions
    const expirationDate = helper.getTokenExpirationDate(this.store.localStorage.token);
    const isExpired = helper.isTokenExpired(this.store.localStorage.token); 
    if (isExpired == false) {
      this.authState = true;
      return this.authState;
    }
    else {
      this.authState = false;
      return this.authState;
    }
  }
}
