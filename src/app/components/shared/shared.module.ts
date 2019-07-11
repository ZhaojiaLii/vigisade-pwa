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
  MatNativeDateModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MemberComponent } from '../visit/containers/member.component';
import { SecurityTemplateComponent } from '../securite/containers/security-template.component';
import { CommonModule } from '@angular/common';
import { DetailMemberComponent } from '../detail-visit/containers/member.component';
import { HistoryElementComponent } from '../historique-visites/containers/history-element.component';
import { ATraiterElementComponent } from '../a-traiter/containers/a-traiter-element.component';
import { MenuComponent } from './components/menu/containers/menu.component';
import { RouterModule } from '@angular/router';

const sharedComponents = [
  MenuComponent,
  MemberComponent,
  DetailMemberComponent,
  HistoryElementComponent,
  ATraiterElementComponent,
];
const sharedDirectives = [
  HighlightDirective,
];
const sharedPipes = [];

const materialModules = [
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
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
  ],
  entryComponents: [
    MemberComponent,
    DetailMemberComponent,
    SecurityTemplateComponent,
    HistoryElementComponent,
    ATraiterElementComponent,
  ],
  exports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
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
