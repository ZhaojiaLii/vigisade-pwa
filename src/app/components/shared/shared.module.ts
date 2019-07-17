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
import { MemberComponent } from '../visit/containers/member.component';
import { SecurityTemplateComponent } from '../securite/containers/security-template.component';
import { CommonModule } from '@angular/common';
import { DetailsTeamMemberComponent } from '../history-details/components/details-team-member/details-team-member.component';
import { ATraiterElementComponent } from '../a-traiter/containers/a-traiter-element.component';
import { MenuComponent } from './components/menu/containers/menu.component';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap';

const sharedComponents = [
  MenuComponent,
  MemberComponent,
  DetailsTeamMemberComponent,
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
  ],
  entryComponents: [
    MemberComponent,
    DetailsTeamMemberComponent,
    SecurityTemplateComponent,
    ATraiterElementComponent,
  ],
  exports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    CollapseModule,
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
