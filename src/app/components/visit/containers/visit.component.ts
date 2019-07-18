import { SurveyService } from '../services/survey.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Survey } from '../interfaces/survey.interface';
import { Observable } from 'rxjs';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { User } from '../../profile/interfaces/user';
import { ProfileService } from '../../profile/services/profile.service';
import { DataService } from '../../../services/data.service';
import { Area } from '../../shared/interfaces/area.interface';
import { Entity } from '../../shared/interfaces/entity.interface';
import { HistoryService } from '../../history/services/history.service';
import { TeamMember } from '../interfaces/team-member.interface';
import { Category } from '../interfaces/category.interface';
import { BEST_PRACTICE_CATEGORY_ID } from '../interfaces/getResultInterface/bestPractice.interface';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss'],
})
export class VisitComponent {

  isCollapsed = false;
  createResultPayload: CreateResult;
  updateResultPayload: UpdateResult;

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
  teamMembers: TeamMember[] = [{}];

  date = 'Tue Jul 02 2019 17:24:05 GMT+0200 (heure d’été d’Europe centrale)';

  survey$: Observable<Survey> = this.surveyService.getSurveyOfUser();
  user$: Observable<User> = this.profileService.getUser();
  areas$: Observable<Area[]> = this.dataService.getAreas();
  entities$: Observable<Entity[]> = this.dataService.getEntities();

  data = [];

  selectedCategory$: Observable<Category> = this.surveyService.getSurveySelectedCategory();

  bestPracticeId = BEST_PRACTICE_CATEGORY_ID;

  constructor(
    private surveyService: SurveyService,
    private historyService: HistoryService,
    private profileService: ProfileService,
    private dataService: DataService,
  ) {}

  getMemberIndexes(): number[] {
    return this.teamMembers.map((m, i) => i);
  }

  updateTeamMember(updatedMember: TeamMember, updatedMemberIndex: number): void {
    this.teamMembers = this.teamMembers.map((member, index) => {
      return index === updatedMemberIndex ? updatedMember : member;
    });
  }

  addTeamMember(): void {
    this.teamMembers = this.teamMembers.concat({});
  }

  removeTeamMember(removedMemberIndex: number): void {
    this.teamMembers = this.teamMembers.filter((member, index) => {
      return index !== removedMemberIndex;
    });
  }

  selectSurveyCategory(id: number): void {
    this.isCollapsed = false;
    this.surveyService.selectSurveyCategory(id);
  }

  getSelection(selection) {
    this.data.forEach((data) => {
      if (selection.label === data.label) {
        data.selection = selection.selection;
        // console.log(data);
      }
    });
  }
  getComment(comment) {
    this.data.forEach((data) => {
      if (comment.label === data.label) {
        data.comment = comment.comment;
        // console.log(data);
      }
    });
  }
  getPhoto(photo) {
    this.data.forEach((data) => {
      if (photo.label === data.label) {
        data.photo = photo.photo;
        // console.log(data);
      }
    });
  }
}

