import { Component, Input, OnInit } from '@angular/core';
import { Correction } from '../interfaces/getCorrection/correction.interface';

@Component({
  selector: 'app-action-corrective-comment-element',
  template: `
      <div class="card-body">
          <div class="font-20 font-demiBold">{{'Atraiter.HistoriqueCommentaire' | translate}}</div>
          <div *ngFor="let comment of actionComments">
              <p class="px-10 font-14 mb-30">{{comment}}</p>
          </div>
      </div>
  `,
})
export class ActionCorrectiveCommentElementComponent implements OnInit {

  @Input() thisCorrection: Correction;
  actionComments: Array<string>;
  ngOnInit() {
    this.actionComments = this.thisCorrection.comment_question ? this.thisCorrection.comment_question.split('~') : [];
  }

}
