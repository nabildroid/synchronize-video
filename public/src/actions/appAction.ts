import { IAppState, AppActions } from "../models/app_model";

export default (state: IAppState, action: AppActions) => {
	if (action.type == "login")
		return {
			...state,
			loading: false,
			user: action.payload,
		};
	else if (action.type == "load_new_room")
		return {
			...state,
			newRoom: action.payload,
		};
	else if (action.type == "loading_on")
		return {
			...state,
			loading: true,
		};
	else if (action.type == "loading_off")
		return {
			...state,
			loading: false,
		};
	else return state;
};
