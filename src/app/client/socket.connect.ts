import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {select, Store} from '@ngrx/store';
import {ConfigSelector, RootStoreState} from '../store';
import * as socketio from 'socket.io-client';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class SocketConnect {
  did = '';
  connected$ = new BehaviorSubject(false);
  private socket: socketio.Socket;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
    this.store.pipe(select(ConfigSelector.selectDid)).subscribe(resp => this.did = resp);
  }

  public connectToServer() {
    this.socket = socketio(environment.socketServer, {
      path: `${environment.socketPath}`,
      query: `did=${this.did}`,
      transports: [environment.socketTransports]
    });
  }

  public disconnect() {
    this.socket.disconnect();
    this.connected$.next(false);
  }

  public emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  public listen(event: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(event, data => {
        observer.next(data);
      });
      return () => this.socket.off(event);
    });
  }

  public connect() {
    this.socket.on('connection', () => {
    });
  }

}
