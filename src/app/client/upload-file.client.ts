import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AttachmentDto} from '../models/message/attachment.dto';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileClient {

  private serverBff = `${environment.bffUploadFile}`;

  constructor(private readonly http: HttpClient) {
  }

  public sendFile(file: any, did): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<HttpResponse<AttachmentDto>>(this.serverBff, formData, {
      headers:
        {did}

    }).pipe(map(mapper => mapper));
  }
}
