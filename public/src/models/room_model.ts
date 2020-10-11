import { Background } from "../types/room_type";
import { Guest, IUser } from "../types/user_type";
import { Duration } from "../types/video_type";


export interface IRoomInfo {
	title: string;
	background: Background;
	author: Guest;
	watchers: Guest[];
}
export interface IRoomState extends IRoomInfo {

}

export interface IRoomActions {
	averagePosition(): Promise<Duration>;
}

export interface IRoomProvider extends IRoomActions{

}