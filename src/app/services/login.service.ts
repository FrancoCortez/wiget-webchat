import {Injectable} from '@angular/core';
import {SocketClient} from '../client/socket.client';
import {MessageDto} from '../models/message/message.dto';
import {Observable, throwError} from 'rxjs';
import {catchError, concatAll, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public socket: SocketClient) {
  }

  public login(message: MessageDto): Observable<any> {
    return this.socket.join(message.msisdn).pipe(
      map(() => this.socket.sendMessage(message).pipe(
        map(send => send),
        catchError(error => {
          return throwError(error);
        })
        )
      ),
      catchError(error => {
        return throwError(error);
      }),
      concatAll()
    );
  }

  public reconnect(msisdn: string): Observable<any> {
    return this.socket.join(msisdn);
  }
}
