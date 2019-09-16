import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {TeamUiModel} from '../models/ui-model/team.ui-model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamClient {

  private serverBff = environment.bffGetAgent;

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
