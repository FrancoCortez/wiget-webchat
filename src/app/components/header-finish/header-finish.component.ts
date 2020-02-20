import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {ConfigSelector, RootStoreState, RouterSelector} from "../../store";
import {HeaderFinishUiModel} from "../../models/ui-model/header-finish.ui-model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header-finish',
  templateUrl: './header-finish.component.html',
  styleUrls: []
})
export class HeaderFinishComponent implements OnInit, OnDestroy {
  public header?: HeaderFinishUiModel;
  selectConfig: Subscription = new Subscription();
  constructor(private readonly store: Store<RootStoreState.AppState>) { }

  ngOnInit() {
    this.selectConfig = this.store.pipe(select(ConfigSelector.selectConfig)).subscribe(resp => this.header = resp.finish.header);
  }

  ngOnDestroy(): void {
    this.selectConfig.unsubscribe();
  }

}
