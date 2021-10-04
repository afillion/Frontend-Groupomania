import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

export interface Login {
  email: string,
  pwd: string
}

export interface Users {
  id: number,
  pseudo: string,
  first_name:string,
  last_name:string,
  pwd: string,
  role: string,
  description: string,
  email: string
}

export interface Posts {
  id: number,
  title: string,
  txt: string,
  likes: number,
  dislikes: number,
  imageUrl: string,
  userId: number,
  createdAt: string,
  updatedAt: string,
  user: Users
}
@Injectable({
  providedIn: 'root'
})

export class QueryService {

  apiUrl: string;
  Users: Users;
  httpOptions:any;
  id:number;
  token: string;
  
  constructor(
    public httpClient: HttpClient,
  ) {
    this.apiUrl = "http://localhost:3000/api/";
  }

  getUsers() {
    return this.httpClient.get<Users[]>(this.apiUrl + "users");
  }
  
  getOneUser(id: number): any {
    return this.httpClient.get<Users>(this.apiUrl + "users/" + id);
  }
  
  userLogin(data: Login) {
    return this.httpClient.post<Login>(this.apiUrl + "users/login", data);
  }

  userSignup(data: any) {
    return this.httpClient.post<Posts>(this.apiUrl + "users/signup", data);
  }

  getPosts() {
    return this.httpClient.get<Posts[]>(this.apiUrl + "posts");
  }
  
  getOnePost() {

  }

  updateLikes(userId, postId, like) {
    return this.httpClient.post(this.apiUrl + "posts/" + postId + "/like", {"userId": userId, "postId": postId, "like": like});
  }

  getComments() {

  }

  getOneComment() {

  }
}
