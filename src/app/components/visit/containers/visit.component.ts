import {SurveyService} from '../services/survey.service';
import {CreateResult} from '../interfaces/createResultInterface/createResult.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {Component, ViewChild} from '@angular/core';
import {UpdateResult} from '../interfaces/updateResultInterface/updateResult.interface';
import {AddTeamMemberDirective} from '../../shared/directives/addTeamMember.directive';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
})
export class VisitComponent {

  @ViewChild(AddTeamMemberDirective, {static: true}) appAddMemberDirective: AddTeamMemberDirective;
  isCollapsed = false;
  createResultPayload: CreateResult;
  updateResultPayload: UpdateResult;
  /**
   *  add/remove group member
   */
  teamGroup = [];
  teamGroupIndex = [];
  clicked = 0;

  /**
   *  valid form content
   */
  form = [];

  /**
   *  form control
   */
  mainForm = new FormGroup({
    entity: new FormControl(''),
    place: new FormControl(''),
    client: new FormControl(''),
    date: new FormControl(''),
  });

  constructor(
      private surveyService: SurveyService,
      ) {
  }

  getSurvey() {
      this.surveyService.getSurvey();
  }

  getResults() {
      this.surveyService.getResults();
  }

  getResultByID() {
      this.surveyService.getResult();
  }

  createResult() {
      this.surveyService.createResult(this.createResultPayload);
  }

  updateResult() {
      this.surveyService.updateResult(this.updateResultPayload);
  }

  addTeamMember() {
    this.teamGroupIndex.push(this.clicked);
    this.teamGroup.push({memberID: this.clicked, firstName: '', lastName: '', quality: '' });
    this.clicked++;
    console.log(this.teamGroupIndex);
    console.log(this.teamGroup);
  }

  updateFirstName(firstName) {
    this.teamGroup.forEach((data) => {
      if (firstName.memberID === data.memberID) {
        data.firstName = firstName.firstName;
        console.log(data);
      }
    });
  }

  updateLastName(lastName) {
    this.teamGroup.forEach((data) => {
      if (lastName.memberID === data.memberID) {
        data.lastName = lastName.lastName;
        console.log(data);
      }
    });
  }

  updateQuality(quality) {
    this.teamGroup.forEach((data) => {
      if (quality.memberID === data.memberID) {
        data.quality = quality.quality;
        console.log(data);
      }
    });
  }

  deleteTeamMember(index) {
    let countIndex = 0;
    this.teamGroup.forEach((data) => {
      console.log(index.memberID + ' deleted');
      if (index.memberID === data.memberID) {
        this.teamGroup.splice(countIndex, 1);
        this.teamGroupIndex.splice(countIndex, 1);
      }
      countIndex++;
    });
    console.log(this.teamGroup);
  }

  validForm() {
    const entity = this.mainForm.value.entity;
    const place = this.mainForm.value.place;
    const client = this.mainForm.value.client;
    const date = this.mainForm.value.date;
    this.form.push({Entity: entity, Place: place, Client: client, Date: date, Group: this.teamGroup});
    console.log(this.form);
  }
}

