import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DangerousComponent } from './containers/dangerous.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    DangerousComponent,
  ],
})
export class DangerousSituationModule {}
