import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPosts } from './query.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  postsSubject: BehaviorSubject<IPosts[]>;

  constructor( ) { this.postsSubject = new BehaviorSubject<IPosts[]>(undefined); }
}
