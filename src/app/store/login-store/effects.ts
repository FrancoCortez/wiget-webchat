import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as featureActions from './actions';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Action} from '@ngrx/store';

@Injectable()
export class LoginStoreEffects {
  login$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(featureActions.login),
    mergeMap(action => of(action)
      .pipe(
        map(login => featureActions.loginSuccess()),
        catchError(error => of(featureActions.loginFailure({payload: error})))
      ))
    )
  );

  constructor(private actions$: Actions) {
  }

}
