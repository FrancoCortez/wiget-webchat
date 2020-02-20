import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigSelector, InitWebChatAction, RootStoreState} from '../../store';
import {selectIsOpen} from '../../store/init-web-chat-store/selector';
import {filter} from 'rxjs/operators';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-trigger-button',
  templateUrl: './trigger-button.component.html',
  styleUrls: []
})
export class TriggerButtonComponent implements OnInit, OnDestroy {

  public hidden = false;
  public mobileHidden = false;
  selectConfig: Subscription = new Subscription();
  selectIsOpen: Subscription = new Subscription();
  backgroundColor? = '';
  src? = '';
  completeTriggerClass? = false;

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnDestroy(): void {
    this.selectConfig.unsubscribe();
    this.selectIsOpen.unsubscribe();
  }

  ngOnInit() {
    this.selectIsOpen = this.store.pipe(select(selectIsOpen))
      .subscribe(resp => {
        this.hidden = !resp;
        if (window.innerWidth < 451) {
          this.mobileHidden = !resp;
        } else {
          this.mobileHidden = true;
        }
      });
    this.selectConfig = this.store.pipe(select(ConfigSelector.selectConfig))
      .pipe(filter(fill => fill.trigger !== undefined))
      .subscribe(resp => {
        if(resp.trigger.src === undefined || resp.trigger.src === null || resp.trigger.src === '') {
          this.src = 'https://cdn.chattigo.com/assets/img/isotipo-grey.svg';
          this.backgroundColor = resp.trigger.backgroundColor;
          this.completeTriggerClass = false;
        } else {
          this.src = resp.trigger.src;
          this.backgroundColor = 'none';
          this.completeTriggerClass = true;
        }
      });
  }

  public initWebChat() {
    this.store.dispatch(InitWebChatAction.open({payload: this.hidden}));
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event) {
    if (event.target.innerWidth < 451) {
      this.mobileHidden = this.hidden;
    } else {
      this.mobileHidden = true;
    }
  }

  public hiddenTrigger(): boolean {
    return true;
  }



}
