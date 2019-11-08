import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {RootStoreState} from "../../store";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: [],
})
export class FinishComponent implements OnInit, OnDestroy {

  constructor(private readonly store: Store<RootStoreState.AppState>) {

  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
  }

}
