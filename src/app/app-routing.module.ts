import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './components/login/containers/login.component';
import { TutorialComponent } from './components/tutorial/containers/tutorial.component';
import { HomepageComponent } from './components/homepage/containers/homepage.component';
import { MenuComponent } from './components/menu/containers/menu.component';
import { ProfileComponent } from './components/profile/containers/profile.component';
import { DangerousComponent } from './components/dangerous/containers/dangerous.component';
import { VisitComponent } from './components/visit/containers/visit.component';
import { ActionCorrectiveComponent } from './components/action-corrective/action-corrective.component';
import { SecuriteComponent } from './components/securite/securite.component';

const extraOptions: ExtraOptions = {};

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'tutorial',
    component: TutorialComponent,
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'dangerous',
    component: DangerousComponent,
  },
  {
    path: 'visit',
    component: VisitComponent,
  },
  {
    path: 'correction',
    component: ActionCorrectiveComponent,
  },
  {
    path: 'securite',
    component: SecuriteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
