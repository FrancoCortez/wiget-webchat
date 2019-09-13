import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {TeamClient} from '../client/team.client';
import {TeamUiModel} from '../models/ui-model/team.ui-model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(public teamClient: TeamClient) {
  }

  public getAgents(did: string): Observable<TeamUiModel[] | any> {
    return this.teamClient.getAll(did).pipe(
      map(data => {
        data.forEach(
          (value, key) => value.photo =
            (value.photo !== undefined && value.photo !== null) ?
              value.photo :
              `https://develop.cdn.chattigo.com/assets/img/profiles/${(key + 1)}_dummy.png`);
        return data;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
