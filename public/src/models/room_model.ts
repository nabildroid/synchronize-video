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
	watchersUsers: IUser[];
	loading: boolean;
	error: Error;
}
export const RoomStateInit: IRoomState = {
	author: {
		name: "friend",
		id: null,
	},
	background: null,
	title: null,
	watchers: [],
	watchersUsers: [],
	loading: true,
	error: null,
};

export type RoomActions =
	| {
			type: "load_room";
			payload: IRoomInfo;
	  }
	| {
			type: "guests_to_Users";
			payload: IUser[];
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

export interface IRoomProvider extends IRoomState {
	link:string
}
