import { ModuleWithProviders, NgModule } from '@angular/core';

const sharedComponents = [];
const sharedDirectives = [];
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
