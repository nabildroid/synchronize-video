import { IMessagesState, MessagesActions } from "../models/message_model";
import removeDuplicates from "../utils/removeDuplicates";

export default (state: IMessagesState, action: MessagesActions) => {
	if (action.type == "load_messages")
		return {
			...state,
			loading: false,
			row_messages: action.payload,
		};
	else if (action.type == "set_draft")
		return {
			...state,
			draft: action.payload,
		};
	else if (action.type == "set_timeline_messages")
		return {
			...state,
			timeline_messages: action.payload,
		};
	else if (action.type == "add_new_messages")
		return {
			...state,
			row_messages: [...state.row_messages, ...action.payload],
		};
	else if (action.type == "loading_on")
		return {
			...state,
			loading: true,
		};
	else if (action.type == "loading_off")
		return {
			...state,
			loading: false,
		};
	else return state;
};
