import { IVideoState, VideoActions } from "../models/video_model";

export default (state: IVideoState, action: VideoActions): IVideoState => {
	if (action.type == "load_video")
		return {
			...state,
			...action.payload,
			loading: false,
		};
	else if (action.type == "set_state") {
		return {
			...state,
			state: action.paylaod,
			loading: false,
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
