import { Injectable } from '@angular/core';
import {MessageDto} from '../models/message/message.dto';
import { Socket } from 'ngx-socket-io';
import {Observable, of} from 'rxjs';
import {filter, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root',

})
export class SocketClient {
  constructor(private readonly socket: Socket) { }

  public join(msisdn: string): Observable<string> {
    this.socket.emit('join-chat', msisdn);
    return of('resolved');
  }

  public sendMessage(message: MessageDto): Observable<string> {
    this.socket.emit('sendMessage', message);
    return of('resolved');
  }

  public getMessage(): Observable<MessageDto> {
    return this.socket.fromEvent<MessageDto>('newMessage').pipe(
      filter(fill => fill !== undefined),
      map(data => data)
    );
  }
}
