import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './components/login/containers/login.component';
import { TutorialComponent } from './components/tutorial/containers/tutorial.component';
import { HomepageComponent } from './components/homepage/containers/homepage.component';

const extraOptions: ExtraOptions = {};

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'tutorial', component: TutorialComponent},
  {path: 'home', component: HomepageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
