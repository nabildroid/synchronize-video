import { Duration, VideoData, VideoState } from "../types/video_type";

export  interface IvideoState {
	data: VideoData;
	length: Duration;
	state: VideoState;
}
export  interface IvideoActions {
	playTo(time: Duration): boolean;
}

export interface IVideoAuthorActions extends IvideoActions{
	pause(): Promise<boolean>;
	play(): Promise<boolean>;
	start(): Promise<boolean>;
}

export interface IvideoProvider extends IvideoState, IVideoAuthorActions{

}