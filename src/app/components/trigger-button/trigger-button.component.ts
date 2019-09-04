import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {InitWebChatAction, RootStoreState} from '../../store';
import {selectIsOpen} from '../../store/init-web-chat-store/selector';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-trigger-button',
  templateUrl: './trigger-button.component.html',
  styleUrls: []
})
export class TriggerButtonComponent implements OnInit {

  public hidden = false;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(selectIsOpen))
      .pipe(filter(fill => fill !== null && fill !== undefined))
      .subscribe(resp => this.hidden = !resp);
  }

  public initWebChat() {
    this.store.dispatch(InitWebChatAction.open({payload: this.hidden}));
  }

}
