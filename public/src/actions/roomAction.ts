import { IRoomState, RoomActions } from "../models/room_model";
import { Guest } from "../types/user_type";
import removeDuplicates from "../utils/removeDuplicates";



export default (state: IRoomState, action: RoomActions): IRoomState => {
	if (action.type == "load_room")
		return {
			...state,
			...action.payload,
			loading: false,
		};
	else if (action.type == "add_watchers")
		return {
			...state,
			watchers: removeDuplicates<Guest>(
				[...state.watchers, ...action.payload],
				(a, b) => a.id == b.id
			),
			loading: false,
		};
	else if (action.type == "guest_to_author")
		return {
			...state,
			authorGuest: action.payload,
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
