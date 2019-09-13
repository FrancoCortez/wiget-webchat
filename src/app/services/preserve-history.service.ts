import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreserveHistoryService {

  constructor() {
  }

  public setLoginStorage(value: any) {
    localStorage.setItem('login', JSON.stringify(value));
  }

  public setConversationStorage(value: any) {
    localStorage.setItem('conversation', JSON.stringify(value));
  }

  public setConfigStorage(value: any) {
    localStorage.setItem('config', JSON.stringify(value));
  }

  public getLoginStorage() {
    return JSON.parse(localStorage.getItem('login'));
  }

  public getConversationStorage() {
    return JSON.parse(localStorage.getItem('conversation'));
  }

  public getConfigStorage() {
    return JSON.parse(localStorage.getItem('config'));
  }
}
