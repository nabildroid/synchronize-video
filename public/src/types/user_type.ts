import P2P_Node_API, { IPAdressType } from "./P2P_node_API";
import { Duration } from "./video_type";

export type Guest = {
	id: number;
	name: string;
};
export interface IUser extends Guest {
	readonly network: P2P_Node_API;
	ip: IPAdressType;
	init(guest: Guest);
	isAuthor(): Promise<boolean>;
	isSynched(): Promise<boolean>;
	position(): Promise<Duration>;
}
