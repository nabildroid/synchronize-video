import P2P_Node_API, { IPAdressType } from "../types/P2P_node_API";
import { Guest, IUser } from "../types/user_type";
import { Duration } from "../types/video_type";

class User implements IUser {
	id: number = null;
	name: string = null;
	network: P2P_Node_API = null;
    ip: IPAdressType = null;
    
    constructor(network: P2P_Node_API) {
		this.network = network;
    }
	
	init({ id, name }: Guest) {
		this.id = id;
		this.name = name;
	}
	isAuthor() {
		return new Promise<boolean>((res, rej) =>
			setTimeout(() => {
				res(this.id == 155);
			}, 500)
		);
	}
	isSynched() {
		return new Promise<boolean>((res, rej) =>
			setTimeout(() => {
				res(Math.random() > 0.5);
			}, 500)
		);
	}
	position() {
		return new Promise<Duration>((res, rej) =>
			setTimeout(() => {
				res({
					minute: 10,
					secoud: 15,
					toTimestemp: () => 1015,
				});
			}, 500)
		);
	}
}

export default User;
