import { NgModule } from '@angular/core';  
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './modules/Auth';

import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SettingsComponent } from './pages/settings/settings.component';


const routes: Routes = [
  {path: '', component: HomeComponent}, // load the home route by default
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signup/:social', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routingComponents = [NavbarComponent, HomeComponent, SigninComponent, SignupComponent, SettingsComponent];  