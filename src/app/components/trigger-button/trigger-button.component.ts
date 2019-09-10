import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigSelector, InitWebChatAction, RootStoreState} from '../../store';
import {selectIsOpen} from '../../store/init-web-chat-store/selector';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-trigger-button',
  templateUrl: './trigger-button.component.html',
  styleUrls: []
})
export class TriggerButtonComponent implements OnInit {

  public hidden = false;
  backgroundColor = '';

  constructor(private readonly store: Store<RootStoreState.AppState>) {

  }

  ngOnInit() {
    this.store.pipe(select(selectIsOpen))
      .subscribe(resp => this.hidden = !resp);
    this.store.pipe(select(ConfigSelector.selectConfig))
      .pipe(map(mapper => mapper.caption.headerBackgroundColor))
      .subscribe(resp => this.backgroundColor = resp);
  }

  public initWebChat() {
    this.store.dispatch(InitWebChatAction.open({payload: this.hidden}));
  }

}
