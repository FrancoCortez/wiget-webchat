import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {ConfigSelector, RootStoreState, RouterAction, RouterSelector} from "../../store";
import {Subscription} from "rxjs";
import {FinishContentUiModel} from "../../models/ui-model/finish-content.ui.model";

@Component({
  selector: 'app-content-finish',
  templateUrl: './content-finish.component.html',
  styleUrls: []
})
export class ContentFinishComponent implements OnInit, OnDestroy {

  selectConfig: Subscription = new Subscription();
  routerFirstPage: Subscription = new Subscription();
  content?: FinishContentUiModel;
  border?: string;
  color?: string;
  firstPageElection?: any;
  constructor(private readonly store: Store<RootStoreState.AppState>) { }

  ngOnInit(): void {
    this.selectConfig = this.store.pipe(select(ConfigSelector.selectConfig)).subscribe(resp => {
      this.content = resp.finish.content;
      this.border = `1px solid ${resp.finish.content.buttonBorderColor}`;
      this.color = `${resp.finish.content.buttonBorderColor}`;
    });
    this.routerFirstPage = this.store.pipe(select(RouterSelector.selectFirstPage)).subscribe(resp => this.firstPageElection = resp);
  }

  ngOnDestroy(): void {
    this.selectConfig.unsubscribe();
    this.routerFirstPage.unsubscribe();
  }

  public finishChat() {
    if (this.firstPageElection.button) {
      this.store.dispatch(RouterAction.buttonLogin());
    } else if (this.firstPageElection.login) {
       this.store.dispatch(RouterAction.loginOpen());
     }
  }

}
