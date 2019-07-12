import { Component, OnInit } from '@angular/core';
import { ActionCorrectiveService } from '../../action-corrective/services/action-corrective.service';
import { Observable } from 'rxjs';
import { GetCorrection } from '../../action-corrective/interfaces/getCorrection/getCorrection.interface';

@Component({
  selector: 'app-a-traiter',
  templateUrl: './a-traiter.component.html',
})
export class ATraiterComponent implements OnInit {
  data = [];
  resultId = [];
  aTraiterNum = 0;
  correction$: Observable<GetCorrection> = this.correctionService.getCorrection();
  constructor(
    private correctionService: ActionCorrectiveService,
  ) { }

  ngOnInit() {
    this.correctionService.loadCorrection();
    this.correction$.skip(2).subscribe(
      corrections => {
        this.resultId = [];
        this.data.push(corrections);
        this.aTraiterNum = this.data[0].length;
        for (const correction of this.data[0]) {
          this.resultId.push(correction.result_id);
        }
      }
    );
  }

  ScrollTop() {
    window.scroll(0, 0);
  }

}
