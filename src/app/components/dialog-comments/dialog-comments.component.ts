import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubjectsService } from 'src/app/services/subjects.service';
import { IPosts } from 'src/app/services/query.service';

@Component({
  selector: 'app-dialog-comments',
  templateUrl: './dialog-comments.component.html',
  styleUrls: ['./dialog-comments.component.scss']
})
export class DialogCommentsComponent implements OnInit {
  
  posts:IPosts[];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:IPosts,
  public subjectsService: SubjectsService,
  ) { }
  
  ngOnInit(): void {
    this.subjectsService.postsSubject.subscribe(
      (posts:IPosts[]) => {this.posts = posts},
      (err) => {console.log("Error :" + err);},
      () => {console.log("posts stream complete !");}
    );
    console.log(this.posts);
    console.log(this.data.comments);
  }

}
