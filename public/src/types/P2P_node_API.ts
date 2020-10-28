import { Guest, IUser } from "./user_type";
import { Message } from "./message_type";
import { Duration, VideoState } from "./video_type";
import User from "../connections/user";
import link from "../assets/svgs/link";

export enum DataFlowTypes {
	MESSAGE,
	NEW_USER,
	VIDEO_STATE,
	USER_POSITION,
}

export type DataFlowType =
	| {
			type: DataFlowTypes.MESSAGE;
			payload: Message[];
	  }
	| {
			type: DataFlowTypes.NEW_USER;
			payload: User[];
	  }
	| {
			type: DataFlowTypes.USER_POSITION;
			payload: Duration;
	  }
	| {
			type: DataFlowTypes.VIDEO_STATE;
			payload: VideoState;
	  };

export type SendDataType = { target: Guest | "all" } & DataFlowType;

export type RecievedDataType = { sender: Guest } & DataFlowType;

export type IPAdressType = string;

// TODO implement unsubscribe from the listener
export default interface P2P_Node_API {
	join: (IPAdresses: IPAdressType[]) => Promise<IUser[]>;
	send: (data: SendDataType) => Promise<boolean>;
	listenTo: <T extends DataFlowTypes>(
		to: T,
		callback: (content: RecievedDataType & { type: T }) => void
	) => void;
	getMyIp: () => Promise<IPAdressType>;
}
