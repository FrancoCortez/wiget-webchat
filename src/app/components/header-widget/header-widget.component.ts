import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigSelector, InitWebChatAction, RootStoreState, RouterAction, RouterSelector} from '../../store';
import {WidgetCaptionUiModel} from '../../models/ui-model/widget-caption.ui-model';
import {selectIsOpen} from '../../store/init-web-chat-store/selector';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-header-widget',
  templateUrl: './header-widget.component.html',
  styleUrls: []
})
export class HeaderWidgetComponent implements OnInit {

  private configToggle = false;
  private widgetToggle = true;
  private caption: WidgetCaptionUiModel;
  public hidden = false;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(RouterSelector.selectConfigOpen))
      .pipe(filter(fill => fill !== null && fill !== undefined))
      .subscribe(resp => this.configToggle = resp);
    this.store.pipe(select(RouterSelector.selectWidgetOpen))
      .pipe(filter(fill => fill !== null && fill !== undefined))
      .subscribe(resp => this.widgetToggle = resp);
    this.store.pipe(select(ConfigSelector.selectConfig))
      .pipe(filter(fill => fill !== null && fill !== undefined))
      .subscribe(resp => this.caption = {...resp.caption});
    this.store.pipe(select(selectIsOpen))
      .pipe(filter(fill => fill !== null && fill !== undefined))
      .subscribe(resp => this.hidden = !resp);
    this.caption = {...this.caption};
    this.caption.src = 'https://develop.cdn.chattigo.com/assets/img/profiles/3_dummy.png';
  }

  public toggleConfig() {
    if (this.configToggle) {
      this.store.dispatch(RouterAction.widgetOpen());
    } else if (this.widgetToggle) {
      this.store.dispatch(RouterAction.configOpen());
    }
  }

  public toogleClose() {
    this.store.dispatch(InitWebChatAction.open({payload: this.hidden}));
  }
}
