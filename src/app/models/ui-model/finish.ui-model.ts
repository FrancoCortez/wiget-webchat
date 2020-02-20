import {HeaderFinishUiModel} from "./header-finish.ui-model";
import {SocialMediaUiModel} from "./social-media.ui-model";
import {FinishContentUiModel} from "./finish-content.ui.model";

export interface FinishUiModel {
  header?: HeaderFinishUiModel;
  socialMedia?: SocialMediaUiModel[];
  content?: FinishContentUiModel;
}
