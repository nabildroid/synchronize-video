import { Duration, VideoData, VideoState } from "../types/video_type";

export interface IVideoState {
	data: VideoData;
	length: Duration;
	state: VideoState;
	loading: boolean;
	error: Error;
}

export const VideoStateInit: IVideoState = {
	data: null,
	length: null,
	state: VideoState.WAITE,
	loading: true,
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
	  };

export interface IvideoProvider extends IVideoState {
	playTo(time: Duration): boolean;
	pause(): Promise<boolean>;
	play(): Promise<boolean>;
	start(): Promise<boolean>;
}
