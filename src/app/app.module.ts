/* ANGULAR */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

/* MATERIAL's import */
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

/* COMPONENTS */
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';

/* SERVICE */
import { QueryService } from './services/query.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ProfilComponent,
    UsersComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [
    QueryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
