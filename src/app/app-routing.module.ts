import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './login/containers/login.component';
import { TutorialComponent } from './tutorial/containers/tutorial.component';

const extraOptions: ExtraOptions = {};

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'tutorial', component: TutorialComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
