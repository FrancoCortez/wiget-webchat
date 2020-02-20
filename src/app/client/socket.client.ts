import {Injectable} from '@angular/core';
import {MessageDto} from '../models/message/message.dto';
import {Observable, of} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {SocketConnect} from './socket.connect';

@Injectable({
  providedIn: 'root',
})
export class SocketClient {
  constructor(private readonly socket: SocketConnect) {
  }

  public join(msisdn: string): Observable<any> {
    this.socket.connectToServer();
    return this.socket.listen('connect').pipe(
      map(() => {
        this.socket.emit(environment.joinChat, msisdn);
      })
    );
  }

  public sendMessage(message: MessageDto): Observable<string> {
    this.socket.emit(environment.sendMessage, message);
    return of('resolved');
  }

  public getMessage(): Observable<MessageDto> {
    return this.socket.listen(environment.newMessage).pipe(
      filter(fill => fill !== undefined),
      map(data => data)
    );
  }

  public getLeaveAgentChat(): Observable<any> {
    return this.socket.listen(environment.leaveAgentChat).pipe(
      map(data => data)
    )
  }

  public leave() {
    this.socket.emit(environment.leaveChat);
    this.disconnectSocket();
    return of('resolved');
  }

  private connectSocket() {
    this.socket.connect();
  }

  private disconnectSocket() {
    this.socket.disconnect();
  }
}
