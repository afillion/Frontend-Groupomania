import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreamService } from './stream.service';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  apiUrl: string;
  
  constructor(
    public httpClient: HttpClient,
    public stream: StreamService
  ) {
    this.apiUrl = "http://localhost:3000/api/";
  }

  getUsers() {
    this.httpClient
    .get(this.apiUrl + "users")
      .subscribe(
        (res) => {
          console.log("getusers for Users.findAll()", res);
          this.stream.usersStream.next(res);
        },
        (err) => {
          console.log("getusers for Users.findAll() error", err);
        }
      );
  }
  
  getOneUser(id: number): any {
    this.httpClient
    .get(this.apiUrl + "users/" + id)
      .subscribe(
        (res) => {
          console.log("getusers for Users.findOne()", res);
          this.stream.userStream.next(res);
        },
        (err) => {
          console.log("getusers for Users.findAll() error", err);
        }
      );
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
    this.httpClient
    .get(this.apiUrl + "posts")
      .subscribe(
        (res) => {
          console.log("getPosts for Post.findAll()", res);
          this.stream.postsStream.next(res);
        },
        (err) => {
          console.log("getPosts for Post.findAll() error", err);
        }
      );
  }
  
  getOnePost() {

  }

  getComments() {

  }

  getOneComment() {

  }
}
