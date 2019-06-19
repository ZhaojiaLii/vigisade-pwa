import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSelectModule, MatToolbarModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule} from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app.component';
import { environment } from '../environments/environment';
import { SharedModule } from './components/shared/shared.module';
import { metaReducers, reducers } from './store/app.reducer';
import { AppEffects } from './store/app.effects';
import { LoginComponent } from './components/login/containers/login.component';
import { TutorialComponent } from './components/tutorial/containers/tutorial.component';
import { HomepageComponent } from './components/homepage/containers/homepage.component';
import { MenuComponent } from './components/menu/containers/menu.component';
import { ProfileComponent } from './components/profile/containers/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DangerousComponent } from './components/dangerous/containers/dangerous.component';
import { VisitComponent } from './components/visit/containers/visit.component';
import { ActionCorrectiveComponent } from './components/action-corrective/action-corrective.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TutorialComponent,
    HomepageComponent,
    MenuComponent,
    ProfileComponent,
    DangerousComponent,
    VisitComponent,
    ActionCorrectiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      maxAge: 15,
      name: 'Vigisade',
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([ AppEffects ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SharedModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
