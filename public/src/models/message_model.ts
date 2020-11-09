import {
	Message,
	MessageReactions,
	TimelineMessages,
} from "../types/message_type";

export interface IMessagesState {
	row_messages: Message[];
	timeline_messages: TimelineMessages;
	draft: string;
	loading: boolean;
}
export const MessagesStateInit: IMessagesState = {
	draft: "",
	row_messages: [],
	timeline_messages: [],
	loading: true,
};

export type MessagesActions =
	| {
			type: "set_draft";
			payload: string;
	  }
	| {
			type: "load_messages";
			payload: Message[];
	  }
	| {
			type: "add_new_messages";
			payload: Message[];
	  }
	| {
			type: "loading_on";
	  }
	| {
			type: "loading_off";
	  }
	| {
			type: "set_timeline_messages";
			payload: TimelineMessages;
	  };

export interface IMessagesProvider extends IMessagesState {
	setDraft(val: string);
	send();
	sendReaction(reaction: MessageReactions);
}
