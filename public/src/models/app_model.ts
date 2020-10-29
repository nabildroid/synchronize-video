import { Guest } from "../types/user_type";

export interface IAppState {
	user: Guest | false;
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
			type: "loading_off";
	  };

export const AppStateInit: IAppState = {
	user: false,
	loading: true,
};

export interface IAppProvider extends IAppState {
	login(user: Guest);
} /*

    App
        Room/JoinRoom
        Messages
        Video

*/
