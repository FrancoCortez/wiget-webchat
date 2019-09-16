import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigSelector, RootStoreState, TeamAction} from '../../store';
import {TeamUiModel} from '../../models/ui-model/team.ui-model';
import {selectTeam} from '../../store/team-store/selector';
import {TeamService} from '../../services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: []
})
export class TeamComponent implements OnInit {

  teamList: TeamUiModel[] = [];
  did = '';

  constructor(private readonly store: Store<RootStoreState.AppState>, public teamService: TeamService) {
    this.store.pipe(select(ConfigSelector.selectDid)).subscribe(resp => this.did = resp);
  }

  ngOnInit() {
    this.teamService.getAgents(this.did).subscribe(team => {
      this.store.dispatch(TeamAction.team({payload: team}));
    });
    this.store.pipe(select(selectTeam))
      .subscribe(resp => {
        this.teamList = resp;
      });
  }
}
