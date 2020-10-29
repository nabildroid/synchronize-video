import { Guest } from "../types/user_type";
import { Duration, VideoData, VideoState } from "../types/video_type";



export type LateUser = {
	user:Guest,
	position:Duration
}
export interface IVideoState {
	data: VideoData;
	state: VideoState;
	position:Duration;
	lateWatchers:LateUser[],
	loading: boolean;
	error: Error;
}

export const VideoStateInit: IVideoState = {
	data: null,
	state: VideoState.WAITE,
	lateWatchers:[],
	loading: true,
	position:{
		minute:0,
		secoud:0,
		toTimestemp:()=>10
	},
	error: null,
};

export type VideoActions =
	| {
			type: "load_video";
			payload: VideoData;
	  }
	| {
			type: "set_state";
			paylaod: VideoState;
	  }
	| {
			type: "loading_on";
	  }
	| {
			type: "loading_off";
	  }
	| {
			type: "error";
			payload: string;
	  }
	|{
		type:"user_position";
		payload:LateUser
	}

export interface IvideoProvider extends IVideoState {
	playTo?: (time: Duration) => boolean;
	pause?: () => Promise<boolean>;
	play?: () => Promise<boolean>;
	start?: () => Promise<boolean>;
}
