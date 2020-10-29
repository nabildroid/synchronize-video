import { Guest } from "../types/user_type";
import { IRoomInfo } from "./room_model";

export interface IJoinRoomState extends IRoomInfo {
	author:Guest;
	loading: boolean;
	error: Error;
}
export const JoinRoomStateInit: IJoinRoomState = {
	background: null,
	title: null,
	watchers: [],
	author:null,
	loading: true,
	error: null,
};

export type JoinRoomActions =
	| {
			type: "load_room";
			payload: IRoomInfo;
	  }
	| {
			type: "loading_on";
	  }
	| {
			type: "loading_off";
	  }
	| {
			type: "login_error";
			payload: string;
	  };

export interface IJoinRoomProvider extends IJoinRoomState {
	submitName(name:string):Promise<void>
}
