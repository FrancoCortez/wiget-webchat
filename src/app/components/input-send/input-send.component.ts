import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ConfigSelector, ConversationAction, LoginSelector, RootStoreState} from '../../store';
import {MessageUiModel} from '../../models/ui-model/message.ui.model';
import {MessageSendUiModel} from '../../models/ui-model/message-send.ui-model';
import {FormControl, FormGroup} from '@angular/forms';
import {UploadFileClient} from '../../client/upload-file.client';
import {SubjectEnum} from '../../models/utils/subject.enum';
import {TypeFileEnum} from '../../models/utils/type-file.enum';
import {MessageDto} from '../../models/message/message.dto';
import {filter} from 'rxjs/operators';
import {FormatService} from '../../services/format.service';

@Component({
  selector: 'app-input-send',
  templateUrl: './input-send.component.html',
  styleUrls: []
})
export class InputSendComponent implements OnInit, AfterViewInit {
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

  constructor(private readonly store: Store<RootStoreState.AppState>,
              private readonly format: FormatService,
              private readonly uploadFileClient: UploadFileClient) {
    this.form = new FormGroup({});
    this.form.addControl('sendMessage', new FormControl());
    this.form.addControl('uploadInput', new FormControl());
  }

  ngAfterViewInit(): void {
    this.sendElement.nativeElement.focus();
  }

  ngOnInit() {
    this.eventScrollForTextArea();
    this.store.pipe(select(ConfigSelector.selectConfig)).subscribe(resp => this.sendConfig = resp.messageSend);
    this.store.pipe(select(LoginSelector.selectLogin))
      .pipe(filter(fill => fill !== null))
      .subscribe((resp: MessageDto) => this.loginResp = resp);
  }

  public uploadFile($event: any): void {
    const files = $event.target.files[0];
    if (files.size > 10000000) {
      alert('El archivo pesa mas de 10mb');
      return;
    }
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
        this.previewImgSelector(null, mimeType);
      }
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
    if ((value.sendMessage !== undefined && value.sendMessage !== '' && value.sendMessage !== null)
      || (this.sendFile !== null && this.sendFile !== undefined)) {
      if (this.sendFile != null) {
        this.uploadFileClient.sendFile(this.sendFile).subscribe(fileResp => {
          this.store.pipe(select(LoginSelector.selectLogin))
            .pipe(filter(fill => fill !== null))
            .subscribe((resp: MessageDto) => {
              const messageFront: MessageUiModel = {
                originalContent: value.sendMessage,
                content: this.format.messageFormat(value.sendMessage),
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
        const messageFront: MessageUiModel = {
          originalContent: value.sendMessage,
          content: this.format.messageFormat(value.sendMessage),
          subject: SubjectEnum.CLIENT,
          type: TypeFileEnum.TEXT,
          hour: new Date(),
          mediaUrl: null,
          mimeType: null
        };
        this.store.dispatch(ConversationAction.sendMessage({message: {messageUi: messageFront, messageDto: this.loginResp}}));
        this.resetFeatures();
      }
    }
    this.store.pipe(select(ConfigSelector.selectConfig), filter(fill => ((fill.preserveHistory !== undefined || fill.preserveHistory !== null)) && fill.preserveHistory))
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

  private resetFeatures(): void {
    this.form.reset();
    this.imgURL = null;
    this.sendFile = null;
    this.typeFile = null;
    this.sendElement.nativeElement.focus();
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
}
