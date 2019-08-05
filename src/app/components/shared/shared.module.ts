import { ModuleWithProviders, NgModule } from '@angular/core';
import { HighlightDirective } from './directives/highlight.directive';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule, MatProgressSpinnerModule,
  MatSelectModule,
  MatToolbarModule, MatTooltipModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ATraiterElementComponent } from '../a-traiter/containers/a-traiter-element.component';
import { MenuComponent } from './components/menu/containers/menu.component';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule, CollapseModule } from 'ngx-bootstrap';
import { MenuButtonsComponent } from './components/menu-buttons/menu-buttons.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MomentModule } from 'ngx-moment';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const sharedComponents = [
  MenuComponent,
  MenuButtonsComponent,
  ATraiterElementComponent,
];
const sharedDirectives = [
  HighlightDirective,
];
const sharedPipes = [];

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatToolbarModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [
    ...sharedComponents,
    ...sharedDirectives,
    ...sharedPipes,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ...materialModules,
    MatDialogModule,
    CommonModule,
    RouterModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MomentModule
  ],
  entryComponents: [
    ATraiterElementComponent,
  ],
  exports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    CollapseModule,
    BsDatepickerModule,
    ...materialModules,
    ...sharedComponents,
    ...sharedDirectives,
    ...sharedPipes,
    TranslateModule,
    MomentModule
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
