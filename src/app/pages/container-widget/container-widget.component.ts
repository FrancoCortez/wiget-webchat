import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigSelector, ConversationAction, InitWebChatSelector, RootStoreState, RouterSelector} from '../../store';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-container-widget',
  templateUrl: './container-widget.component.html',
  styleUrls: []
})
export class ContainerWidgetComponent implements OnInit {

  public hidden = false;
  public widgetOpen = true;
  public configOpen = false;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
    this.store.dispatch(ConversationAction.getMessage());
  }

  ngOnInit() {
    this.store.pipe(select(ConfigSelector.selectConfig), filter(fill => ((fill.preserveHistory !== undefined || fill.preserveHistory !== null)) && fill.preserveHistory))
      .subscribe(resp => {
        this.store.subscribe(state => {
          localStorage.setItem('state', JSON.stringify(state));
        });
      });
    this.store.pipe(select(InitWebChatSelector.selectIsOpen))
      .subscribe(resp => this.hidden = !resp);
    this.store.pipe(select(RouterSelector.selectWidgetOpen))
      .pipe(filter(fill => fill !== null && fill !== undefined))
      .subscribe(resp => this.widgetOpen = resp);
    this.store.pipe(select(RouterSelector.selectConfigOpen))
      .pipe(filter(fill => fill !== null && fill !== undefined))
      .subscribe(resp => this.configOpen = resp);
  }
}
