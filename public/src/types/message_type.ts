import { Guest } from "./user_type";
import { Duration } from "./video_type";

export enum MessageReactions {
	LANTH,
	HEART,
	ANGER,
	SAD,
}

export enum MessageType {
	TEXT,
	REACTION,
}

export type MessageBody =
	| {
			type: MessageType.TEXT;
			content: string;
	  }
	| {
			type: MessageType.REACTION;
			content: MessageReactions;
	  };

export type Message = {
	user: Guest;
	body: MessageBody;
	duration: Duration;
};

export type TimelineMessage = { id: number } & (
	| {
			type: "dot";
	  }
	| {
			type: "time";
			payload: Duration;
	  }
	| {
			type: "message";
			payload: Message;
	  }
);
export type TimelineMessages = TimelineMessage[];
