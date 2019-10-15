import {Injectable} from '@angular/core';
import {SocketClient} from '../client/socket.client';
import {MessageUiModel} from '../models/ui-model/message.ui.model';
import {MessageDto} from '../models/message/message.dto';
import {v4 as uuid} from 'uuid';
import {of} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {SubjectEnum} from '../models/utils/subject.enum';
import {PreviewAttachmentEnum} from '../models/utils/preview-attachment.enum';
import {FormatService} from './format.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private readonly socketClient: SocketClient,
              private readonly format: FormatService) {
  }

  public sendMessage(messageUI: MessageUiModel, messageDto: MessageDto) {
    messageDto.content = messageUI.originalContent;
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
          const messageFront: MessageUiModel = {
            id: resp.id,
            content: this.format.messageFormat(resp.content),
            subject: SubjectEnum.AGENT,
            type: resp.type,
            hour: new Date(),
            agentName: resp.name
          };
          if (resp.isAttachment) {
            messageFront.content = null;
            messageFront.mimeType = resp.attachment.mimeType;
            messageFront.mediaUrl = this.previewImgSelector(resp.attachment.mediaUrl, resp.attachment.mimeType);
            messageFront.redirectUrl = resp.attachment.mediaUrl;
            messageFront.nameFile = resp.attachment.mediaUrl.substring(resp.attachment.mediaUrl.lastIndexOf('/') + 1);
          }
          return messageFront;
        }
        return null;
      }),
    );
  }

  public getLeaveAgentChat () {
    return this.socketClient.getLeaveAgentChat();
  }
  public leaveChat() {
    return this.socketClient.leave();
  }

  private previewImgSelector(mediaUrl: string,
                             mimeType: string): string {
    let mediaUrlType = '';
    if (mimeType.match(/application\/*/) !== null) {
      ;
      const ext = mimeType.substring(mimeType.lastIndexOf('/') + 1);
      switch (ext) {
        case 'pdf': {
          mediaUrlType = PreviewAttachmentEnum.PREVIEW_TINY_PDF;
          break;
        }
        default: {
          mediaUrlType = '';
          break;
        }
      }
    } else if (mimeType.match(/image\/*/) !== null) {
      mediaUrlType = mediaUrl;
    }
    return mediaUrlType;
  }
}
