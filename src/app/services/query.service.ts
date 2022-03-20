import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

export interface ILogin {
  email: string,
  pwd: string
}

export interface IUsers {
  id: number,
  pseudo: string,
  first_name:string,
  last_name:string,
  pwd: string,
  role: string,
  description: string,
  email: string
}

export interface IComments {
  id: number,
  txt: string,
  createdAt: string,
  updatedAt: string,
  userId: number,
  postId: number  
  user?: IUsers
}

export interface IPosts {
  id: number,
  title: string,
  txt: string,
  likes: number,
  dislikes: number,
  imageUrl: string,
  userId: number,
  createdAt: string,
  updatedAt: string,
  user: IUsers,
  comments: [IComments]
  fileData?: FormData
}
@Injectable({
  providedIn: 'root'
})

export class QueryService {

  apiUrl: string;
  Users: IUsers;
  httpOptions:any;
  id:number;
  token: string;
  
  constructor(
    public httpClient: HttpClient,
  ) {
    this.apiUrl = "http://localhost:3000/api/";
  }

  getUsers() {
    return this.httpClient.get<IUsers[]>(this.apiUrl + "users");
  }
  
  getOneUser(id: number): any {
    return this.httpClient.get<IUsers>(this.apiUrl + "users/" + id);
  }

  delOneUser(id: number): any {
    return this.httpClient.delete<IUsers>(this.apiUrl + "users/" + id);
  }
  
  userLogin(data: ILogin) {
    return this.httpClient.post<ILogin>(this.apiUrl + "users/login", data);
  }

  userSignup(data: any) {
    return this.httpClient.post<IPosts>(this.apiUrl + "users/signup", data);
  }

  getPosts() {
    return this.httpClient.get<IPosts[]>(this.apiUrl + "posts");
  }
  
  getOnePost(id:string) {
    return this.httpClient.get<IPosts>(this.apiUrl + "posts/" + id);
  }

  postPost(data: FormData) {
    return this.httpClient.post<IPosts>(this.apiUrl + "posts/", data);
  }

  updateLikes(userId, postId, like) {
    return this.httpClient.post(this.apiUrl + "posts/" + postId + "/like", {"userId": userId, "postId": postId, "like": like});
  }

  postComment(data: IComments):any {
    return this.httpClient.post(this.apiUrl + "comments/", data);
  }
  
  getComments() {

  }

  getOneComment() {

  }
}
