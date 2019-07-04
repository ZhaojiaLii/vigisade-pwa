import { ModuleWithProviders, NgModule } from '@angular/core';
import { HighlightDirective } from './directives/highlight.directive';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../interceptors/token-interceptor.service';
import { AddTeamMemberDirective } from './directives/addTeamMember.directive';
import { MemberComponent } from '../visit/containers/member.component';
import { AddSecurityDirective } from './directives/addSecirity.directive';
import { SecurityTemplateComponent } from '../visit/securite/containers/security-template.component';
import { CommonModule } from '@angular/common';

const sharedComponents = [
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
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
