import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  localStorage:any;
  
  constructor(public window: Window) { 
    this.localStorage = this.window.localStorage;
    if (this.localStorage) {
      console.log("localStorage OK :", this.localStorage);
    }
    else {
      console.log("localStorage NO");
    }
  }
}