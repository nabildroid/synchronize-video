import P2P_Node_API, { DataFlowTypes } from "../types/P2P_node_API";
import { Guest } from "../types/user_type";

export interface IAppState {
	auth: Guest | false;
	subscribers: { type: DataFlowTypes; action: DataFlowTypes }[];
}
export default interface IAppAction extends P2P_Node_API {
	subscribe(type: DataFlowTypes, notifier: () => void);
	query();
}


/*

    App
        Room/JoinRoom
        Messages
        Video

*/