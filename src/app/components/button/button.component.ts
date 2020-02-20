import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonUiModel} from '../../models/ui-model/button.ui-model';
import {select, Store} from '@ngrx/store';
import {LoginSelector, RootStoreState} from '../../store';
import {selectConfig} from '../../store/config-store/selector';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: []
})
export class ButtonComponent implements OnInit, OnDestroy {

  public buttonConfig: ButtonUiModel;
  public loginButtonEnabled: boolean = false;
  selectConfig: Subscription = new Subscription();
  selectButtonEnabled: Subscription = new Subscription();

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnDestroy(): void {
    this.selectConfig.unsubscribe();
    this.selectButtonEnabled.unsubscribe();
  }

  ngOnInit() {
    this.selectConfig = this.store.pipe(select(selectConfig)).subscribe(resp => this.buttonConfig = resp.button);
    this.selectConfig = this.store.pipe(select(LoginSelector.selectButtonLoginEnabled)).subscribe(resp => this.loginButtonEnabled = resp);
  }

}
