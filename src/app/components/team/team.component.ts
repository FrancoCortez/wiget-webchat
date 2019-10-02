import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigSelector, RootStoreState, TeamAction} from '../../store';
import {TeamUiModel} from '../../models/ui-model/team.ui-model';
import {selectTeam} from '../../store/team-store/selector';
import {TeamService} from '../../services/team.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: []
})
export class TeamComponent implements OnInit, OnDestroy {

  teamList: TeamUiModel[] = [];
  did = '';
  selectDid: Subscription = new Subscription();
  selectTeam: Subscription = new Subscription();
  constructor(private readonly store: Store<RootStoreState.AppState>, public teamService: TeamService) {}
  ngOnDestroy(): void {
    this.selectDid.unsubscribe();
    this.selectTeam.unsubscribe();
  }

  ngOnInit() {
    this.selectDid = this.store.pipe(select(ConfigSelector.selectDid)).subscribe(resp => this.did = resp);
    this.teamService.getAgents(this.did).subscribe(team => {
      this.store.dispatch(TeamAction.team({payload: team}));
    });
    this.selectTeam = this.store.pipe(select(selectTeam)).subscribe(resp => this.teamList = resp);
  }
}
