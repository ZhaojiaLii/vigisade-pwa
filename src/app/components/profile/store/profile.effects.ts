import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUser, loadUserFail, loadUserSuccess, updateUser, updateUserFail, updateUserSuccess } from './profile.action';
import { catchError, map, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfileApiService } from '../services/profile-api.service';
import { ProfileService } from '../services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class ProfileEffects {
  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(loadUser),
    switchMap(() => {
      return this.profileApi.getUser().pipe(
        map(user => loadUserSuccess({user})),
        catchError(error => of(loadUserFail({error: error.message}))),
      );
    })
  ));

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateUser),
    withLatestFrom(this.profileService.getUser()),
    // @ts-ignore
    switchMap(([action, user]) => {
      const payload = {
        lastname: user.lastName,
        firstname: user.firstName,
        direction_id: action.updatedFields.directionId,
        area_id: action.updatedFields.areaId,
        entity_id: action.updatedFields.entityId,
        image: user.photo,
        language: user.language,
      };

      return this.profileApi.updateUser(payload).pipe(
        map(() => updateUserSuccess({updatedFields: action.updatedFields})),
        catchError(error => of(updateUserFail({error: error.message}))),
      );
    }),
  ));

  userUserSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(updateUserSuccess),
    tap(() => this.toastr.success(
      this.translateService.instant('Profil.Succès Votre profil a été mis à jour')
    )),
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private profileApi: ProfileApiService,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {}
}
