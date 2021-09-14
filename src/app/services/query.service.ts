import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  apiUrl: string;
  
  constructor(
    public httpClient: HttpClient
  ) {
    this.apiUrl = "http://localhost:3000/api/";
  }

  getUsers() {

  }
  
  getOneUser() {

  }

  userLogin(data: any) {
    this.httpClient
    .post(this.apiUrl + "users/login", data)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' , error);
        }
      );
  }

  userSignup(data: any) {
    this.httpClient
    .post(this.apiUrl + "users/signup", data)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' , error);
        }
      );
  }

  getPosts() {

  }
  
  getOnePost() {

  }

  getComments() {

  }

  getOneComment() {

  }
}
