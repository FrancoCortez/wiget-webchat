import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
  ConfigSelector,
  ConversationSelector,
  InitWebChatAction,
  RootStoreState,
  RouterAction,
  RouterSelector
} from '../../store';
import {WidgetCaptionUiModel} from '../../models/ui-model/widget-caption.ui-model';
import {selectIsOpen} from '../../store/init-web-chat-store/selector';
import {filter} from 'rxjs/operators';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header-widget',
  templateUrl: './header-widget.component.html',
  styleUrls: []
})
export class HeaderWidgetComponent implements OnInit, OnDestroy {

  hidden = false;
  configToggle = false;
  widgetToggle = true;
  caption: WidgetCaptionUiModel;

  selectConfigOpen: Subscription = new Subscription();
  selectWidgetOpen: Subscription = new Subscription();
  selectIsOpen: Subscription = new Subscription();
  selectConfig: Subscription = new Subscription();
  selectAgentName: Subscription = new Subscription();
  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnDestroy(): void {
    this.selectConfigOpen.unsubscribe();
    this.selectWidgetOpen.unsubscribe();
    this.selectIsOpen.unsubscribe();
    this.selectConfig.unsubscribe();
    this.selectAgentName.unsubscribe();
  }

  ngOnInit() {
    this.selectConfigOpen = this.store.pipe(select(RouterSelector.selectConfigOpen))
      .pipe(filter(fill => fill !== null && fill !== undefined))
      .subscribe(resp => this.configToggle = resp);
    this.selectWidgetOpen = this.store.pipe(select(RouterSelector.selectWidgetOpen))
      .pipe(filter(fill => fill !== null && fill !== undefined))
      .subscribe(resp => this.widgetToggle = resp);
    this.selectIsOpen = this.store.pipe(select(selectIsOpen))
      .pipe(filter(fill => fill !== null && fill !== undefined))
      .subscribe(resp => this.hidden = !resp);
    this.selectConfig = this.store.pipe(select(ConfigSelector.selectConfig))
      .pipe(filter(fill => fill !== null && fill !== undefined))
      .subscribe(resp => {
        this.caption = {...resp.caption};
        if (this.caption.agentNameEnabled) {
          this.selectAgentName = this.store.pipe(select(ConversationSelector.selectAgentName))
            .pipe(filter(fill => fill !== null && fill !== undefined && fill !== ''))
            .subscribe(name => this.caption.title = name);
        }
      });
    this.caption.src = 'https://develop.cdn.chattigo.com/assets/img/profiles/3_dummy.png';
  }

  public toggleConfig() {
    if (this.configToggle) {
      this.store.dispatch(RouterAction.widgetOpen());
    } else if (this.widgetToggle) {
      this.store.dispatch(RouterAction.configOpen());
    }
  }

  public toggleClose() {
    this.store.dispatch(InitWebChatAction.open({payload: this.hidden}));
  }
}
