import { Component, OnInit } from '@angular/core';
import { ActionCorrectiveService } from '../../action-corrective/services/action-corrective.service';
import { Observable } from 'rxjs';
import { Correction } from '../../action-corrective/interfaces/getCorrection/correction.interface';

@Component({
  selector: 'app-a-traiter',
  templateUrl: './a-traiter.component.html',
})
export class ATraiterComponent implements OnInit {
  correction$: Observable<Correction[]> = this.correctionService.getCorrection();
  countCorrection$: Observable<number> = this.correctionService.countCorrection();
  constructor(
    private correctionService: ActionCorrectiveService,
  ) { }

  ngOnInit() {
    this.correctionService.loadCorrection();
  }

}
