import { Background } from "../types/room_type";
import { Guest } from "../types/user_type";

export interface IRoomInfo {
	title: string;
	background: Background;
	watchers: Guest[];
}
export type AuthorGuest = Guest | "currentUser";

export interface IRoomState extends IRoomInfo {
	authorGuest: AuthorGuest;
	loading: boolean;
	error: Error;
}
export const RoomStateInit: IRoomState = {
	background: null,
	title: null,
	watchers: [],
	authorGuest: null,
	loading: true,
	error: null,
};

export type RoomActions =
	| {
			type: "load_room";
			payload: IRoomInfo;
	  }
	| {
			type: "add_watchers";
			payload: Guest[];
	  }
	| {
			type: "guest_to_author";
			payload: Guest | "currentUser";
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
	link: string;
}
