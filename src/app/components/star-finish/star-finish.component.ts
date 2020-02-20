import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {PreserveSelectionAction, PreserveSelectionSelector, RootStoreState} from "../../store";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-star-finish',
  templateUrl: './star-finish.component.html',
  styleUrls: []
})
export class StarFinishComponent implements OnInit, OnDestroy {
  starList = [];
  public positionSelected: number;
  selectPreserveStar: Subscription = new Subscription();

  constructor(private readonly store: Store<RootStoreState.AppState>) { }

  ngOnInit() {
    this.starList = [
      {class: 'icon-star', position: 1},
      {class: 'icon-star', position: 2},
      {class: 'icon-star', position: 3},
      {class: 'icon-star', position: 4},
      {class: 'icon-star', position: 5},
    ];
    this.selectPreserveStar = this.store.pipe(select(PreserveSelectionSelector.selectPreserveStar), filter(fill => (fill !== undefined && fill !== null)))
      .subscribe(resp => {
      this.positionSelected = resp.selectedStar;
      this.preselected(this.positionSelected);
    });
  }

  ngOnDestroy(): void {
    this.selectPreserveStar.unsubscribe();
  }

  private preselected(position: number) {
    this.starList.forEach(row => {
      if(row.position <= position) {
        row.class = 'icon-star-filled';
      } else {
        row.class = 'icon-star';
      }
    });
  }

  public selectStart(position: number) {
    this.store.dispatch(PreserveSelectionAction.starPreserve({ payload: { selectedStar: position}}));
    this.preselected(position);
  }

}
