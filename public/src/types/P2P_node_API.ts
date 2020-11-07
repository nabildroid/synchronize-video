import { Guest, IUser } from "./user_type";
import { Message } from "./message_type";
import { Duration, VideoData, VideoState } from "./video_type";
import User from "../connections/user";
import link from "../assets/svgs/link";

export enum DataFlowTypes {
	MESSAGE,
	NEW_USER,
	VIDEO_STATE,
	USER_POSITION,
	VIDEO_DATA,
	VIDEO_LENGTH,
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
	  }
	// TODO you should also send the video state with the data
	| {
			type: DataFlowTypes.VIDEO_DATA;
			payload: VideoData;
	  }
	| {
			type: DataFlowTypes.VIDEO_LENGTH; // flow only when the videoType.BROADCAST
			payload: Duration;
	  };

export type SendDataType = { target: Guest | "all" } & DataFlowType;

export type RecievedDataType = { sender: Guest } & DataFlowType;

export type IPAdressType = string;

// TODO implement unsubscribe from the listener
export default interface P2P_Node_API {
	// TODO remove allowAuthors, its just for debugging 
	join: (IPAdresses: IPAdressType[],allowAuthors:boolean) => Promise<IUser[]>;
	send: (data: SendDataType) => Promise<boolean>;
	listenTo: <T extends DataFlowTypes>(
		to: T,
		callback: (content: RecievedDataType & { type: T }) => void
	) => void;
	getMyIp: () => Promise<IPAdressType>;
	// TODO remove it from interface because this function the only p2p network should have listen, i used it here to just create fake data flow
	listen(data: RecievedDataType)
}
