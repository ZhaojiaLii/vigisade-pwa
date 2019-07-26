import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { State } from '../../../store/app.state';
import { createDangerousSituation } from '../store/dangerous.action';
import { Observable } from 'rxjs';
import { DangerousType } from '../interfaces/dangerous-type.interface';
import { DangerousSituation } from '../interfaces/dangerous-situation.interface';
import { getUser } from '../../profile/store/profile.selector';
import { User } from '../../profile/interfaces/user';
import { getTypeDangerousSituations } from '../../../store/data/data.selectors';

@Injectable({
  providedIn: 'root',
})
export class DangerousService {

  constructor(
    private store: Store<State>,
  ) { }

  createDangerousSituation(dangerousSituation: DangerousSituation): void {
    this.store.pipe(
      select(getUser),
      filter(user => !!user && user.directionId && user.areaId && !!user.entityId),
      take(1),
    ).subscribe((user: User) => {
      const situationWithUser = {
        ...dangerousSituation,
        directionId: user.directionId,
        areaId: user.areaId,
        entityId: user.entityId,
      };

      this.store.dispatch(createDangerousSituation({dangerousSituation: situationWithUser}));
    });
  }

  getDangerousTypes(): Observable<DangerousType[]> {
    // @ts-ignore
    return this.store.pipe(select(getTypeDangerousSituations));
  }
}
