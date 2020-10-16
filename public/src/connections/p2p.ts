import P2P_Node_API, {
	IPAdressType,
	RecievedContent,
	SentDataType,
} from "../types/P2P_node_API";
import { IUser } from "../types/user_type";
import User from "./user";

class P2P implements P2P_Node_API {
	getMyIp(): Promise<IPAdressType> {
		return new Promise((res, rej) =>
			setTimeout(() => res("192.168.1.1"), 500)
		);
	}
	join(IPAdresses: IPAdressType[]): Promise<IUser[]> {
		return new Promise((res, rej) =>
			setTimeout(() => {
				res(
					Array(10)
						.fill(null)
						.map((_) => {
							const user = new User(this);
							user.init({
								id: Math.floor(Math.random() * 100),
								name: "hello world!",
							});
							return user;
						})
				);
			}, 500)
		);
	}
	send(data: SentDataType): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	listen(callback: (content: RecievedContent) => void) {
		throw new Error("Method not implemented.");
	}
}

export default P2P;
