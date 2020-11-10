import { Guest } from "../types/user_type";
import { Duration, VideoData, VideoState } from "../types/video_type";

export type LateUser = {
	user: Guest;
	position: Duration;
};
export interface IVideoState {
	data: VideoData;
	length: Duration;
	state: VideoState;
	position: Duration;
	isSynced: boolean;
	lateWatchers: LateUser[];
	controller: boolean;
	loading: boolean;
	error: Error;
}

export const VideoStateInit: IVideoState = {
	data: null,
	length: null,
	state: VideoState.WAITING,
	lateWatchers: [],
	isSynced: true,
	controller: true,
	loading: true,
	position: {
		minute: 0,
		secoud: 0,
		toTimestemp: () => 10,
	},

	error: null,
};

export type VideoActions =
	| {
			type: "load_video";
			payload: VideoData;
	  }
	| {
			type: "set_length";
			payload: Duration;
	  }
	| {
			type: "set_state";
			payload: VideoState;
	  }
	| {
			type: "loading_on";
	  }
	| {
			type: "loading_off";
	  }
	| {
			type: "sync_on";
	  }
	| {
			type: "sync_off";
	  }
	| {
			type: "error";
			payload: string;
	  }
	| {
			type: "controller_on";
	  }
	| {
			type: "controller_off";
	  }
	| {
			type: "user_position";
			payload: LateUser;
	  }
	| {
			type: "update_position";
			payload: Duration;
	  };

export interface IvideoProvider extends IVideoState {
	toggleController();
	setLength(length: Duration);
	playToTime(time: Duration);
	playToProgress(progress: number);
	onProgressSeekTo(fct: (timestamp: number) => void);
	pause();
	play();
}
