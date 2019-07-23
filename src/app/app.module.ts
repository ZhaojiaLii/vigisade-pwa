import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisitComponent } from './components/visit/containers/visit.component';
import { ActionCorrectiveComponent } from './components/action-corrective/containers/action-corrective.component';
import { SecuriteComponent } from './components/securite/containers/securite.component';
import { loginFeature } from './components/login/store/login.feature';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { surveyFeature } from './components/visit/store/survey.feature';
import { profileFeature } from './components/profile/store/profile.feature';
import { SurveyQuestionComponent } from './components/visit/components/survey-question/survey-question.component';
import { BonnePratiqueComponent } from './components/bonne-pratique/containers/bonne-pratique.component';
import { correctionFeature } from './components/action-corrective/store/correction.features';
import { ToastrModule } from 'ngx-toastr';
import { ATraiterComponent } from './components/a-traiter/containers/a-traiter.component';
import { ApiInterceptor } from './services/interceptors/api-interceptor.service';
import { layoutFeature } from './store/layout/layout.feature';
import { dataFeature } from './store/data/data.feature';
import { EffectsModule } from '@ngrx/effects';
import { HistoryModule } from './components/history/history.module';
import { dangerousFeature } from './components/dangerous/store/dangerous.features';
import localeFr from '@angular/common/locales/fr';
import { DangerousSituationModule } from './components/dangerous/dangerous-situation.module';
import { HistoryDetailsModule } from './components/history-details/history-details.module';
import { historyFeature } from './components/history/store/history.feature';

registerLocaleData(localeFr);

const pageComponents = [
  LoginComponent,
  TutorialComponent,
  HomepageComponent,
  ProfileComponent,
  VisitComponent,
];

const pageModules = [
  DangerousSituationModule,
  HistoryModule,
  HistoryDetailsModule,
];

const ngrxFeatures = [
  dataFeature,
  correctionFeature,
  dangerousFeature,
  historyFeature,
  layoutFeature,
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
    VisitComponent,
    ActionCorrectiveComponent,
    SecuriteComponent,
    SurveyQuestionComponent,
    BonnePratiqueComponent,
    BonnePratiqueComponent,
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
      name: 'Vigisade ' + (environment.production ? 'Prod' : 'Dev'),
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SharedModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-center-center',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ...pageModules,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
