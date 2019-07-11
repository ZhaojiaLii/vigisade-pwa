import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSelectModule, MatToolbarModule, MatNativeDateModule, MatProgressSpinnerModule, MatTooltipModule, } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule} from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app.component';
import { environment } from '../environments/environment';
import { SharedModule } from './components/shared/shared.module';
import { metaReducers, reducers } from './store/app.reducer';
import { LoginComponent } from './components/login/containers/login.component';
import { TutorialComponent } from './components/tutorial/containers/tutorial.component';
import { HomepageComponent } from './components/homepage/containers/homepage.component';
import { ProfileComponent } from './components/profile/containers/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DangerousComponent } from './components/dangerous/containers/dangerous.component';
import { VisitComponent } from './components/visit/containers/visit.component';
import { ActionCorrectiveComponent } from './components/action-corrective/containers/action-corrective.component';
import { SecuriteComponent } from './components/securite/containers/securite.component';
import { loginFeature } from './components/login/store/login.feature';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { surveyFeature } from './components/visit/store/survey.feature';
import { profileFeature } from './components/profile/store/profile.feature';
import { SecurityTemplateComponent } from './components/securite/containers/security-template.component';
import { BonnePratiqueComponent } from './components/bonne-pratique/containers/bonne-pratique.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';
import { HistoriqueVisitesComponent } from './components/historique-visites/containers/historique-visites.component';
import { correctionFeature } from './components/action-corrective/store/correction.features';
import { DetailVisitComponent } from './components/detail-visit/containers/detail-visit.component';
import { ToastrModule } from 'ngx-toastr';
import { ATraiterComponent } from './components/a-traiter/containers/a-traiter.component';
import { ApiInterceptor } from './services/api-interceptor.service';
import { layoutFeature } from './store/layout/layout.feature';
import { dataFeature } from './store/data/data.feature';
import { EffectsModule } from '@ngrx/effects';

const pageComponents = [
  LoginComponent,
  TutorialComponent,
  HomepageComponent,
  ProfileComponent,
  DangerousComponent,
  VisitComponent,
];

const ngrxFeatures = [
  dataFeature,
  layoutFeature,
  correctionFeature,
  loginFeature,
  profileFeature,
  surveyFeature,
];

@NgModule({
  declarations: [
    AppComponent,
    ...pageComponents,
    LoginComponent,
    TutorialComponent,
    HomepageComponent,
    ProfileComponent,
    DangerousComponent,
    VisitComponent,
    ActionCorrectiveComponent,
    SecuriteComponent,
    SecurityTemplateComponent,
    BonnePratiqueComponent,
    BonnePratiqueComponent,
    HistoriqueVisitesComponent,
    DetailVisitComponent,
    ATraiterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    ...ngrxFeatures,
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 15,
      name: 'Vigisade',
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    SharedModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-center-center',
      preventDuplicates: true,
    }),
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    CollapseModule,
    FormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
