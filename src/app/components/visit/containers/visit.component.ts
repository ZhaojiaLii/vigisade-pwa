import { SurveyService } from '../services/survey.service';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { AddTeamMemberDirective } from '../../shared/directives/addTeamMember.directive';
import { MemberComponent } from './member.component';

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
  buttonGroup = [];
  teamMemberNum = this.buttonGroup.length;

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
    this.teamMemberNum++;
    // this.buttonGroup[this.teamMemberNum].status = false;
    this.hasTeamMember = true;
    this.hideText = true;
    this.buttonShowAdd = false;
    this.buttonHShowMinus = true;
    console.log(this.buttonGroup);
    console.log('new member added');
  }

  removeTeamMember() {
    this.teamMemberNum--;
    this.buttonGroup.splice(this.teamMemberNum, 1);
    this.hasTeamMember = false;
    this.buttonShowAdd = true;
    this.buttonHShowMinus = false;
    console.log(this.buttonGroup);
    console.log('member removed');
  }

  loadTeamComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MemberComponent);
    const componentRef = this.appAddMemberDirective.viewContainerRef.createComponent(componentFactory);
    componentRef.changeDetectorRef.detectChanges();
  }
}

