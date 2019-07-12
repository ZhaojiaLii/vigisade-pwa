import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './components/login/containers/login.component';
import { TutorialComponent } from './components/tutorial/containers/tutorial.component';
import { HomepageComponent } from './components/homepage/containers/homepage.component';
import { ProfileComponent } from './components/profile/containers/profile.component';
import { DangerousComponent } from './components/dangerous/containers/dangerous.component';
import { VisitComponent } from './components/visit/containers/visit.component';
import { ActionCorrectiveComponent } from './components/action-corrective/containers/action-corrective.component';
import { SecuriteComponent } from './components/securite/containers/securite.component';
import { BonnePratiqueComponent } from './components/bonne-pratique/containers/bonne-pratique.component';
import { HistoriqueVisitesComponent } from './components/historique-visites/containers/historique-visites.component';
import { DetailVisitComponent } from './components/detail-visit/containers/detail-visit.component';
import { ATraiterComponent } from './components/a-traiter/containers/a-traiter.component';
import { TokenGuard } from './services/guards/token-guard.service';

const extraOptions: ExtraOptions = {};

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'tutorial',
    component: TutorialComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'home',
    component: HomepageComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'dangerous',
    component: DangerousComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'visit',
    component: VisitComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'security',
    component: SecuriteComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'bestPractice',
    component: BonnePratiqueComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'history',
    component: HistoriqueVisitesComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'history/:id',
    component: DetailVisitComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'atraiter',
    component: ATraiterComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'atraiter/:id',
    component: ActionCorrectiveComponent,
    canActivate: [TokenGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
