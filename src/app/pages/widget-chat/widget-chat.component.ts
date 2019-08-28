import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigAction, ConfigSelector, RootStoreState} from '../../store';
import {FormControl, FormGroup} from '@angular/forms';
import {MessageDto} from '../../models/message/message.dto';
import {MessageSendUiModel} from '../../models/ui-model/message-send.ui-model';

@Component({
  selector: 'app-widget-chat',
  templateUrl: './widget-chat.component.html',
  styleUrls: []
})
export class WidgetChatComponent implements OnInit {
  public data: any;
  public form: FormGroup;
  public sendConfig: MessageSendUiModel;
  constructor(private readonly store: Store<RootStoreState.AppState>) {
    this.form = new FormGroup({});
    this.form.addControl('sendMessage', new FormControl());
  }

  ngOnInit() {
    console.log('init');
    this.store.pipe(select(ConfigSelector.selectConfig)).subscribe(resp => this.sendConfig = resp.messageSend);
    // this.socket.initSocket(message);
  }


  sendMessage(value: any) {
    console.log(value);
    const message: MessageDto = {
      isAttachment: false,
      type: 'asd',
      msisdn: 'msisdn-test'
    };

    // this.socket.sendMessage(message);
  }
}
