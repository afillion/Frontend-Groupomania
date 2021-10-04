import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { QueryService, Users } from 'src/app/services/query.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  user: Users;
  userSub: Subscriber<Users> = new Subscriber<Users>();
  isLoading: boolean
  
  constructor(
    private query: QueryService,
    private store: StorageService
  ) { this.isLoading = true; }

  ngOnInit(): void {
    this.query.getOneUser(this.store.localStorage.userId).subscribe(
      (data: Users) => {
        this.user = data;
        this.userSub.next(data)
        this.isLoading = false;
      },
      (err) => { console.log(err); },
      () => { console.log("getUsers complete !") }
    );
  }

}
