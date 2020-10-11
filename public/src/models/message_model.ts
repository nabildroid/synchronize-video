import { Message, MessageBody, TimelineMessages } from "../types/message_type";
import { Duration } from "../types/video_type";

export interface IMessagesState {
	messages: Message[];
}
export interface IMessagesActions {
	send(msg: Message): Promise<boolean>;
	listen(callback: Function): void;
}


export interface IMessagesProvider extends IMessagesState {
	draftMessage: {
		text: string;
		setText(val: string);
	};
	timeLineMessages: TimelineMessages;
	send(body: MessageBody): Promise<boolean>;
}
