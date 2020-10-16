import { IRoomInfo } from "../models/room_model";
import { IPAdressType } from "./P2P_node_API";
import { JoinRoomResponse, RoomId } from "./room_type";

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
}
