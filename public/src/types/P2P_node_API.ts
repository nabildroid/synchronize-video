import { Guest } from "./user_type";
import { Message } from "./message_type";
import { Duration, VideoData, VideoState } from "./video_type";
import link from "../assets/svgs/link";

export enum DataFlowTypes {
	MESSAGE,
	NEW_WATCHERS,
	VIDEO_STATE,
	WATCHER_POSITION,
	VIDEO_DATA,
	VIDEO_LENGTH,
}

export type DataFlowType =
	| {
			type: DataFlowTypes.MESSAGE;
			payload: Message[];
	  }
	| {
			type: DataFlowTypes.NEW_WATCHERS;
			payload: Guest[];
	  }
	| {
			type: DataFlowTypes.WATCHER_POSITION;
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

export type TargetType = { target: Guest | "all" };
export type SendDataType = TargetType & DataFlowType;
export type QueryDataType = TargetType & { type: DataFlowTypes };

export type RecievedDataType = { sender: Guest } & DataFlowType;

export type IPAdressType = string;

// TODO implement unsubscribe from the listener
export default interface P2P_Node_API {
	init(user: Guest);
	// TODO remove allowAuthors, its just for debugging
	join: (
		IPAdresses: IPAdressType[],
		allowAuthors: boolean
	) => Promise<Guest[]>;
	send: (data: SendDataType) => Promise<boolean>;
	query: (data: QueryDataType) => Promise<boolean>;
	listenTo: <T extends DataFlowTypes>(
		to: T,
		callback: (content: RecievedDataType & { type: T }) => void
	) => () => void;
	getMyIp: () => Promise<IPAdressType>;
	// TODO remove it from interface because this function the only p2p network should have listen, i used it here to just create fake data flow
	listen(data: RecievedDataType);
}
