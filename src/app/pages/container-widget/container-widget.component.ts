import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigSelector, ConversationAction, InitWebChatSelector, RootStoreState, RouterSelector} from '../../store';
import {filter} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-container-widget',
  templateUrl: './container-widget.component.html',
  styleUrls: [],
  animations: [
    trigger('enterAnimationEnter', [
      transition(':enter', [
        style({transform: 'translateX(100%)', opacity: 0}),
        animate('250ms', style({transform: 'translateX(0)', opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(0)', opacity: 1}),
        animate('250ms', style({transform: 'translateX(100%)', opacity: 0}))
      ])
    ]),
    trigger('enterAnimationFade', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500)),
    ]),
  ],
})
export class ContainerWidgetComponent implements OnInit, OnDestroy {

  public hidden = false;
  public widgetOpen = true;
  public configOpen = false;
  public finish = false;

  selectIsOpen: Subscription = new Subscription();
  selectWidgetOpen: Subscription = new Subscription();
  selectConfigOpen: Subscription = new Subscription();
  selectFinish: Subscription = new Subscription();

  constructor(private readonly store: Store<RootStoreState.AppState>,
              private cd: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.selectIsOpen.unsubscribe();
    this.selectWidgetOpen.unsubscribe();
    this.selectConfigOpen.unsubscribe();
    this.selectFinish.unsubscribe();
  }

  ngOnInit() {
    this.store.dispatch(ConversationAction.getMessage());
    console.log('container init');
    this.selectFinish = this.store.pipe(select(RouterSelector.selectFinish))
      .pipe(filter(fill => fill !== null && fill !== undefined))
      .subscribe(resp => {
        this.finish = resp;
      });
    this.store.pipe(select(ConfigSelector.selectConfig), filter(fill => ((fill.preserveHistory !== undefined || fill.preserveHistory !== null)) && fill.preserveHistory))
      .subscribe(resp => {
        this.store.subscribe(state => {
          localStorage.setItem('state', JSON.stringify(state));
        });
      });
    this.selectIsOpen = this.store.pipe(select(InitWebChatSelector.selectIsOpen))
      .subscribe(resp => {
        this.hidden = !resp;
      });
    this.selectWidgetOpen = this.store.pipe(select(RouterSelector.selectWidgetOpen))
      .pipe(filter(fill => fill !== null && fill !== undefined))
      .subscribe(resp => {
        this.widgetOpen = resp;
      });
    this.selectConfigOpen = this.store.pipe(select(RouterSelector.selectConfigOpen))
      .pipe(filter(fill => fill !== null && fill !== undefined))
      .subscribe(resp => {
        this.configOpen = resp;
      });
  }
}
