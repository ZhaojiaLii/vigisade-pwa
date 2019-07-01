
import { State } from '../../../store/app.state';
import { getUser } from '../store/profile.action';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';


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
