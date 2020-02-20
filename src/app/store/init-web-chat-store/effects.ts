import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as featureActions from './actions';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Action} from '@ngrx/store';

@Injectable()
export class InitWebChatStoreEffects {

  initWebChat$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(featureActions.open),
    mergeMap(action => of(action)
      .pipe(
        map(open => featureActions.openSuccess()),
        catchError(error => of(featureActions.openFailure({payload: error})))
      ))
    )
  );

  constructor(private actions$: Actions) {
  }

}
