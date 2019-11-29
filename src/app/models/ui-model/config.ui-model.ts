import {InputUiModel} from './input.ui-model';
import {ButtonUiModel} from './button.ui-model';
import {HeaderUiModel} from './header.ui-model';
import {WidgetCaptionUiModel} from './widget-caption.ui-model';
import {CaptionLoginUiModel} from './caption-login.ui-model';
import {MessageSendUiModel} from './message-send.ui-model';
import {ConfigPanelUiModel} from './config-panel.ui-model';
import {ButtonOptionUiModel} from "./button-option.ui-model";
import {TriggerUiModel} from "./trigger.ui-model";
import {FinishUiModel} from "./finish.ui-model";
import {InitTypeEnum} from "../utils/init-type.enum";

export interface ConfigUiModel {
  input?: InputUiModel[];
  trigger?: TriggerUiModel;
  button?: ButtonUiModel;
  header?: HeaderUiModel;
  captionLogin?: CaptionLoginUiModel;
  caption?: WidgetCaptionUiModel;
  messageSend?: MessageSendUiModel;
  configPanel?: ConfigPanelUiModel;
  finish?: FinishUiModel;
  isMobile?: boolean;
  preserveHistory?: boolean;
  bgMenu?: string;
  geoActive?: boolean;
  did?: string;
  showTeam?: boolean;
  buttonPrefer?: ButtonOptionUiModel[];
  question?: string;
  initType?: InitTypeEnum;
}
