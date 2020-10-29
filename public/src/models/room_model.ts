import { Background } from "../types/room_type";
import { Guest, IUser } from "../types/user_type";
import { Duration } from "../types/video_type";

export interface IRoomInfo {
	title: string;
	background: Background;
	watchers: Guest[];
}
export interface IRoomState extends IRoomInfo {
	watchersUsers: IUser[];
	authorUser: IUser | "currentUser";
	loading: boolean;
	error: Error;
}
export const RoomStateInit: IRoomState = {
	background: null,
	title: null,
	watchers: [],
	watchersUsers: [],
	authorUser: null,
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
			type: "guest_author_to_user";
			payload: IUser|"currentUser";
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
