import { SurveyService } from '../services/survey.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Survey } from '../interfaces/getSurveys/survey.interface';
import { Observable } from 'rxjs';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { User } from '../../profile/interfaces/user';
import { ProfileService } from '../../profile/services/profile.service';
import { DataService } from '../../../services/data.service';
import { Area } from '../../shared/interfaces/area.interface';
import { Entity } from '../../shared/interfaces/entity.interface';
import { HistoryService } from '../../history/services/history.service';
import { TeamMember } from '../interfaces/getSurveys/team-member.interface';
import { Category } from '../interfaces/getSurveys/category.interface';
import { BEST_PRACTICE_CATEGORY_ID } from '../interfaces/getResultInterface/bestPractice.interface';
import { Direction } from '../../shared/interfaces/direction.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss'],
})
export class VisitComponent implements OnInit {

  isCollapsed = false;
  createResultPayload: CreateResult;
  updateResultPayload: UpdateResult;
  questionDone = 0;

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

  survey$: Observable<Survey> = this.surveyService.getSurveyOfUser();
  user$: Observable<User> = this.profileService.getUser();
  areas$: Observable<Area[]> = this.dataService.getAreas();
  entities$: Observable<Entity[]> = this.dataService.getEntities();
  directions$: Observable<Direction[]> = this.dataService.getDirections();
  resultSurveyId: number;
  resultUserId: number;
  resultAreaId: number;
  resultEntityId: number;
  userDirectionId: number;
  userDirection: string;
  entities = [];
  areas = [];
  questionNum = 0;
  data = [];

  selectedCategory$: Observable<Category> = this.surveyService.getSurveySelectedCategory();

  bestPracticeId = BEST_PRACTICE_CATEGORY_ID;

  constructor(
    private surveyService: SurveyService,
    private historyService: HistoryService,
    private profileService: ProfileService,
    private dataService: DataService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.userDirectionId = user.directionId;
      this.resultUserId = user.id;
      this.resultAreaId = user.areaId;
    });
    this.directions$.subscribe(directions => {
      for (const direction of directions) {
        if (direction.id === this.userDirectionId) {
          this.userDirection = direction.name;
        }
      }
    });
    this.areas$.subscribe(areas => {
      for (const area of areas) {
        if (area.direction === this.userDirectionId) {
          this.areas.push(area);
        }
      }
    });
    this.entities$.subscribe(entities => {
      for (const entity of entities) {
        for (const area of this.areas) {
          if (area.id === entity.area_id) {
            this.entities.push(entity);
          }
        }
      }
    });
    this.survey$.subscribe(survey => {
      this.resultSurveyId = survey.surveyId;
      const categories = survey.surveyCategories;
      let questionNum;
      for (const category of categories) {
        questionNum = category.surveyQuestion.length;
        this.calculateTotalQuestionNum(questionNum);
      }
    });
    this.onChanged();
  }

  calculateTotalQuestionNum(question: number) {
    this.questionNum = this.questionNum + question;
  }

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

  onChanged() {
    this.mainForm.valueChanges.subscribe(
      val => {
        this.questionDone = 0;
        for (const item in val) {
          if (val[item] !== '') {
            this.questionDone++;
          }
        }
      }
    );
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

  postForm() {
    const POST: CreateResult = {
      resultId: null,
      resultSurveyId: this.resultSurveyId,
      resultUserId: this.resultUserId,
      resultDirectionId: this.userDirectionId,
      resultAreaId: this.resultAreaId,
      resultEntityId: this.mainForm.value.entity,
    };
    this.toastrService.success('success');
  }

  postAlert() {
    this.toastrService.error('champs vide');
  }
}

