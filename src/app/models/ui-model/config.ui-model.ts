import {InputUiModel} from './input.ui-model';
import {ButtonUiModel} from './button.ui-model';
import {HeaderUiModel} from './header.ui-model';
import {WidgetCaptionUiModel} from './widget-caption.ui-model';
import {CaptionLoginUiModel} from './caption-login.ui-model';
import {MessageSendUiModel} from './message-send.ui-model';

export interface ConfigUiModel {
  input?: InputUiModel[];
  button?: ButtonUiModel;
  header?: HeaderUiModel;
  captionLogin?: CaptionLoginUiModel;
  caption?: WidgetCaptionUiModel;
  messageSend?: MessageSendUiModel;
  preserveHistory?: boolean;
  bgMenu?: string;
  geoActive?: boolean;
}
