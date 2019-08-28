import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigAction, ConfigSelector, RootStoreState, RouterAction, RouterSelector} from '../../store';
import {WidgetCaptionUiModel} from '../../models/ui-model/widget-caption.ui-model';

@Component({
  selector: 'app-header-widget',
  templateUrl: './header-widget.component.html',
  styleUrls: []
})
export class HeaderWidgetComponent implements OnInit {

  private configToggle = false;
  private widgetToggle = true;
  private caption: WidgetCaptionUiModel;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(RouterSelector.selectConfigOpen)).subscribe(resp => this.configToggle = resp);
    this.store.pipe(select(RouterSelector.selectWidgetOpen)).subscribe(resp => this.widgetToggle = resp);
    this.store.pipe(select(ConfigSelector.selectConfig)).subscribe(resp => this.caption = {...resp.caption});
    this.caption = {... this.caption};
    this.caption.src = 'https://develop.cdn.chattigo.com/assets/img/profiles/3_dummy.png';
  }

  public toggleConfig() {
    if (this.configToggle) {
      this.store.dispatch(RouterAction.widgetOpen());
    } else if (this.widgetToggle) {
      this.store.dispatch(RouterAction.configOpen());
    }
  }
}
