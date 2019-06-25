import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetUser } from '../interfaces/getUser';
import { Store } from '@ngrx/store';
import { State } from '../../../store/app.state';
import { getUserInfo } from '../store/profile.selector';
import { getUser } from '../store/profile.action';
import { environment } from '../../../../environments/environment';
import { Survey } from '../../visit/interfaces/getSurveyInterface/survey.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements OnInit {
  constructor(
    private http: HttpClient,
    private store: Store<State>,
  ) { }

  getUser(): void {
    this.store.dispatch(getUser());
  }

  ngOnInit() {
  }

}
