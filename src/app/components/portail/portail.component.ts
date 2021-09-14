import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-portail',
  templateUrl: './portail.component.html',
  styleUrls: ['./portail.component.scss']
})
export class PortailComponent implements OnInit {

  constructor(
    public router: Router
  ) {
  }
  
  onTabChanged(e: MatTabChangeEvent) {
    console.log(e);
    if (e.index === 0) {
      this.router.navigate(['signup']);
    }
    else if (e.index === 1) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
  }

}
