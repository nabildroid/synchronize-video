import { IAppState, AppActions } from "../models/app_model";

export default (state: IAppState, action: AppActions) => {
	if (action.type == "login")
		return {
			...state,
			loading: false,
			user: action.payload,
		};
	if (action.type == "loading_on")
		return {
			...state,
			loading: true,
		};
	if (action.type == "loading_off")
		return {
			...state,
			loading: false,
		};
	return state;
};
