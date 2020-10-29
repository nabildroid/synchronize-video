import P2P_Node_API, { IPAdressType } from "./P2P_node_API";
import { Duration, VideoData } from "./video_type";

export type Guest = {
	id: number;
	name: string;
	isAuthor:boolean;
};
export interface IUser extends Guest {
	readonly network: P2P_Node_API;
	ip: IPAdressType;
	init(guest: Guest);
	isSynched(): Promise<boolean>;
	position(): Promise<Duration>;
	getVideo():Promise<VideoData>
}
