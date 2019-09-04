import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {RootStoreState} from '../../store';
import {selectConfig} from '../../store/config-store/selector';
import {CaptionLoginUiModel} from '../../models/ui-model/caption-login.ui-model';

@Component({
  selector: 'app-widget-caption',
  templateUrl: './widget-caption.component.html',
  styleUrls: []
})
export class WidgetCaptionComponent implements OnInit {

  public caption: CaptionLoginUiModel;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(selectConfig)).subscribe(resp => this.caption = resp.captionLogin);
  }

}
