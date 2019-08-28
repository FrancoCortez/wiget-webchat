import { Injectable } from '@angular/core';
import {MessageDto} from '../models/message/message.dto';
import { Socket } from 'ngx-socket-io';
import {Observable, of} from 'rxjs';
@Injectable({
  providedIn: 'root',

})
export class SocketClient {
  constructor(private readonly socket: Socket) { }

  public join(msisdn: string): Observable<any> {
    this.socket.emit('join-chat', msisdn);
    return of('resolved');
  }

  public sendMessage(message: MessageDto): Observable<any> {
    this.socket.emit('sendMessage', message);
    return of('resolved');
  }

  public getMessage(): Observable<any> {
    console.log('Entre al coso')
    return this.socket.fromEvent<any>('newMessage');
  }
}
