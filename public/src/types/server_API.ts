import { IPAdressType } from "./P2P_node_API";
import { Guest } from "./user_type";

export interface IServerAPI {
	auth: string;
	join: (name: string) => Promise<Guest | false>;
	boardcastIp: (ip) => Promise<IPAdressType[] | false>;
}
