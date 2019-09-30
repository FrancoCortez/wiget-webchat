import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {RootStoreState, RouterAction, RouterSelector} from '../../store';
import {selectConfig} from '../../store/config-store/selector';
import {CaptionLoginUiModel} from '../../models/ui-model/caption-login.ui-model';
import {ConfigPanelUiModel} from "../../models/ui-model/config-panel.ui-model";

@Component({
  selector: 'app-widget-caption',
  templateUrl: './widget-caption.component.html',
  styleUrls: []
})
export class WidgetCaptionComponent implements OnInit {

  public caption: CaptionLoginUiModel;
  public configPanel: ConfigPanelUiModel;
  public loginEnabled = false;
  public fistLoading: any;
  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(selectConfig)).subscribe(resp => {
      this.caption = resp.captionLogin;
      this.configPanel = resp.configPanel;
     });
    this.store.pipe(select(RouterSelector.selectLoginOpen)).subscribe(resp => this.loginEnabled = resp);
    this.store.pipe(select(RouterSelector.selectFirstPage)).subscribe(resp => this.fistLoading = resp);
  }

  back() {
    this.store.dispatch(RouterAction.buttonLogin());
  }

}
