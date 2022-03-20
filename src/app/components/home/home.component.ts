import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { IPosts, IComments, QueryService } from 'src/app/services/query.service';
import { StorageService } from 'src/app/services/storage.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TokenService } from 'src/app/services/token.service';
import { DialogCommentsComponent } from '../dialog-comments/dialog-comments.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts:IPosts[] = [];
  panelOpenState = false;
  newPostForm: FormGroup;
  newPostTitleCtrl= new FormControl('', [Validators.minLength(3), Validators.maxLength(30), Validators.required]);
  newPostTxtCtrl= new FormControl('', [Validators.maxLength(512), Validators.required]);
  newPostImgCtrl= new FormControl('');
  fileName = '';
  fileData:FormData;
  file:File;
    
  constructor(
    public query: QueryService,
    public store: StorageService,
    public auth: AuthService,
    private router: Router,
    public subjectsService: SubjectsService,
    public dialog: MatDialog,
    public token: TokenService,
    public fb: FormBuilder
    ) {
      this.newPostForm = fb.group({
        title: this.newPostTitleCtrl,
        txt: this.newPostTxtCtrl,
        imageUrl: this.newPostImgCtrl
      });
      // this.store.localStorage.clear(); 
    }

  ngOnInit(): void {
    this.query.getPosts().subscribe(
      (data: IPosts[]) => { this.posts = data; this.emitPosts(); console.log(this.posts)},
      (err) => { console.log(err); },
      () => { console.log("getPosts complete !") }
    );
  }

  emitPosts() {
    this.subjectsService.postsSubject.next(this.posts);
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    console.log(this.file);
    if (this.file) {
      this.fileName = this.file.name;
      // const formData = new FormData();
      // formData.append("images", file);
      // this.fileData = formData;
      // const upload$ = this.http.post("/api/thumbnail-upload", formData);
      // upload$.subscribe();
    }
  }

  updateLikes(postId: number, like:number, event: Event): void {
    event.stopPropagation();
    this.query.updateLikes(this.token.get_userId(), postId, like).subscribe(
      (res) => {
        console.log(res); 
        this.ngOnInit();
      },
      (err) => { console.log(err); },
      () => { console.log("updateLikes complete !"); }
    );
  }

  getNumberOfComments(postIndex:number):number {
    return Object.keys(this.posts[postIndex].comments).length;
  }
  
  viewComments(id): void {
    this.router.navigate(['/post/', id]);
  }

  sendComment() {
    if (this.newPostForm.invalid) {
      return;
    }
    else {
      let data:IPosts = this.newPostForm.value;
      data.userId = this.token.get_userId();
      data.imageUrl = '';
      // data.fileData = this.fileData;
      console.log(data);
      const formData:FormData = new FormData();
      formData.append('images', this.file);
      formData.append('title', data.title);
      formData.append('txt', data.txt);
      formData.append('userId', data.userId.toString());
      this.query.postPost(formData).subscribe(
        (res) => { console.log(res);},
        (err) => {console.log(err);},
        () => {console.log("postPost() complete !");}
      );
      this.newPostForm.reset();
      // reset the errors of all the controls
      for (let name in this.newPostForm.controls) {
        this.newPostForm.controls[name].setErrors(null);
      }
      this.ngOnInit();
    }
  }

  openDialog(post:IPosts) {
    const dialog_ref = this.dialog.open(DialogCommentsComponent, {
      data: {
        id: post.id,
        title: post.title,
        txt: post.txt,
        likes: post.likes,
        dislikes: post.dislikes,
        imageUrl: post.imageUrl,
        userId: post.userId,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        user: post.user,
        comments: post.comments
      },
      width: '80%',
      height: '80%'
    });
    dialog_ref.afterClosed().subscribe(
      result => { console.log('dialog result : ${result}'); }
    );
  }
}