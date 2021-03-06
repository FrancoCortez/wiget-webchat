import {createAction, props} from '@ngrx/store';
import {ConfigUiModel} from '../../models/ui-model/config.ui-model';
import {InitTypeEnum} from "../../models/utils/init-type.enum";

export const loadConfig = createAction('[loadConfig] Load Configuration webchat', props<{ payload: ConfigUiModel }>());
export const loadConfigSuccess = createAction('[loadConfigSuccess] Load Configuration webchat');
export const loadConfigFailure = createAction('[loadConfigFailure] Load Configuration webchat', props<{ payload: any }>());

export const updateInputConfig = createAction('[updateInputConfig] update input config', props<{ payload: ConfigUiModel }>());
export const updateMobile = createAction('[updateMobile] update mobile', props<{ payload: boolean }>());

export const initType = createAction('[initType] update init type', props<{ payload: ConfigUiModel }>());

