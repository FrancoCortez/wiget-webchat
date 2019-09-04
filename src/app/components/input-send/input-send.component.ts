import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigSelector, ConversationAction, LoginSelector, RootStoreState} from '../../store';
import {SocketClient} from '../../client/socket.client';
import {MessageUiModel} from '../../models/ui-model/message.ui.model';
import {MessageSendUiModel} from '../../models/ui-model/message-send.ui-model';
import {FormControl, FormGroup} from '@angular/forms';
import {UploadFileClient} from '../../client/upload-file.client';
import {SubjectEnum} from '../../models/utils/subject.enum';
import {TypeFileEnum} from '../../models/utils/type-file.enum';
import {MessageDto} from '../../models/message/message.dto';
import {MessageService} from '../../services/message.service';
import {PreviewAttachmentEnum} from '../../models/utils/preview-attachment.enum';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-input-send',
  templateUrl: './input-send.component.html',
  styleUrls: []
})
export class InputSendComponent implements OnInit, AfterViewInit {
  public sendConfig: MessageSendUiModel;
  public form: FormGroup;
  @ViewChild('send', {static: false}) sendElement: ElementRef;
  @ViewChild('attachmentInput', {static: false}) sendAttachmentElement: ElementRef;
  public imagePath;
  imgURL: any = null;
  message = '';
  typeFile = null;
  nameFile = null;
  public sendFile: any;

  constructor(private readonly store: Store<RootStoreState.AppState>,
              private readonly socket: SocketClient,
              private readonly sendService: MessageService,
              private readonly uploadFileClient: UploadFileClient) {
    this.form = new FormGroup({});
    this.form.addControl('sendMessage', new FormControl());
    this.form.addControl('uploadInput', new FormControl());
  }

  ngAfterViewInit(): void {
    this.sendElement.nativeElement.focus();
  }

  ngOnInit() {
    this.store.pipe(select(ConfigSelector.selectConfig)).subscribe(resp => this.sendConfig = resp.messageSend);
  }

  public uploadFile($event: any): void {
    const files = $event.target.files[0];
    this.eventScroll();
    if (files !== undefined && files !== null) {
      const mimeType = files.type;
      if (mimeType.match(/image\/*/) !== null) {
        const reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files);
        this.typeFile = 'images';
        reader.onload = () => {
          this.imgURL = reader.result;
        };
      } else if (mimeType.match(/application\/*/) !== null) {
        this.imagePath = files;
        this.previewImgSelector(null,  mimeType);
      }
      this.nameFile = files.name;
      this.sendFile = files;
    }
  }

  /**
   * Validacion del envio de mensajes
   *
   * @param value valor del campo de texto
   * @param $event evento que se ejecuta al momento de enviar un mensaje
   */
  public sendMessage(value: any, $event: any): boolean {
    if (value.sendMessage !== undefined && value.sendMessage !== '' && value.sendMessage !== null) {
      if (this.sendFile != null) {
        console.log('entre al dispache del send')
        this.uploadFileClient.sendFile(this.sendFile).subscribe(fileResp => {
          this.store.pipe(select(LoginSelector.selectLogin))
            .pipe(filter(fill => fill !== null))
            .subscribe((resp: MessageDto) => {
            let contentTemp = value.sendMessage.replace(/(?:\r\n|\r|\n)/g, '<br/>');
            contentTemp = contentTemp.replace(/(((https?:\/\/)|(www\.))[^\s]+)/g, (url) => {
              return '<a class="c-action-link" href="' + url + '" target="_blank">' + url + '</a>';
            });
            const messageFront: MessageUiModel = {
              content: contentTemp,
              subject: SubjectEnum.CLIENT,
              type: TypeFileEnum.MEDIA,
              hour: new Date(),
              mediaUrl: this.previewImgSelector(fileResp.mediaUrl, fileResp.mimeType),
              redirectUrl: fileResp.mediaUrl,
              mimeType: fileResp.mimeType,
              nameFile: this.nameFile
            };
            this.store.dispatch(ConversationAction.sendMessage({message: {messageUi: messageFront, messageDto: resp}}));
            this.resetFeatures();
          });
        });
      } else {
        this.store.pipe(select(LoginSelector.selectLogin))
          .pipe(filter(fill => fill !== null))
          .subscribe((resp: MessageDto) => {
          let contentTemp = value.sendMessage.replace(/(?:\r\n|\r|\n)/g, '<br/>');
          contentTemp = contentTemp.replace(/(((https?:\/\/)|(www\.))[^\s]+)/g, (url) => {
            return '<a class="c-action-link" href="' + url + '" target="_blank">' + url + '</a>';
          });
          const messageFront: MessageUiModel = {
            content: contentTemp,
            subject: SubjectEnum.CLIENT,
            type: TypeFileEnum.TEXT,
            hour: new Date(),
            mediaUrl: null,
            mimeType: null
          };
          this.store.dispatch(ConversationAction.sendMessage({message: {messageUi: messageFront, messageDto: resp}}));
          this.resetFeatures();
        });
      }
    } else {
      if ($event.which === 13) {
        this.resetFeatures();
        $event.preventDefault();
        return false;
      }
    }
  }

  public keypress(value: any, $event: any): boolean {
    if (value.sendMessage === undefined || value.sendMessage === '' || value.sendMessage === null) {
      if ($event.which === 13) {
        this.resetFeatures();
        $event.preventDefault();
        return false;
      }
    }
  }

  public closeAttachment(): void {
    this.imgURL = null;
    this.typeFile = null;
    this.nameFile = null;
    this.sendFile = null;
    this.imagePath = null;
    this.form.controls.uploadInput.reset();
  }

  private eventScroll(): void {
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
        chatMessages.style.marginBottom = '67px';
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }
  }

  private resetFeatures(): void {
    this.form.reset();
    this.imgURL = null;
    this.sendFile = null;
    this.typeFile = null;
    this.sendElement.nativeElement.focus();
    this.eventScroll();
  }

  private previewImgSelector(mediaUrl: string,
                             mimeType: string): string {
    let mediaUrlType = '';
    if (mimeType.match(/application\/*/) !== null) {
      const ext = mimeType.substring(mimeType.lastIndexOf('/') + 1);
      switch (ext) {
        case 'pdf': {
          this.typeFile = 'pdf';
          this.imgURL = PreviewAttachmentEnum.PREVIEW_PDF;
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
