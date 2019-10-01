import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {RootStoreState, RouterAction, RouterSelector} from '../../store';
import {selectConfig} from '../../store/config-store/selector';
import {CaptionLoginUiModel} from '../../models/ui-model/caption-login.ui-model';
import {ConfigPanelUiModel} from "../../models/ui-model/config-panel.ui-model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-widget-caption',
  templateUrl: './widget-caption.component.html',
  styleUrls: []
})
export class WidgetCaptionComponent implements OnInit, OnDestroy {

  public caption: CaptionLoginUiModel;
  public configPanel: ConfigPanelUiModel;
  public loginEnabled = false;
  public fistLoading: any;

  selectConfig: Subscription = new Subscription();
  selectLoginOpen: Subscription = new Subscription();
  selectFirstPage: Subscription = new Subscription();
  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnDestroy(): void {
    this.selectConfig.unsubscribe();
    this.selectLoginOpen.unsubscribe();
    this.selectFirstPage.unsubscribe();
  }

  ngOnInit() {
    this.selectConfig = this.store.pipe(select(selectConfig)).subscribe(resp => {
      this.caption = resp.captionLogin;
      this.configPanel = resp.configPanel;
    });
    this.selectLoginOpen = this.store.pipe(select(RouterSelector.selectLoginOpen)).subscribe(resp => this.loginEnabled = resp);
    this.selectFirstPage = this.store.pipe(select(RouterSelector.selectFirstPage)).subscribe(resp => this.fistLoading = resp);
  }

  back() {
    this.store.dispatch(RouterAction.buttonLogin());
  }

}
