import {Injectable} from '@angular/core';
import {SocketClient} from '../client/socket.client';
import {MessageUiModel} from '../models/ui-model/message.ui.model';
import {MessageDto} from '../models/message/message.dto';
import {v4 as uuid} from 'uuid';
import {of} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {SubjectEnum} from '../models/utils/subject.enum';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private readonly socketClient: SocketClient) {
  }

  public sendMessage(messageUI: MessageUiModel, messageDto: MessageDto) {
    messageDto.content = messageUI.content;
    messageDto.type = messageUI.type;
    messageDto.timestamp = messageUI.hour;
    messageDto.id = uuid();
    messageDto.isAttachment = !(messageUI.mediaUrl == null);
    messageDto.attachment = {
      mediaUrl: messageUI.redirectUrl,
      mimeType: messageUI.mimeType
    };
    this.socketClient.sendMessage(messageDto);
    return of(messageUI);
  }

  public getMessage() {
    return this.socketClient.getMessage().pipe(
      filter(fill => fill.content !== undefined),
      map(resp => {
        if (resp.content !== undefined) {
          resp.content = resp.content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
          const messageFront: MessageUiModel = {
            content: resp.content,
            subject: SubjectEnum.AGENT,
            type: resp.type,
            hour: new Date()
          };
          return messageFront;
        }
        return null;
      }),
    );
  }

  public leaveChat() {
    return this.socketClient.leave();
  }
}
