import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  pseudoCtrl = new FormControl('', [Validators.minLength(4), Validators.maxLength(10)]);
  firstnameCtrl = new FormControl('', [Validators.minLength(4), Validators.maxLength(10)]);
  lastnameCtrl = new FormControl('', [Validators.minLength(4), Validators.maxLength(10)]);
  emailCtrl = new FormControl("", [Validators.email, Validators.required]);
  pwdCtrl = new FormControl("", [Validators.minLength(4), Validators.maxLength(15), Validators.required]);
  hide = true;
  
  constructor(
    public fb: FormBuilder,
    public query: QueryService,
    public router: Router
  )
  {
    this.signupForm = fb.group({
      pseudo: this.pseudoCtrl,
      first_name: this.firstnameCtrl,
      last_name: this.lastnameCtrl,
      email: this.emailCtrl,
      pwd: this.pwdCtrl,
    });
  }

  onSubmit() {
    console.log("test validation submit");
    if (this.signupForm.valid === true) {
      const data = this.signupForm.value;
      console.log(data);
      this.query.userSignup(data);
      this.router.navigate(['/home']);
    }
    this.signupForm.reset();
  }
  
  ngOnInit(): void {
  }

}
