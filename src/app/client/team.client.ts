import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {TeamUiModel} from '../models/ui-model/team.ui-model';

@Injectable({
  providedIn: 'root'
})
export class TeamClient {

  private serverBff = 'https://k8s-dev.chattigo.com/webchat/channel/did';

  constructor(private readonly http: HttpClient) {
  }

  public getAll(did: string): Observable<TeamUiModel[] | any> {
    return this.http.get<HttpResponse<TeamUiModel[]>>(`${this.serverBff}/${did}/agents`).pipe(
      map(data => {
        return data;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
