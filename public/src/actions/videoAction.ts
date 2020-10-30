import { IVideoState, VideoActions } from "../models/video_model";

export default (state: IVideoState, action: VideoActions): IVideoState => {
	if (action.type == "load_video")
		return {
			...state,
			data: action.payload,
			loading: false,
		};
	else if (action.type == "set_state") {
		return {
			...state,
			state: action.paylaod,
			loading: false,
		};
	} else if (action.type == "controller_on") {
		return {
			...state,
			controller: true,
		};
	} else if (action.type == "controller_off") {
		return {
			...state,
			controller: false,
		};
	} else if (action.type == "update_position") {
		return {
			...state,
			position: action.payload,
		};
	} else if (action.type == "loading_off" || action.type == "loading_on")
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
};
