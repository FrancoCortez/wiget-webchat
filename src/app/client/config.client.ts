import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConfigClient {

  constructor(private readonly http: HttpClient) {}

  public getConfig(did): Observable<any> {
    did = did.toLowerCase();
    return this.http.get<HttpResponse<any>>(`${environment.configPath}/${did.replace('@', '-')}-${environment.configProfile}.json`).pipe(
      map(data => data),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
