import { Message, MessageBody } from "../types/message_type";
import { Duration } from "../types/video_type";

export interface IMessagesState {
	messages: Message[];
}
export interface IMessagesActions {
	send(msg: Message): Promise<boolean>;
	listen(callback: Function): void;
}

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

export interface IMessagesProvider extends IMessagesState {
	draftMessage: {
		text: string;
		setText(val: string);
	};
	timeLineMessages: TimelineMessages;
	send(body: MessageBody): Promise<boolean>;
}
