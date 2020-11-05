import { Guest } from "./user_type";
import { VideoData, VideoType } from "./video_type";

export type Background = string;

export type RoomId = string;
export type JoinRoomResponse = Guest | false;

export type NewRoomResponse = {
	id: RoomId;
	user?: Guest; // create new user, or use existing one
	video? : VideoData & { type: VideoType.DOWNLOAD}; // the parsed video from the server
	// TODO add room expire date
};

export type NewRoomData = {
	id: RoomId;
	video: VideoData;
	title: string;
	background: Background;
};
