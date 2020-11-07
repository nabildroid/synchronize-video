import { IRoomState, RoomActions } from "../models/room_model";

export default (state: IRoomState, action: RoomActions): IRoomState => {
	if (action.type == "load_room")
		return {
			...state,
			...action.payload,
			loading: false,
		};
	else if (action.type == "guests_to_Users")
		return {
			...state,
			watchersUsers: [...state.watchersUsers, ...action.payload],
			loading: false,
		};
	else if (action.type == "guest_author_to_user")
		return {
			...state,
			authorUser: action.payload,
			loading: false,
		};
	else if (action.type == "loading_off" || action.type == "loading_on")
		return {
			...state,
			loading: action.type == "loading_on",
		};
	else if (action.type == "error")
		return {
			...state,
			error: Error(action.payload),
			loading: false,
		};
	else return state;
};
