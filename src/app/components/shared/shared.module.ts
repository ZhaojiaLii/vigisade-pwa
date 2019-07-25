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
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
