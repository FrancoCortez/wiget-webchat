import {Injectable} from '@angular/core';
import {SocketClient} from '../client/socket.client';
import {MessageDto} from '../models/message/message.dto';
import {Observable, throwError} from 'rxjs';
import {catchError, concatAll, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
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
              `https://develop.cdn.chattigo.com/assets/img/profiles/${key}_dummy.png`);
        return data;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
