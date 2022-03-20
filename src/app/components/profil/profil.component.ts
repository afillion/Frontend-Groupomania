import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { QueryService, IUsers } from 'src/app/services/query.service';
import { StorageService } from 'src/app/services/storage.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  user: IUsers;
  userSub: Subscriber<IUsers> = new Subscriber<IUsers>();
  isLoading: boolean
  
  constructor(
    private query: QueryService,
    private store: StorageService,
    private token: TokenService
  ) { this.isLoading = true; }

  ngOnInit(): void {
    this.query.getOneUser(this.token.get_decodedToken(this.store.localStorage.token).userId).subscribe(
      (data: IUsers) => {
        this.user = data;
        this.userSub.next(data)
        this.isLoading = false;
      },
      (err) => { console.log(err); },
      () => { console.log("getUsers complete !") }
    );
  }

}
