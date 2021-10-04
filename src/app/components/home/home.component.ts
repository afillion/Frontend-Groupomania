import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Posts, QueryService } from 'src/app/services/query.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts:Posts[] = [];
  postsSubject = new Subject<Posts[]>();
  
  constructor(
    public query: QueryService,
    public store: StorageService,
    public auth: AuthService,
    private router: Router
    ) { 
      // this.store.localStorage.clear(); 
    }

  ngOnInit(): void {
    this.query.getPosts().subscribe(
      (data: Posts[]) => { this.posts = data; this.emitPosts(); },
      (err) => { console.log(err); },
      () => { console.log("getPosts complete !") }
    );
  }

  emitPosts() {
    this.postsSubject.next(this.posts);
  }

  updateLikes(postId: number, like:number) {
    this.query.updateLikes(this.store.localStorage.userId, postId, like).subscribe(
      (res) => {
        console.log(res); 
        this.ngOnInit();
      },
      (err) => { console.log(err); },
      () => { console.log("updateLikes complete !"); }
    );
  }
}