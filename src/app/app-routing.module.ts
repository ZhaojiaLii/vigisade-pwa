import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './components/login/containers/login.component';
import { TutorialComponent } from './components/tutorial/containers/tutorial.component';
import { HomepageComponent } from './components/homepage/containers/homepage.component';
import { MenuComponent } from './components/menu/containers/menu.component';
import { ProfileComponent } from './components/profile/containers/profile.component';

const extraOptions: ExtraOptions = {};

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'tutorial', component: TutorialComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
