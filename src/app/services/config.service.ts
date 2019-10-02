import {Injectable} from '@angular/core';
import {ConfigClient} from "../client/config.client";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private readonly configClient: ConfigClient) {
  }

  public getConfig(did): Observable<any> {
    return this.configClient.getConfig(did).pipe(map(data => {
      return data;
    }));
  }
}
