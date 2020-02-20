import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as featureActions from './actions';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Action} from '@ngrx/store';

@Injectable()
export class TeamStoreEffects {
  getTeam$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(featureActions.team),
    mergeMap(action => of(action)
      .pipe(
        map(team => featureActions.teamSuccess()),
        catchError(error => of(featureActions.teamFailure({payload: error})))
      ))
    )
  );

  constructor(private actions$: Actions) {
  }

}
