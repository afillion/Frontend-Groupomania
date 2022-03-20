import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { PortailComponent } from './components/portail/portail.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AuthGuardGuard as AuthGuard } from './services/auth-guard.guard';
import { PostComponent } from './components/post/post.component';

const routes: Routes = [
  { path: '', component: PortailComponent},
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'profil', canActivate: [AuthGuard], component: ProfilComponent },
  { path: 'post/:id', canActivate: [AuthGuard], component: PostComponent },
  { path: '**', canActivate: [AuthGuard], component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }