import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {RootStoreState} from '../../store';
import {HeaderUiModel} from '../../models/ui-model/header.ui-model';
import {selectConfig} from '../../store/config-store/selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  public header: HeaderUiModel;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(selectConfig)).subscribe(resp => this.header = resp.header);
  }

}
