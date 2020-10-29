import { IJoinRoomState, JoinRoomActions } from "../models/join_room_model";

export default (
	state: IJoinRoomState,
	action: JoinRoomActions
): IJoinRoomState => {
	if (action.type == "load_room")
		return {
			...state,
			...action.payload,
			loading: false,
			author: action.payload.watchers.filter((g) => g.isAuthor)[0],
		};
	if (action.type == "loading_off" || action.type == "loading_on")
		return {
			...state,
			loading: action.type == "loading_on",
		};
	if (action.type == "login_error")
		return {
			...state,
			error: Error(action.payload),
		};
};
