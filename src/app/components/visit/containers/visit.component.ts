import {SurveyService} from '../services/survey.service';
import {CreateResult} from '../interfaces/createResultInterface/createResult.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
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
  buttonShowAdd = true;
  buttonHShowMinus = false;
  hasTeamMember = false;
  hideText = true;
  showText = false;
  teamGroup = [];
  teamGroupIndex = [];
  clicked = 0;

  main = new FormGroup({
    entity: new FormControl(''),
    place: new FormControl(''),
    client: new FormControl(''),
    date: new FormControl(''),
  });

  teamMember = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    quality: new FormControl(''),
  });

  constructor(
      private surveyService: SurveyService,
      private componentFactoryResolver: ComponentFactoryResolver,
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
    this.teamGroup.forEach((data) => {
      if (index.memberID === data.memberID) {
        this.teamGroup.splice(index.memberID, 1);
      }
    });
    console.log(this.teamGroup);
  }
}

