import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {ConfigSelector, InitWebChatAction, InitWebChatSelector, RootStoreState} from "../../store";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {ConfigUiModel} from "../../models/ui-model/config.ui-model";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: [],
})
export class FinishComponent implements OnInit, OnDestroy {
  public hidden = true;
  selectIsOpen: Subscription = new Subscription();
  public headerColor: string;
  selectConfig: Subscription = new Subscription();
  config: ConfigUiModel;
  constructor(private readonly store: Store<RootStoreState.AppState>) {

  }

  ngOnInit() {
    this.selectIsOpen = this.store.pipe(select(InitWebChatSelector.selectIsOpen))
      .subscribe(resp => {
        this.hidden = !resp;
      });
    this.selectConfig = this.store.pipe(select(ConfigSelector.selectConfig))
      .pipe(filter(fill => fill.caption !== undefined))
      .subscribe(resp => {
        this.headerColor = resp.caption.headerBackgroundColor;
        this.config = resp;
      });
  }

  ngOnDestroy(): void {
    this.selectIsOpen.unsubscribe();
    this.selectConfig.unsubscribe();
  }

  public toggleClose() {
    this.store.dispatch(InitWebChatAction.open({payload: this.hidden}));
  }

}
