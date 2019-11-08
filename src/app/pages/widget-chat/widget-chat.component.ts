import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConversationSelector, RootStoreState} from '../../store';
import {MessageUiModel} from '../../models/ui-model/message.ui.model';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-widget-chat',
  templateUrl: './widget-chat.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetChatComponent implements OnInit, OnDestroy, AfterViewInit {

  public conversation: MessageUiModel[] = [];
  @ViewChildren('elementConversation') elementAgent: QueryList<any>;
  private conversationObserve: Subscription = new Subscription();

  constructor(private readonly store: Store<RootStoreState.AppState>,
              private changeDetector: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.conversationObserve =
      this.store.pipe(select(ConversationSelector.selectConversations))
        .pipe(filter(fill => fill.length !== 0))
        .subscribe(resp => {
          this.conversation = resp;
          this.changeDetector.detectChanges();
          this.changeDetector.markForCheck();
          this.elementAgent.last.nativeElement.scrollIntoView();
          this.eventScroll();
        });
  }

  ngOnInit() {

  }


  ngOnDestroy(): void {
    this.conversationObserve.unsubscribe();
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  loadImage($event) {
    this.elementAgent.last.nativeElement.scrollIntoView();
    this.eventScroll();
  }

  private eventScroll(): void {
    const findMessageBox = document.getElementsByClassName('widget-send-message-box-js');
    if (findMessageBox.length) {
      const sendMessageBox = findMessageBox[0];
      const inputMessage: any = sendMessageBox.getElementsByClassName('widget-message-input-js')[0];
      const chatMessages: any = document.getElementsByClassName('widget-message-content-js')[0];
      let sendMessageBoxHeight = (sendMessageBox.scrollHeight - 16) + 'px';
      chatMessages.style.marginBottom = sendMessageBoxHeight;
      inputMessage.style.height = '1px';
      inputMessage.style.height = (2 + inputMessage.scrollHeight) + 'px';
      sendMessageBoxHeight = (sendMessageBox.scrollHeight - 16) + 'px';
      chatMessages.style.marginBottom = sendMessageBoxHeight;
      if (inputMessage) {
        inputMessage.addEventListener('keyup', () => {
          inputMessage.style.height = '1px';
          inputMessage.style.height = (2 + inputMessage.scrollHeight) + 'px';
          sendMessageBoxHeight = (sendMessageBox.scrollHeight - 16) + 'px';
          chatMessages.style.marginBottom = sendMessageBoxHeight;
        });
      }
    }
  }
}
