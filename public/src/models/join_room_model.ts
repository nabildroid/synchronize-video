import { IRoomInfo } from "./room_model";

export interface IJoinRoomState extends IRoomInfo {
	loading: boolean;
	error: Error;
}
export const JoinRoomStateInit: IJoinRoomState = {
	author: {
		name:"friend",
		id:null
	},
	background: null,
	title: null,
	watchers: [],
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
