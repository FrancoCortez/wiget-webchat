import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {
  ConfigAction,
  ConfigSelector,
  InitWebChatAction,
  InitWebChatSelector,
  RootStoreState,
  RouterAction
} from "../../store";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ButtonOptionUiModel} from "../../models/ui-model/button-option.ui-model";
import {ConfigUiModel} from "../../models/ui-model/config.ui-model";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-button-page',
  templateUrl: './button.component.html',
  styleUrls: [],
  animations: [
    trigger('enterAnimationEnter', [
      transition(':enter', [
        style({transform: 'translateY(100%)', opacity: 0}),
        animate('250ms', style({transform: 'translateY(0)', opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translateY(0)', opacity: 1}),
        animate('250ms', style({transform: 'translateY(100%)', opacity: 0}))
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
export class ButtonComponent implements OnInit, OnDestroy {
  public buttonConfig?: ButtonOptionUiModel[];
  public hidden = true;
  headerColor?: string;
  selectIsOpen: Subscription = new Subscription();
  selectConfig: Subscription = new Subscription();
  teamHidden = false;
  question = '';
  private config?: ConfigUiModel;

  constructor(private readonly store: Store<RootStoreState.AppState>, private cd: ChangeDetectorRef) {

  }

  ngOnDestroy(): void {
    this.selectIsOpen.unsubscribe();
    this.selectConfig.unsubscribe();
  }

  ngOnInit() {
    this.selectIsOpen = this.store.pipe(select(InitWebChatSelector.selectIsOpen))
      .subscribe(resp => {
        this.hidden = !resp;
        this.cd.detectChanges();
        this.cd.markForCheck();
      });
    this.selectConfig = this.store.pipe(select(ConfigSelector.selectConfig))
      .pipe(filter(fill => fill.caption !== undefined))
      .subscribe(resp => {
        this.headerColor = resp.caption.headerBackgroundColor;
        this.teamHidden = resp.showTeam;
        this.buttonConfig = resp.buttonPrefer;
        this.config = resp;
        this.question = (resp.question === undefined) ? '' : resp.question;
        this.cd.detectChanges();
        this.cd.markForCheck();
      });
  }


  public toggleClose() {
    this.store.dispatch(InitWebChatAction.open({payload: this.hidden}));
    this.cd.detectChanges();
    this.cd.markForCheck();
  }

  public navegate(index: number) {
    this.config.input = this.config.buttonPrefer[index].input;
    this.store.dispatch(ConfigAction.updateInputConfig({payload: this.config}));
    this.store.dispatch(RouterAction.loginOpen());
  }

}
