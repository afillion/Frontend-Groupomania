import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: boolean;
  
  constructor(
    private store: StorageService,
    private token: TokenService
  ) { this.authState = false; }
  
  isOwner(object_ownerId): boolean {
    
    const decodedToken = this.token.get_decodedToken(this.store.localStorage.token)
    console.log("auth service");
    if (object_ownerId === decodedToken.userId) {
      this.authState = true;
      return this.authState;
    }
    else {
      this.authState = false;
      return this.authState;
    }
  }
}
