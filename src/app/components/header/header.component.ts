import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {RootStoreState} from '../../store';
import {HeaderUiModel} from '../../models/ui-model/header.ui-model';
import {selectConfig} from '../../store/config-store/selector';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  public header: HeaderUiModel;
  selectConfig: Subscription = new Subscription();

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnDestroy(): void {
    this.selectConfig.unsubscribe();
  }

  ngOnInit() {
    this.selectConfig = this.store.pipe(select(selectConfig)).subscribe(resp => this.header = resp.header);
  }


}
