import { IJoinRoomState, JoinRoomActions } from "../models/join_room_model";

export default (
	state: IJoinRoomState,
	action: JoinRoomActions
): IJoinRoomState => {
	if (action.type == "load_room_info")
		return {
			...state,
			...action.payload,
			loading: false,
			author: action.payload.watchers.filter((g) => g.isAuthor)[0],
		};
	else if (action.type == "loading_off" || action.type == "loading_on")
		return {
			...state,
			loading: action.type == "loading_on",
		};
	else if (
		action.type == "loading_submit_off" ||
		action.type == "loading_submit_on"
	)
		return {
			...state,
			error: action.type == "loading_submit_on" ? null : state.error,
			loading_submit: action.type == "loading_submit_on",
		};
	else if (action.type == "login_error")
		return {
			...state,
			error: Error(action.payload),
		};
	else return state;
};
