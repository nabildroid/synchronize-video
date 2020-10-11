import { IRoomInfo } from "../models/room_model";
import { IPAdressType } from "./P2P_node_API";
import { JoinRoomResponse, RoomId } from "./room_type";

export interface IServerAPI {
	auth: string;
	join(name: string): Promise<JoinRoomResponse>;
	boardcastIp(ip:IPAdressType): Promise<IPAdressType[] | false>;
	loadRoomInfo(id: RoomId): Promise<IRoomInfo | false>;
}
