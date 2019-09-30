import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonUiModel} from "../../models/ui-model/button.ui-model";
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
import {InputUiModel} from "../../models/ui-model/input.ui-model";
import {Subscription} from "rxjs";

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
  public buttonConfig: ButtonOptionUiModel[];
  public hidden = true;
  private config: ConfigUiModel;
  headerColor: string;
  selectIsOpen: Subscription = new Subscription();
  selectConfig: Subscription = new Subscription();
  teamHidden = false;
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
    this.selectConfig = this.store.pipe(select(ConfigSelector.selectConfig)).subscribe(resp => {
      this.headerColor = resp.caption.headerBackgroundColor;
      this.buttonConfig = resp.buttonPrefer;
      this.teamHidden = resp.showTeam;
      this.config = resp;
    });

    this.selectConfig = this.store.pipe(select(ConfigSelector.selectConfig)).subscribe(resp => {
      this.headerColor = resp.caption.headerBackgroundColor;
      this.teamHidden = resp.showTeam;
    });
  }


  public toggleClose() {
    this.store.dispatch(InitWebChatAction.open({payload: this.hidden}));
  }

  public navegate(index: number) {
    // const input: InputUiModel =
    this.config.input = this.config.buttonPrefer[index].input;
    this.store.dispatch(ConfigAction.updateInputConfig({payload: this.config}));
    this.store.dispatch(RouterAction.loginOpen());
  }

}
