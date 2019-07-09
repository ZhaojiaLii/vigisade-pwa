import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './components/login/containers/login.component';
import { TutorialComponent } from './components/tutorial/containers/tutorial.component';
import { HomepageComponent } from './components/homepage/containers/homepage.component';
import { ProfileComponent } from './components/profile/containers/profile.component';
import { DangerousComponent } from './components/dangerous/containers/dangerous.component';
import { VisitComponent } from './components/visit/containers/visit.component';
import { ActionCorrectiveComponent } from './components/a-traiter/action-corrective/containers/action-corrective.component';
import { SecuriteComponent } from './components/visit/securite/containers/securite.component';
import { BonnePratiqueComponent } from './components/bonne-pratique/containers/bonne-pratique.component';
import { HistoriqueVisitesComponent } from './components/visit/historique-visites/containers/historique-visites.component';
import { DetailVisitComponent } from './components/visit/detail-visit/containers/detail-visit.component';
import { ATraiterComponent } from './components/a-traiter/containers/a-traiter.component';

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
    path: 'security',
    component: SecuriteComponent,
  },
  {
    path: 'bestPractice',
    component: BonnePratiqueComponent,
  },
  {
    path: 'history',
    component: HistoriqueVisitesComponent,
  },
  {
    path: 'history/:id',
    component: DetailVisitComponent,
  },
  {
    path: 'atraiter',
    component: ATraiterComponent,
  },
  {
    path: 'atraiter/:id',
    component: ActionCorrectiveComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
