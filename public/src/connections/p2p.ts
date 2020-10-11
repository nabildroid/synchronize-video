import P2P_Node_API, { IPAdressType, RecievedContent, SentDataType } from "../types/P2P_node_API";
import { IUser } from "../types/user_type";

class P2P implements P2P_Node_API{
    add(IPAdresses: IPAdressType[]):Promise<IUser[]> {
        throw new Error("Method not implemented.");
    }
    send(data: SentDataType): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    listen(callback: (content: RecievedContent) => void) {
        throw new Error("Method not implemented.");
    }

}

export default P2P;