import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DangerousSituationComponent } from './containers/dangerous-situation.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    DangerousSituationComponent,
  ],
})
export class DangerousSituationModule {}
