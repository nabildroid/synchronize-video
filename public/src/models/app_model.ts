import { NewRoomData } from "../types/room_type";
import { Guest } from "../types/user_type";

export interface IAppState {
	user: Guest;
	// TODO find meaningful name instead of newRoom, because sometimes it referes to prevRoom
	newRoom?: NewRoomData;
	loading: boolean;
}
export type AppActions =
	| {
			type: "login";
			payload: Guest;
	  }
	| {
			type: "loading_on";
	  }
	| {
			type: "load_new_room";
			payload: NewRoomData;
	  }
	| {
			type: "loading_off";
	  };

export const AppStateInit: IAppState = {
	user: null,
	loading: true,
};

export interface IAppProvider extends IAppState {
	login(user: Guest);
	addNewRoom(roomData: NewRoomData, user?: Guest);
} /*

    App
        Room/JoinRoom
        Messages
        Video

*/
