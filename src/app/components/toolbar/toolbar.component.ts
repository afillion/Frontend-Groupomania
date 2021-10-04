import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isLoading: boolean;
  
  constructor(
    private router: Router,
    private store: StorageService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoading = false;
  }

  goProfil() {
    this.router.navigate(['profil']);
  }

  goHome() {
    this.router.navigate(['home']);
  }

  disconnect() {
    this.store.localStorage.clear();
    this.ngOnInit();
    this.router.navigate(['']);
  }
}
