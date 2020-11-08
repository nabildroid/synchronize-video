import { IRoomInfo } from "../models/room_model";
import { IPAdressType } from "./P2P_node_API";
import {
	Background,
	JoinRoomResponse,
	NewRoomResponse,
	RoomId,
} from "./room_type";
import { Guest } from "./user_type";
import { VideoData, VideoLink } from "./video_type";

export type AuthKey = {
	key: string;
	generated: Date;
	expire: Date;
};

export interface IServerAPI {
	readonly auth: AuthKey;
	join(name: string): Promise<Guest>;
	boardcastIp(
		roomId: RoomId,
		ip: IPAdressType
	): Promise<IPAdressType[] | false>;
	// TODO remove allowAuthors, its just for debugging
	loadRoomInfo(id: RoomId, allowAuthors?: boolean): Promise<IRoomInfo | false>;
	signMeIn(auth: AuthKey): Promise<Guest>;
	createRoom(
		name: string,
		title: string,
		background: Background,
		video?: VideoLink // has a value only when the videoType.DOWNLOAD
	): Promise<NewRoomResponse>;
}
