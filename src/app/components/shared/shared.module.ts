import { ModuleWithProviders, NgModule } from '@angular/core';
import { HighlightDirective } from './directives/highlight.directive';

const sharedComponents = [];
const sharedDirectives = [
  HighlightDirective,
];
const sharedPipes = [];

@NgModule({
  declarations: [
    ...sharedComponents,
    ...sharedDirectives,
    ...sharedPipes,
  ],
  exports: [
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
