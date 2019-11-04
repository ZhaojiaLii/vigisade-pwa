import { Component, Input, OnInit } from '@angular/core';
import { Correction } from '../interfaces/getCorrection/correction.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-action-corrective-comment-element',
  template: `
      <div class="card-body">
          <div class="font-20 font-demiBold">{{'Atraiter.HistoriqueCommentaire' | translate}}</div>
          <p class="px-10 font-14 mb-30" *ngIf="dangerousComments">{{dangerousComments}}</p>
          <div *ngFor="let comment of actionComments">
              <p class="px-10 font-14 mb-30">{{comment}}</p>
          </div>
      </div>
  `,
})
export class ActionCorrectiveCommentElementComponent implements OnInit {

  @Input() thisCorrection: Correction;
  actionComments: Array<string>;
  dangerousComments: string;
  ngOnInit() {
    const date = moment(this.thisCorrection.date).format('DD/MM');
    const name = this.thisCorrection.resultUserfirstName + ' ' + this.thisCorrection.resultUserlastName;
    const dangerousComment = this.thisCorrection.dangerous_situation_comment;
    this.actionComments = this.thisCorrection.comment_question ? this.thisCorrection.comment_question.split('~') : [];
    this.dangerousComments = this.thisCorrection.dangerous_situation_comment ? `${date} - ${name} - ${dangerousComment}` : '';
  }

}
