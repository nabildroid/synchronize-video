import { Background } from "../types/room_type";
import { IUser } from "../types/user_type";
import { Duration } from "../types/video_type";

export interface IRoomState {
	title: string;
	background: Background;
	author: IUser;
	watchers: IUser[];
}

export interface IRoomActions {
	averagePosition(): Promise<Duration>;
}

export interface IRoomProvider extends IRoomActions{

}