import { ModuleWithProviders, NgModule } from '@angular/core';
import { HighlightDirective } from './directives/highlight.directive';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTeamMemberDirective } from './directives/addTeamMember.directive';
import { MemberComponent } from '../visit/containers/member.component';
import { AddSecurityDirective } from './directives/addSecirity.directive';
import { SecurityTemplateComponent } from '../visit/securite/containers/security-template.component';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/containers/menu.component';
import { RouterModule } from '@angular/router';

const sharedComponents = [
  MenuComponent,
  MemberComponent,
];
const sharedDirectives = [
  HighlightDirective,
  AddTeamMemberDirective,
  AddSecurityDirective,
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
    SecurityTemplateComponent,
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
