import {Injectable} from '@angular/core';
import {SocketClient} from '../client/socket.client';
import {MessageDto} from '../models/message/message.dto';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public socket: SocketClient) {
  }

  public login(message: MessageDto): Observable<any> {
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
