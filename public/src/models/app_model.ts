import { Guest } from "../types/user_type";

export interface IAppState {
	user: Guest | false;
	loading: boolean;
}
export type AppActions = {
    
}

export interface IAppProvider extends IAppState{
    
}



export const AppStateInit: IAppState = {
	user: false,
	loading: false,
};

/*

    App
        Room/JoinRoom
        Messages
        Video

*/