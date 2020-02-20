import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
  ConfigSelector,
  ConversationAction,
  InitWebChatSelector,
  LoginSelector, PreserveSelectionAction, PreserveSelectionSelector,
  RootStoreState,
  RouterSelector
} from '../../store';
import {MessageUiModel} from '../../models/ui-model/message.ui.model';
import {MessageSendUiModel} from '../../models/ui-model/message-send.ui-model';
import {FormControl, FormGroup} from '@angular/forms';
import {UploadFileClient} from '../../client/upload-file.client';
import {SubjectEnum} from '../../models/utils/subject.enum';
import {TypeFileEnum} from '../../models/utils/type-file.enum';
import {MessageDto} from '../../models/message/message.dto';
import {filter} from 'rxjs/operators';
import {FormatService} from '../../services/format.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-input-send',
  templateUrl: './input-send.component.html',
  styleUrls: [],
})
export class InputSendComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('send', {static: false}) sendElement: ElementRef;
  @ViewChild('attachmentInput', {static: false}) sendAttachmentElement: ElementRef;
  sendConfig: MessageSendUiModel;
  form: FormGroup;
  imagePath;
  imgURL: any = null;
  message = '';
  typeFile = null;
  nameFile = null;
  sendFile: any;
  loginResp: MessageDto = null;
  displayEmoji = false;
  disabledForWait = false;
  sending = false;
  did = '';
  localeEmoji = {
    search: 'Buscar emoji',
    emojilist: 'Lista de emoji',
    notfound: 'No se encontraron emoji',
    clear: 'Limpiar',
    categories: {
      search: 'Resultados de busqueda',
      recent: 'Usados mas frecuentemente',
      people: 'Emoticonos y Personas',
      nature: 'Animales y Naturaleza',
      foods: 'Alimentos y Bebidas',
      activity: 'Actividades',
      places: 'Viajes y Lugares',
      objects: 'Objetos',
      symbols: 'Simbolos',
      flags: 'Banderas',
      custom: 'Personaliados',
    },
    skintones: {
      1: 'Default Skin Tone',
      2: 'Light Skin Tone',
      3: 'Medium-Light Skin Tone',
      4: 'Medium Skin Tone',
      5: 'Medium-Dark Skin Tone',
      6: 'Dark Skin Tone',
    },
  };

  selectDid: Subscription = new Subscription();
  selectConfig: Subscription = new Subscription();
  selectLogin: Subscription = new Subscription();
  widgetOpen: boolean;
  constructor(private readonly store: Store<RootStoreState.AppState>,
              private readonly format: FormatService,
              private readonly uploadFileClient: UploadFileClient) {

  }

  ngAfterViewInit(): void {
    this.sendElement.nativeElement.focus();
    this.enableSend();
  }

  ngOnDestroy(): void {
    this.selectDid.unsubscribe();
    // this.selectConfig.unsubscribe();
    this.selectLogin.unsubscribe();
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this.form.addControl('sendMessage', new FormControl());
    this.form.addControl('uploadInput', new FormControl());
    this.selectDid = this.store.pipe(select(ConfigSelector.selectDid)).subscribe(resp => this.did = resp);
    this.eventScrollForTextArea();
    this.selectConfig = this.store.pipe(select(ConfigSelector.selectConfig)).subscribe(resp => this.sendConfig = resp.messageSend);
    this.selectLogin = this.store.pipe(select(LoginSelector.selectLogin))
      .pipe(filter(fill => fill !== null))
      .subscribe((resp: MessageDto) => this.loginResp = resp);

    this.store.pipe(select(PreserveSelectionSelector.selectPreserveChat)).subscribe(resp => {
      if(resp !== undefined && resp !== null) {
        this.form.controls['sendMessage'].setValue(resp.textChat);
        this.imgURL = resp.preview;
        this.typeFile = resp.typeFile;
      }
    });

    this.store.pipe(select(InitWebChatSelector.selectIsOpen)).subscribe(resp => {
      if(!resp) {
        console.log('entre al opening')
        this.store.dispatch(PreserveSelectionAction.chatPreserve({
          payload: {
            textChat: this.form.controls['sendMessage'].value,
            preview: this.imgURL,
            typeFile: this.typeFile
          }
        }))
      }
      this.store.pipe(select(RouterSelector.selectWidgetOpen))
        .subscribe(resp => {
          this.widgetOpen = resp;
        });
    })
  }

  public uploadFile($event: any): void {
    const files = $event.target.files[0];
    if (files.size > 10000000) {
      alert('El archivo pesa mas de 10mb');
      return;
    }

    if (files !== undefined && files !== null) {
      this.disableSend();
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
        this.previewImgSelector(null, mimeType);
        //
      } else if (mimeType.match(/text\/*/) !== null) {
        this.imagePath = files;
        this.previewImgSelector(null, mimeType);
      } else {
        this.imagePath = files;
        this.previewImgSelector(null, mimeType);
      }
      this.enableSend();
      this.nameFile = files.name;
      this.sendFile = files;
      this.sendElement.nativeElement.focus();
    }
  }

  /**
   * Validacion del envio de mensajes
   *
   * @param value valor del campo de texto
   * @param $event evento que se ejecuta al momento de enviar un mensaje
   */
  public sendMessage(value: any) {
    this.displayEmoji = false;
    if (this.sending) {
      return;
    }
    if ((value.sendMessage !== undefined && value.sendMessage !== '' && value.sendMessage !== null)
      || (this.sendFile !== null && this.sendFile !== undefined)) {
      this.sending = true;
      if (this.sendFile != null) {
        this.disableSend();
        this.uploadFileClient.sendFile(this.sendFile, this.did).subscribe(fileResp => {
          const content = this.format.messageFormat(value.sendMessage);
          const messageFront: MessageUiModel = {
            originalContent: ((content === undefined || content === null || content === '') ? '\n' : content),
            content: ((content === undefined || content === null || content === '') ? '\n' : content),
            subject: SubjectEnum.CLIENT,
            type: TypeFileEnum.MEDIA,
            hour: new Date(),
            mediaUrl: this.previewImgSelector(fileResp.mediaUrl, fileResp.mimeType),
            redirectUrl: fileResp.mediaUrl,
            mimeType: fileResp.mimeType,
            nameFile: this.nameFile
          };
          this.store.dispatch(ConversationAction.sendMessage({
            message: {
              messageUi: messageFront,
              messageDto: this.loginResp
            }
          }));
          this.resetFeatures();
        });
      } else {
        if (value.sendMessage.replace(/\s/g, '').length > 0) {
          const messageFront: MessageUiModel = {
            originalContent: value.sendMessage,
            content: this.format.messageFormat(value.sendMessage),
            subject: SubjectEnum.CLIENT,
            type: TypeFileEnum.TEXT,
            hour: new Date(),
            mediaUrl: null,
            mimeType: null
          };
          this.store.dispatch(ConversationAction.sendMessage({
            message: {
              messageUi: messageFront,
              messageDto: this.loginResp
            }
          }));
          this.resetFeatures();
        }
      }
    }
    // tslint:disable-next-line:max-line-length
    this.selectConfig = this.store.pipe(select(ConfigSelector.selectConfig), filter(fill => ((fill.preserveHistory !== undefined || fill.preserveHistory !== null)) && fill.preserveHistory))
      .subscribe(resp => {
        this.store.subscribe(state => {
          localStorage.setItem('state', JSON.stringify(state));
        });
      });
  }

  public closeAttachment(): void {
    this.imgURL = null;
    this.typeFile = null;
    this.nameFile = null;
    this.sendFile = null;
    this.imagePath = null;
    this.form.controls.uploadInput.reset();
  }

  keydownEvent(value: any, $event: any) {
    if ($event.keyCode === 13) {
      this.sendMessage(value);
      $event.preventDefault();
    }
  }

  keyPressEvent(event) {
  }

  addEmoji($event) {
    this.displayEmoji = !this.displayEmoji;
    // tslint:disable-next-line:max-line-length
    this.form.controls.sendMessage.setValue(((this.form.controls.sendMessage.value == null) ? '' : this.form.controls.sendMessage.value) + $event.emoji.native);
    this.sendElement.nativeElement.focus();
  }

  displayPanelEmoji() {
    this.displayEmoji = !this.displayEmoji;
    if (!this.displayEmoji) {
      this.sendElement.nativeElement.focus();
    }
  }

  private resetFeatures(): void {
    this.sendElement.nativeElement.focus();
    this.enableSend();
    this.form.reset();
    this.imgURL = null;
    this.sendFile = null;
    this.typeFile = null;
    this.sending = false;
  }

  private previewImgSelector(mediaUrl: string,
                             mimeType: string): string {
    const result = this.format.attachmentFile(mediaUrl, mimeType);
    this.typeFile = result.typeFile;
    this.imgURL = result.imgURL;
    return result.mediaUrlType;
  }

  private eventScrollForTextArea() {
    const findMessageBox = document.getElementsByClassName('widget-send-message-box-js');
    if (findMessageBox.length) {
      const sendMessageBox = findMessageBox[0];
      const inputMessage: any = sendMessageBox.getElementsByClassName('widget-message-input-js')[0];
      const chatMessages: any = document.getElementsByClassName('widget-message-content-js')[0];
      let sendMessageBoxHeight = (sendMessageBox.scrollHeight - 16) + 'px';
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

  private disableSend() {
    this.form.controls['sendMessage'].disable();
  }

  private enableSend() {
    this.form.controls['sendMessage'].enable();
  }
}
