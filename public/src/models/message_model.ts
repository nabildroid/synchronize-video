import { Message ,MessageBody} from "../types/message_type";


export interface IMessagesState{
	prevMessages: Message[];

}
export interface IMessagesActions {
	send(msg: Message): Promise<boolean>;
	listen(callback: Function): void;
}

export interface IMessagesProvider extends IMessagesState{
	send(body:MessageBody): Promise<boolean>;
}