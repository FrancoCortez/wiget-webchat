import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {InitWebChatAction, RootStoreState} from '../../store';
import {selectIsOpen} from '../../store/init-web-chat-store/selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  public hidden = false;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(selectIsOpen)).subscribe(resp => {
      this.hidden = !resp;
    });
    this.store.pipe();
  }
  public login() {
    console.log('login');
  }

}
