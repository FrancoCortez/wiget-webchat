import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigSelector, ConversationAction, ConversationSelector, RootStoreState} from '../../store';
import {ConfigPanelUiModel} from '../../models/ui-model/config-panel.ui-model';

@Component({
  selector: 'app-widget-config',
  templateUrl: './widget-config.component.html',
  styleUrls: [],
})
export class WidgetConfigComponent implements OnInit {

  soundActive = true;
  configPanel: ConfigPanelUiModel;
  unableColor = 'linear-gradient(140deg, #959395 40%, #959395 200%)';

  constructor(private readonly store: Store<RootStoreState.AppState>) {
  }

  ngOnInit() {
    this.store.pipe(select(ConversationSelector.selectChatSound)).subscribe(resp => this.soundActive = resp.soundActive);
    this.store.pipe(select(ConfigSelector.selectConfig)).subscribe(resp => this.configPanel = resp.configPanel);
  }

  closeChat() {
    this.store.dispatch(ConversationAction.leaveChat());
  }

  soundChange($event) {
    this.store.dispatch(ConversationAction.activateSound({payload: $event.target.checked}));
  }
}
