import { Guest } from "../types/user_type";

export interface IAppState {
	user: Guest | false;
}
export type AppActions = {
    
}

export interface IAppProvider extends IAppState{
    
}

export const AppStateInit:IAppState = {
    user:false
}



/*

    App
        Room/JoinRoom
        Messages
        Video

*/