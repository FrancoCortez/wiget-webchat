import {createAction, props} from '@ngrx/store';
import {StarPreserveDto} from "../../models/preserve-selection/star-preserve.dto";
import {LoginPreserveDto} from "../../models/preserve-selection/login-preserve.dto";
import {ChatPreserveDto} from "../../models/preserve-selection/chat-preserve.dto";

export const starPreserve = createAction('[starPreserve] Preserve preview select star', props<{ payload: StarPreserveDto }>());
export const starPreserveClean = createAction('[starPreserveClean] Preserve preview select star clean');
export const loginPreserve = createAction('[loginPreserve] Preserve preview select login', props< { payload: LoginPreserveDto } >());
export const loginPreserveClean = createAction('[loginPreserveClean] Clean Preserve preview select login');
export const chatPreserve = createAction('[chatPreserve] Preserve preview select chat', props< { payload: ChatPreserveDto } >());
export const chatPreserveClean = createAction('[chatPreserveClean] Preserve preview select chat clean');
