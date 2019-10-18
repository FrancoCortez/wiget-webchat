import {Injectable} from '@angular/core';
import {SocketClient} from '../client/socket.client';
import {MessageDto} from '../models/message/message.dto';
import {Observable, of, throwError} from 'rxjs';
import {catchError, concatAll, map} from 'rxjs/operators';
import {ConversationAction} from "../store/conversation-store";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public socket: SocketClient) {
  }

  public login(message: MessageDto): Observable<any> {
    /*return this.socket.join(message.msisdn).pipe(
      map(() => this.socket.sendMessage(message).pipe(
        map(send => {
          console.log('send socket em')
          return send;
        }),
        catchError(error => {
          return throwError(error);
        })
        )
      ),
      catchError(error => {
        return throwError(error);
      }),
      concatAll()
    );*/
    this.socket.join(message.msisdn).subscribe(resp => 'resolved');
    const subscribe = this.socket.sendMessage(message).subscribe(resp => 'resolved');
    subscribe.unsubscribe();
    return of('resolved');
  }

  public reconnect(msisdn: string): Observable<any> {
    this.socket.join(msisdn).subscribe(resp => 'resolved');
    return of('resolved')
  }
}
