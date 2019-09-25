import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {ConfigSelector, RootStoreState} from '../store';
import {filter} from 'rxjs/operators';
import {PreviewAttachmentEnum} from '../models/utils/preview-attachment.enum';
import {MediaTypeExtension} from '../models/utils/media-type-extension.enum';

@Injectable({
  providedIn: 'root'
})
export class FormatService {
  ngStyleLink = '';

  constructor(private readonly store: Store<RootStoreState.AppState>) {
    this.store.select(ConfigSelector.selectConfig)
      .pipe(filter(fill => fill.configPanel !== undefined && fill.configPanel !== null))
      .subscribe(resp => this.ngStyleLink = resp.configPanel.linkColor);
  }

  public messageFormat(message: string): string {
    let contentTemp = '';
    if (message !== null && message !== undefined && message !== '') {
      contentTemp = message.replace(/(?:\r\n|\r|\n)/g, '<br/>');
      contentTemp = contentTemp.replace(/(((https?:\/\/)|(www\.))[^\s]+)/g, (url) => {
        // tslint:disable-next-line:max-line-length
        return `<a class="c-action-link" style="color: ${this.ngStyleLink}; border-bottom: 1px dashed ${this.ngStyleLink};" href="${url}" target="_blank">${url}</a>`;
      });
    }
    return contentTemp;
  }

  public attachmentFile(mediaUrl: string, mimeType: string): any {
    const ext = mimeType.substring(mimeType.lastIndexOf('/') + 1);
    if (mimeType.match(/application\/*/) !== null) {
      if (MediaTypeExtension.WORD.split('|').includes(ext)) {
        return {
          mediaUrlType: PreviewAttachmentEnum.PREVIEW_TINY_WORD,
          typeFile: MediaTypeExtension.WORD,
          imgURL: PreviewAttachmentEnum.PREVIEW_WORD
        };
      } else if (MediaTypeExtension.EXCEL.split('|').includes(ext)) {
        return {
          mediaUrlType: PreviewAttachmentEnum.PREVIEW_TINY_EXCEL,
          typeFile: MediaTypeExtension.EXCEL,
          imgURL: PreviewAttachmentEnum.PREVIEW_EXCEL
        };
      } else if (MediaTypeExtension.PDF.split('|').includes(ext)) {
        return {
          mediaUrlType: PreviewAttachmentEnum.PREVIEW_TINY_PDF,
          typeFile: MediaTypeExtension.PDF,
          imgURL: PreviewAttachmentEnum.PREVIEW_PDF
        };
      } else if (MediaTypeExtension.AUDIO.split('|').includes(ext)) {
        return {
          mediaUrlType: PreviewAttachmentEnum.PREVIEW_TINY_AUDIO,
          typeFile: MediaTypeExtension.AUDIO,
          imgURL: PreviewAttachmentEnum.PREVIEW_AUDIO
        };
      } else if (MediaTypeExtension.PPT.split('|').includes(ext)) {
        return {
          mediaUrlType: PreviewAttachmentEnum.PREVIEW_TINY_PPT,
          typeFile: MediaTypeExtension.PPT,
          imgURL: PreviewAttachmentEnum.PREVIEW_PPT
        };
      } else if (MediaTypeExtension.ONE.split('|').includes(ext)) {
        return {
          mediaUrlType: PreviewAttachmentEnum.PREVIEW_TINY_ONE,
          typeFile: MediaTypeExtension.ONE,
          imgURL: PreviewAttachmentEnum.PREVIEW_ONE
        };
      } else {
        return {
          mediaUrlType: PreviewAttachmentEnum.PREVIEW_TINY_OTHER,
          typeFile: 'OTHER',
          imgURL: PreviewAttachmentEnum.PREVIEW_OTHER
        };
      }
    } else if (mimeType.match(/image\/*/) !== null) {
      if (MediaTypeExtension.IMAGE.split('|').includes(ext)) {
        return {
          mediaUrlType: mediaUrl,
          typeFile: MediaTypeExtension.IMAGE,
          // imgURL: PreviewAttachmentEnum.PREVIEW_WORD
        };
      } else {
        return {
          mediaUrlType: PreviewAttachmentEnum.PREVIEW_TINY_OTHER,
          typeFile: 'OTHER',
          imgURL: PreviewAttachmentEnum.PREVIEW_OTHER
        };
      }
    } else if (mimeType.match(/text\/*/) !== null) {
      if (MediaTypeExtension.TEXT.split('|').includes(ext)) {
        return {
          mediaUrlType: PreviewAttachmentEnum.PREVIEW_TINY_TEXT,
          typeFile: MediaTypeExtension.TEXT,
          imgURL: PreviewAttachmentEnum.PREVIEW_TEXT
        };
      } else {
        return {
          mediaUrlType: PreviewAttachmentEnum.PREVIEW_TINY_OTHER,
          typeFile: 'OTHER',
          imgURL: PreviewAttachmentEnum.PREVIEW_OTHER
        };
      }
    } else if (mimeType.match(/audio\/*/) !== null || (mimeType.match(/video\/*/)) !== null) {
      if (MediaTypeExtension.AUDIO.split('|').includes(ext)) {
        return {
          mediaUrlType: PreviewAttachmentEnum.PREVIEW_TINY_AUDIO,
          typeFile: MediaTypeExtension.AUDIO,
          imgURL: PreviewAttachmentEnum.PREVIEW_AUDIO
        };
      } else {
        return {
          mediaUrlType: PreviewAttachmentEnum.PREVIEW_TINY_OTHER,
          typeFile: 'OTHER',
          imgURL: PreviewAttachmentEnum.PREVIEW_OTHER
        };
      }
    } else {
      return {
        mediaUrlType: PreviewAttachmentEnum.PREVIEW_TINY_OTHER,
        typeFile: 'OTHER',
        imgURL: PreviewAttachmentEnum.PREVIEW_OTHER
      };
    }
  }
}
