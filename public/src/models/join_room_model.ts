import { Guest } from "../types/user_type";
import { IRoomInfo } from "./room_model";

export interface IJoinRoomState extends IRoomInfo {
	author: Guest;
	loading: boolean;
	loading_submit: boolean;
	error: Error;
}
export const JoinRoomStateInit: IJoinRoomState = {
	background: null,
	title: null,
	watchers: [],
	author: null,
	loading: true,
	loading_submit: false,
	error: null,
};

export type JoinRoomActions =
	| {
			type: "load_room_info";
			payload: IRoomInfo;
	  }
	| {
			type: "loading_on";
	  }
	| {
			type: "loading_off";
	  }
	| {
			type: "loading_submit_on";
	  }
	| {
			type: "loading_submit_off";
	  }
	| {
			type: "login_error";
			payload: string;
	  };

export interface IJoinRoomProvider extends IJoinRoomState {
	submitName(name: string): Promise<void>;
}
