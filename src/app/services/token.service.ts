import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  userId: number;
  token: string;
  
  constructor(public store: StorageService) { }

  helper = new JwtHelperService();

  get_decodedToken(token) {
    this.token = token;
    this.userId = this.helper.decodeToken(token).userId;
    return this.helper.decodeToken(token);
  }

  get_isExpired(token) {
    return this.helper.isTokenExpired(token);
  }

  get_userId(): number {
    return this.userId;
  }
}
