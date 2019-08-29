import {AfterViewInit, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigSelector, ConversationAction, ConversationSelector, RootStoreState} from '../../store';
import {FormControl, FormGroup} from '@angular/forms';
import {MessageDto} from '../../models/message/message.dto';
import {MessageSendUiModel} from '../../models/ui-model/message-send.ui-model';
import {SocketClient} from '../../client/socket.client';
import {MessageUiModel} from '../../models/ui-model/message.ui.model';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-widget-chat',
  templateUrl: './widget-chat.component.html',
  styleUrls: []
})
export class WidgetChatComponent implements OnInit, AfterViewInit {

  public conversation: MessageUiModel[] = [];

  constructor(private readonly store: Store<RootStoreState.AppState>, private readonly socket: SocketClient) {
    this.socket.getMessage()
      .pipe(filter(fill => fill.content !== undefined))
      .subscribe(resp => {
        if (resp.content !== undefined) {
          console.log('entre al subscribe');
          resp.content = resp.content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
          const messageUi: MessageUiModel = {
            content: resp.content,
            subject: 'AGENT',
            type: resp.type,
            hour: new Date()
          };
          this.store.dispatch(ConversationAction.addMessage({payload: messageUi}));
        }
      });
  }

  ngAfterViewInit(): void {
    const findMessageBox = document.getElementsByClassName('widget-send-message-box-js');
    if (findMessageBox.length) {
      const sendMessageBox = findMessageBox[0];
      const inputMessage: any = sendMessageBox.getElementsByClassName('widget-message-input-js')[0];
      const chatMessages: any = document.getElementsByClassName('widget-message-content-js')[0];
      let sendMessageBoxHeight = (sendMessageBox.scrollHeight - 16) + 'px';
      chatMessages.style.marginBottom = sendMessageBoxHeight;
      if (inputMessage !== null) {
        inputMessage.addEventListener('keyup', () => {
          inputMessage.style.height = '1px';
          inputMessage.style.height = (2 + inputMessage.scrollHeight) + 'px';
          sendMessageBoxHeight = (sendMessageBox.scrollHeight - 16) + 'px';
          chatMessages.style.marginBottom = sendMessageBoxHeight;
        });
      }
    }
  }

  ngOnInit() {
    this.store.pipe(select(ConversationSelector.selectConversations)).subscribe(resp => this.conversation = resp);
  }


}
