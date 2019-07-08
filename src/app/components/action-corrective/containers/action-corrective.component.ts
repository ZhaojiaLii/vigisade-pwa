import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActionCorrectiveService } from '../services/action-corrective.service';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';

@Component({
  selector: 'app-action-corrective',
  templateUrl: './action-corrective.component.html',
})
export class ActionCorrectiveComponent implements OnInit {
  imgURL: any;
  fakeData: CreateCorrection = {
    id: 0,
    user_id: 0,
    survey_id: 0,
    category_id: 0,
    question_id: 0,
    dateControl: '2019',
    place: 'Paris',
    status: 'finish',
  };
  correction = new FormGroup({
    comment: new FormControl(''),
    photo: new FormControl(''),
  });
  constructor(
    private actionCorrectionService: ActionCorrectiveService
  ) {
  }

  ngOnInit() {
    this.actionCorrectionService.createCorrection(this.fakeData);
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
    console.log(this.correction.value);
  }

}
