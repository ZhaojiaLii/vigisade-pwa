import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActionCorrectiveService } from '../services/action-corrective.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetCorrection } from '../interfaces/getCorrection/getCorrection.interface';
import { Observable } from 'rxjs';
import { SurveyService } from '../../visit/services/survey.service';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';
import { HistoryService } from '../../history/services/history.service';
import { Result } from '../../visit/interfaces/result.interface';


@Component({
  selector: 'app-action-corrective',
  templateUrl: './action-corrective.component.html',
})
export class ActionCorrectiveComponent implements OnInit {
  imgURL: any;
  selectedId: number;
  correction = new FormGroup({
    comment: new FormControl(''),
    photo: new FormControl(''),
  });
  corrections = [];
  thisCorrection: any;
  correction$: Observable<GetCorrection> = this.correctionService.getCorrection();
  result$: Observable<Result> = this.historyService.getResult();
  constructor(
    private correctionService: ActionCorrectiveService,
    private surveyService: SurveyService,
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedId = +params.get('id');
      this.historyService.loadResult(this.selectedId);
    });
    this.correction$.subscribe(
      corrections => {
        this.corrections.push(corrections);
        for (const correction of this.corrections[0]) {
          if (correction.id === this.selectedId) {
            this.thisCorrection = correction;
          }
        }
      }
    );
  }

  clickBack() {
    history.go(-1);
  }

  preview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (Event: any) => {
        this.imgURL = Event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      // this.photoChanged();
    }
  }

  validForm() {
    if (this.correction.value.comment === '' || this.correction.value.photo === '') {
      this.toastrService.error('champs vide');
    } else {
      const correctionPayload: CreateCorrection = {
        id: this.thisCorrection.id,
        user_id: 2,
        survey_id: this.thisCorrection.survey_id,
        category_id: this.thisCorrection.category_id,
        question_id: this.thisCorrection.question_id,
        result_id: this.thisCorrection.result_id,
        status: 'Validé',
        comment_question: this.correction.value.comment,
        image: 'photo path',
      };
      console.log(correctionPayload);
      this.correctionService.updateCorrection(correctionPayload);
      this.toastrService.success('maj succèss');
      this.router.navigate(['/atraiter']);
      window.scroll(0, 0);
    }
    console.log(this.correction.value);
  }

}
