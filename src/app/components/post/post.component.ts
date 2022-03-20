import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QueryService, IPosts, IComments } from 'src/app/services/query.service';
import { StorageService } from 'src/app/services/storage.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public query: QueryService,
    public token: TokenService,
    public store: StorageService,
    public fb: FormBuilder
  ) {
    this.isLoading = true;
    this.newCommentForm = fb.group({
      txt: this.newCommentTxtCtrl
    });
  }

  post: IPosts;
  comment: IComments
  isLoading: boolean;
  newCommentForm: FormGroup;
  newCommentTxtCtrl = new FormControl('', [Validators.maxLength(512), Validators.required]);
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.query.getOnePost(id).subscribe(
      (data: IPosts) => { this.post = data; this.isLoading = false; console.log(this.post)},
      (err) => { console.log(err); },
      () => { console.log("getOnePost complete !") }
    );
  }

  sendComment() {
    if (this.newCommentForm.invalid) {
      return;
    }
    else {
      let data:IComments = this.newCommentForm.value;
      data.userId = this.token.get_userId();
      data.postId = this.post.id;
      console.log(data);
      this.query.postComment(data).subscribe(
        (res) => { console.log(res);},
        (err) => {console.log(err);},
        () => {console.log("postComment() complete !");}
      );
      this.newCommentForm.reset();
      // reset the errors of all the controls
      for (let name in this.newCommentForm.controls) {
        this.newCommentForm.controls[name].setErrors(null);
      }
      this.ngOnInit();
    }
  }
}
