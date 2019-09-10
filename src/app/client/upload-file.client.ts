import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AttachmentDto} from '../models/message/attachment.dto';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileClient {

  private serverBff = 'https://k8s-dev.chattigo.com/webchat/message/attachment/upload';

  constructor(private readonly http: HttpClient) {
  }

  public sendFile(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<HttpResponse<AttachmentDto>>(this.serverBff, formData, {
      headers:
        {did: 'demoChattigo@WC'}

    }).pipe(map(mapper => mapper));
  }
}
