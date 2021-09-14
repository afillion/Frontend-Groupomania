import { Injectable } from '@angular/core';
import { QueryService } from './query.service';
import { StreamService } from './stream.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private query: QueryService,
    private stream: StreamService
  ) { }

  all() {
    this.query.getPosts();
  }
}
