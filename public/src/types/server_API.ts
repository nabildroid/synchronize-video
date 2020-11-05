import { IRoomInfo} from "../models/room_model";
import { IPAdressType } from "./P2P_node_API";
import { Background, JoinRoomResponse, NewRoomResponse, RoomId } from "./room_type";
import { VideoData, VideoLink } from "./video_type";

export type AuthKey = {
	key: string;
	generated: Date;
	expire: Date;
};

export interface IServerAPI {
	readonly auth: AuthKey;
	join(name: string): Promise<JoinRoomResponse>;
	boardcastIp(
		roomId: RoomId,
		ip: IPAdressType
	): Promise<IPAdressType[] | false>;
	loadRoomInfo(id: RoomId): Promise<IRoomInfo | false>;
	signMeIn(auth: AuthKey): Promise<JoinRoomResponse>;
	createRoom(
		name: string,
		title: string,
		background: Background,
		video?: VideoLink // has a value only when the videoType.DOWNLOAD
	): Promise<NewRoomResponse>;
}
