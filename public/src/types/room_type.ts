import { Guest } from "./user_type";
import { VideoData, VideoType } from "./video_type";

export type Background = string;

export type RoomId = string;
export type JoinRoomResponse = Guest | false;

export type NewRoomResponse = {
	id: RoomId;
	user?: Guest;
	video: VideoData & { type: VideoType.DOWNLOAD};
	// TODO add room expire date
};

export type NewRoomData = {
	id: RoomId;
	video: VideoData;
	title: string;
	background: Background;
};
