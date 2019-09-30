import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {InitWebChatSelector, RootStoreState, RouterSelector} from "../../store";

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

  constructor(private readonly store: Store<RootStoreState.AppState>,
              private cd: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.cd.checkNoChanges();
    this.cd.detach();
  }

  ngOnInit() {
    this.cd.reattach();
    this.store.pipe(select(InitWebChatSelector.selectIsOpen))
      .subscribe(resp => {
        //this.cd.detectChanges();
        this.toggles = resp;
        this.cd.detectChanges();
        this.cd.markForCheck();
        //this.cd.detach();
        //this.cd.checkNoChanges();
      });
    this.store.pipe(select(InitWebChatSelector.selectIsTrigger))
      .subscribe(resp => {
        //this.cd.detectChanges();
        this.triggerHidden = resp;
        this.cd.detectChanges();
        this.cd.markForCheck();
        //this.cd.detach();
        //this.cd.checkNoChanges();
      });
    this.store.pipe(select(RouterSelector.selectLoginOpen))
      .subscribe(resp => {
        //this.cd.detectChanges();
        this.loginOpen = resp;
        this.cd.detectChanges();
        //this.cd.detach();
        this.cd.markForCheck();
        //this.cd.checkNoChanges();
      });
    this.store.pipe(select(RouterSelector.selectButtonOpen))
      .subscribe(resp => {
        //this.cd.detectChanges();
        this.buttonLogin = resp;
        this.cd.detectChanges();
        this.cd.markForCheck();
        //this.cd.checkNoChanges();
      });
    this.store.pipe(select(RouterSelector.selectWidgetOpen))
      .subscribe(resp => {
        //this.cd.detectChanges();
        this.widgetOpen = resp;
        this.configOpen = resp;
        this.cd.detectChanges();
        this.cd.markForCheck();
        //this.cd.checkNoChanges();
      });
    this.store.pipe(select(RouterSelector.selectConfigOpen))
      .subscribe(resp => {
        //this.cd.detectChanges();
        this.configOpen = resp;
        this.cd.detectChanges();
        this.cd.markForCheck();
        //this.cd.checkNoChanges();
      });

  }

}
