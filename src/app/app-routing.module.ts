import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { PortailComponent } from './components/portail/portail.component';
import { ProfilComponent } from './components/profil/profil.component';

const routes: Routes = [
  { path: '', component: PortailComponent},
  { path: 'home', component: HomeComponent },
  { path: 'profil', component: ProfilComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
