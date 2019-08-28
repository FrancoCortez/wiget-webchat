import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {RootStoreState, RouterAction} from '../../store';

@Component({
  selector: 'app-widget-config',
  templateUrl: './widget-config.component.html',
  styleUrls: []
})
export class WidgetConfigComponent implements OnInit {

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit() {

  }

  closeChat() {
    this.store.dispatch(RouterAction.loginOpen());
  }

}
