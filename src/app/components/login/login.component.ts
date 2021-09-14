import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  pwdCtrl = new FormControl("", [Validators.minLength(5), Validators.maxLength(15), Validators.required]);
  hide = true;

  constructor(public fb: FormBuilder, public httpClient: HttpClient) {
    this.loginForm = fb.group({
      email: this.emailCtrl,
      pwd: this.pwdCtrl,
    });
  }

  getFontSize() {
    return Math.max(10, this.fontSizeControl.value);
  }

  user_register() {
    this.httpClient
    .post('https://httpclient-demo.firebaseio.com/appareils.json', this.fb)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  onSubmit() {
    console.log("test validation submit");
    if (this.loginForm.valid === true) {
      console.log("TRUE");
    }
    this.loginForm.reset();
  }

  ngOnInit(): void {
  }

}
