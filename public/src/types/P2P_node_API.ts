import { Guest, IUser } from "./user_type";
import { Message } from "./message_type";
import { Duration } from "./video_type";

export type RecievedContent = {
	user: Guest;
	message: Message | null;
	currentPosition: Duration | null;
	rawData: string;
};

export enum DataFlowTypes {}

export type SentDataType = {
	target: Guest | "all";
	type: DataFlowTypes;
};

export type IPAdressType = string

export default interface P2P_Node_API {
	add(IPAdresses:IPAdressType[]):Promise<IUser[]>
	send(data: SentDataType): Promise<boolean>;
	listen(callback: (content: RecievedContent) => void);
}
