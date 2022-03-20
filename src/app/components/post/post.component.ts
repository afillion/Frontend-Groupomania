import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryService, IPosts } from 'src/app/services/query.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public query: QueryService
  ) {this.isLoading = true;}

  post: IPosts;
  isLoading: boolean;
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.query.getOnePost(id).subscribe(
      (data: IPosts) => { this.post = data; this.isLoading = false; console.log(this.post)},
      (err) => { console.log(err); },
      () => { console.log("getOnePost complete !") }
    );
  }

}
