import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigSelector, ConversationAction, LoginSelector, RootStoreState} from '../../store';
import {SocketClient} from '../../client/socket.client';
import {MessageUiModel} from '../../models/ui-model/message.ui.model';
import {MessageSendUiModel} from '../../models/ui-model/message-send.ui-model';
import {FormControl, FormGroup} from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-input-send',
  templateUrl: './input-send.component.html',
  styleUrls: []
})
export class InputSendComponent implements OnInit, AfterViewInit {
  public sendConfig: MessageSendUiModel;
  public form: FormGroup;
  @ViewChild('send', {static : false}) sendElement: ElementRef;

  constructor(private readonly store: Store<RootStoreState.AppState>,
              private readonly socket: SocketClient) {
    this.form = new FormGroup({});
    this.form.addControl('sendMessage', new FormControl());
  }

  ngAfterViewInit(): void {
    this.sendElement.nativeElement.focus();
  }

  ngOnInit() {
    // this.sendElement.nativeElement.focus();
    this.store.pipe(select(ConfigSelector.selectConfig)).subscribe(resp => this.sendConfig = resp.messageSend);
  }

  sendMessage(value: any) {
    if (value.sendMessage !== undefined && value.sendMessage !== '' && value.sendMessage !== null) {
      const messageUi: MessageUiModel = {
        content: value.sendMessage.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
        subject: 'CLIENT',
        type: 'text',
        hour: new Date()
      };
      this.store.dispatch(ConversationAction.addMessage({payload: messageUi}));
      this.store.pipe(select(LoginSelector.selectLogin)).subscribe((resp: any) => {
        resp.content = messageUi.content;
        resp.type = messageUi.type;
        resp.timestamp = messageUi.hour;
        resp.id = uuid();
        this.socket.sendMessage(resp);
      });
      this.sendElement.nativeElement.focus();
      this.form.reset();
      const findMessageBox = document.getElementsByClassName('widget-send-message-box-js');
      if (findMessageBox.length) {
        const sendMessageBox = findMessageBox[0];
        const inputMessage: any = sendMessageBox.getElementsByClassName('widget-message-input-js')[0];
        const chatMessages: any = document.getElementsByClassName('widget-message-content-js')[0];
        let sendMessageBoxHeight = (sendMessageBox.scrollHeight - 16) + 'px';
        chatMessages.style.marginBottom = sendMessageBoxHeight;
        if (inputMessage !== null) {
          inputMessage.style.height = '1px';
          inputMessage.style.height = (2 + inputMessage.scrollHeight) + 'px';
          sendMessageBoxHeight = (sendMessageBox.scrollHeight - 16) + 'px';
          chatMessages.style.marginBottom = sendMessageBoxHeight;
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      }
    }
  }

}
