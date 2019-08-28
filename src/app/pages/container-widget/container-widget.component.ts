import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {InitWebChatSelector, RootStoreState, RouterSelector} from '../../store';

@Component({
  selector: 'app-container-widget',
  templateUrl: './container-widget.component.html',
  styleUrls: []
})
export class ContainerWidgetComponent implements OnInit {

  public hidden = false;
  public widgetOpen = true;
  public configOpen = false;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(InitWebChatSelector.selectIsOpen)).subscribe(resp => this.hidden = !resp);
    this.store.pipe(select(RouterSelector.selectWidgetOpen)).subscribe(resp => this.widgetOpen = resp);
    this.store.pipe(select(RouterSelector.selectConfigOpen)).subscribe(resp => this.configOpen = resp);
  }

}
