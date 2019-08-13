import { Component, OnInit } from '@angular/core';
import { ActionCorrectiveService } from '../../action-corrective/services/action-corrective.service';
import { Observable } from 'rxjs';
import { Correction } from '../../action-corrective/interfaces/getCorrection/correction.interface';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-a-traiter',
  templateUrl: './a-traiter.component.html',
})
export class ATraiterComponent implements OnInit {
  correction$: Observable<Correction[]>;
  countCorrection$: Observable<number>;

  isDesktop = false;

  constructor(
    private correctionService: ActionCorrectiveService,
    private deviceService: DeviceDetectorService,
  ) { }

  ngOnInit() {

    this.correctionService.loadCorrection();

    this.isDesktop = this.deviceService.isDesktop();

    if (this.deviceService.isDesktop()) {
      this.correction$ = this.correctionService.getCorrection();
      this.countCorrection$ = this.correctionService.countCorrection();
    } else {
      this.correction$ = this.correctionService.getMobileCorrection();
      this.countCorrection$ = this.correctionService.countMobileCorrection();
    }
  }

}
