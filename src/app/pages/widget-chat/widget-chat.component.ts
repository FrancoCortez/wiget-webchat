import {AfterViewInit, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConversationAction, ConversationSelector, RootStoreState} from '../../store';
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

  constructor(private readonly store: Store<RootStoreState.AppState>) {
    this.store.dispatch(ConversationAction.getMessage());
  }

  ngOnInit() {
    this.store.pipe(select(ConversationSelector.selectConversations))
      .pipe(filter(fill => fill.length !== 0))
      .subscribe(resp => this.conversation = resp);
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
  goToLink(url: string) {
    window.open(url, '_blank');
  }

}
