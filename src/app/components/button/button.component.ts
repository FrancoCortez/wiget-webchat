import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonUiModel} from '../../models/ui-model/button.ui-model';
import {select, Store} from '@ngrx/store';
import {RootStoreState} from '../../store';
import {selectConfig} from '../../store/config-store/selector';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: []
})
export class ButtonComponent implements OnInit, OnDestroy {

  public buttonConfig: ButtonUiModel;
  selectConfig: Subscription = new Subscription();
  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }
  ngOnDestroy(): void {
    this.selectConfig.unsubscribe();
  }

  ngOnInit() {
    this.selectConfig = this.store.pipe(select(selectConfig)).subscribe(resp => this.buttonConfig = resp.button);
  }

}
