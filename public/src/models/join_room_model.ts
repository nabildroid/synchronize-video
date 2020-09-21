import { Background } from "../types/room_type";
import { Guest, IUser } from "../types/user_type";

export interface IJoinRoomState {
	title: string;
	author: IUser;
	background: Background;
}

export type JoinRoomResponse = Promise<Guest | false>;
export interface IJoinRoomActions {
	join(user: Guest): JoinRoomResponse;
}

export interface IJoinRoomProvider extends IJoinRoomState {
	join(name: string): JoinRoomResponse;
}
