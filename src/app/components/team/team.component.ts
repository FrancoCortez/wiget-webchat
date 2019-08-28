import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {RootStoreState, TeamAction} from '../../store';
import {TeamUiModel} from '../../models/ui-model/team.ui-model';
import {selectTeam} from '../../store/team-store/selector';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: []
})
export class TeamComponent implements OnInit {

  teamList: TeamUiModel[] = [];

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(TeamAction.team({payload: null}));
    this.store.pipe(select(selectTeam))
      .subscribe(resp => {
        this.teamList = [];
        const temp1: TeamUiModel = {src: 'https://develop.cdn.chattigo.com/assets/img/profiles/1_dummy.png'};
        const temp2: TeamUiModel = {src: 'https://develop.cdn.chattigo.com/assets/img/profiles/2_dummy.png'};
        const temp3: TeamUiModel = {src: 'https://develop.cdn.chattigo.com/assets/img/profiles/3_dummy.png'};
        const temp4: TeamUiModel = {src: 'https://develop.cdn.chattigo.com/assets/img/profiles/4_dummy.png'};
        const temp5: TeamUiModel = {src: 'https://develop.cdn.chattigo.com/assets/img/profiles/5_dummy.png'};
        const temp6: TeamUiModel = {src: 'https://develop.cdn.chattigo.com/assets/img/profiles/6_dummy.png'};
        this.teamList.push(temp1);
        this.teamList.push(temp2);
        this.teamList.push(temp3);
        this.teamList.push(temp4);
        this.teamList.push(temp5);
        this.teamList.push(temp6);
      });
  }
}
