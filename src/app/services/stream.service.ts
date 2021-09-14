import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  postsStream: BehaviorSubject<any>;
  usersStream: BehaviorSubject<any>;
  userStream: BehaviorSubject<any>;
  
  constructor() { 
    this.postsStream = new BehaviorSubject<any>(undefined);
    this.usersStream = new BehaviorSubject<any>(undefined);
    this.userStream = new BehaviorSubject<any>(undefined);
  }

}
