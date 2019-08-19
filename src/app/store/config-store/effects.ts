import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as featureActions from './actions';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Action} from '@ngrx/store';

@Injectable()
export class ConfigStoreEffects {
  loadConfig$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(featureActions.loadConfig),
    mergeMap(action => of(action)
      .pipe(
        map(login => featureActions.loadConfigSuccess()),
        catchError(error => of(featureActions.loadConfigFailure({payload: error})))
      ))
    )
  );

  constructor(private actions$: Actions) {
  }

}
