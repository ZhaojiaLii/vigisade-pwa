import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

const sharedComponents = [];
const sharedDirectives = [];
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
  ],
  exports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ...materialModules,
    ...sharedComponents,
    ...sharedDirectives,
    ...sharedPipes,
  ],
  providers: [],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
