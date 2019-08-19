import {Component, OnInit} from '@angular/core';
import {ButtonUiModel} from '../../models/ui-model/button.ui-model';
import {select, Store} from '@ngrx/store';
import {RootStoreState} from '../../store';
import {selectConfig} from '../../store/config-store/selector';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: []
})
export class ButtonComponent implements OnInit {

  public buttonConfig: ButtonUiModel;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(selectConfig)).subscribe(resp => this.buttonConfig = resp.button);
  }

}
