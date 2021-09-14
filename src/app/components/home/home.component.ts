import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QueryService } from 'src/app/services/query.service';
import { StreamService } from 'src/app/services/stream.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  postsStream_subscriber: Subscription;
  posts: any;

  usersStream_subscriber: Subscription;
  users: any;
  
  constructor(
    public query: QueryService,
    public stream: StreamService
    ) {
      this.postsStream_subscriber = this.stream.postsStream.subscribe(
        (data) => {
          this.posts = data;
          console.log(data);
        },
        (err) => {

        }
      );
      this.usersStream_subscriber = this.stream.usersStream.subscribe(
        (data) => {
          this.users = data;
          console.log(data);
        },
        (err) => {

        }
      );
    }

  ngOnInit(): void {
    this.query.getPosts();
    this.query.getUsers();
  }

}
