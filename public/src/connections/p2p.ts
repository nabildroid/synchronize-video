import P2P_Node_API, { IPAdressType, RecievedContent, SentDataType } from "../types/P2P_node_API";

class P2P implements P2P_Node_API{
    add(IPAdresses: IPAdressType[]) {
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