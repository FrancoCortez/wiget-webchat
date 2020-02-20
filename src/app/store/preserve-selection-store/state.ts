import {StarPreserveDto} from "../../models/preserve-selection/star-preserve.dto";
import {LoginPreserveDto} from "../../models/preserve-selection/login-preserve.dto";
import {ChatPreserveDto} from "../../models/preserve-selection/chat-preserve.dto";

export interface State {
  starPreserve?: StarPreserveDto,
  loginPreserve?: LoginPreserveDto[],
  chatPreserve?: ChatPreserveDto
}

export const initialState: State = {
  starPreserve: { selectedStar: 0 },
  loginPreserve: [],
  chatPreserve: null
};
