import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QueryService } from 'src/app/services/query.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  colorControl = new FormControl('primary');
  fontSizeControl = new FormControl(16, Validators.min(10));
  emailCtrl = new FormControl("", [Validators.email, Validators.required]);
  pwdCtrl = new FormControl("", [Validators.minLength(4), Validators.maxLength(15), Validators.required]);
  hide = true;

  constructor(
    public fb: FormBuilder,
    public query: QueryService,
    public router: Router,
    private store: StorageService
  )
  {
    this.loginForm = fb.group({
      email: this.emailCtrl,
      pwd: this.pwdCtrl,
    });
  }

  getFontSize() {
    return Math.max(10, this.fontSizeControl.value);
  }

  user_register() {
    console.log("user register : { 'apiUrl + 'users/login': ", this.query.apiUrl + "users/login", "\n 'data': ", this.loginForm.value);
    this.query.userLogin(this.loginForm.value).subscribe(
      (data) => {
        console.log("userLogin data : ", data);
        this.store.localStorage.setItem("token", data['token']);
        console.log(this.store.localStorage);
        this.router.navigate(['/home']);
      },
      (err) => { console.log("userLogin error : ", err); },
      () => { console.log("userLogin complete !"); }
    );
  }

  onSubmit() {
    console.log("test validation submit");
    if (this.loginForm.valid === true) {
      this.user_register();
    }
    this.loginForm.reset();
  }

  ngOnInit(): void {
  }

}
