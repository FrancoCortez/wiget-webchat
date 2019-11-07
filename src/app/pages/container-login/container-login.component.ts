import { Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {InitWebChatSelector, RootStoreState, RouterSelector} from "../../store";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-container-login',
  templateUrl: './container-login.component.html',
  styleUrls: []
})
export class ContainerLoginComponent implements OnInit, OnDestroy {

  public loginOpen = false;
  public widgetOpen = false;
  public configOpen = false;
  public buttonLogin = false;
  public toggles = false;
  public triggerHidden = false;
  public finishOpen = false;

  selectIsOpen: Subscription = new Subscription();
  selectIsTrigger: Subscription = new Subscription();
  selectLoginOpen: Subscription = new Subscription();
  selectButtonOpen: Subscription = new Subscription();
  selectWidgetOpen: Subscription = new Subscription();
  selectConfigOpen: Subscription = new Subscription();
  selectFinishOpen: Subscription = new Subscription();

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnDestroy(): void {
    this.selectIsOpen.unsubscribe();
    this.selectIsTrigger.unsubscribe();
    this.selectLoginOpen.unsubscribe();
    this.selectButtonOpen.unsubscribe();
    this.selectWidgetOpen.unsubscribe();
    this.selectConfigOpen.unsubscribe();
    this.selectFinishOpen.unsubscribe();
  }

  ngOnInit() {
    this.selectIsOpen = this.store.pipe(select(InitWebChatSelector.selectIsOpen))
      .subscribe(resp => {
        this.toggles = resp;
      });
    this.selectIsTrigger = this.store.pipe(select(InitWebChatSelector.selectIsTrigger))
      .subscribe(resp => {
        this.triggerHidden = resp;
      });
    this.selectLoginOpen = this.store.pipe(select(RouterSelector.selectLoginOpen))
      .subscribe(resp => {
        this.loginOpen = resp;
      });
    this.selectButtonOpen = this.store.pipe(select(RouterSelector.selectButtonOpen))
      .subscribe(resp => {
        this.buttonLogin = resp;
      });
    this.selectWidgetOpen = this.store.pipe(select(RouterSelector.selectWidgetOpen))
      .subscribe(resp => {
        this.widgetOpen = resp;
        this.configOpen = resp;
      });
    this.selectConfigOpen = this.store.pipe(select(RouterSelector.selectConfigOpen))
      .subscribe(resp => {
        this.configOpen = resp;
      });
    this.selectFinishOpen = this.store.pipe(select(RouterSelector.selectFinish))
      .subscribe(resp => {
        this.finishOpen = resp;
      });
  }

}
