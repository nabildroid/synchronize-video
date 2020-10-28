import P2P_Node_API, {
	DataFlowTypes,
	IPAdressType,
	RecievedDataType,
	SendDataType,
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
						.map((_, i) => {
							const user = new User(this);
							user.init({
								id: 155 * i,
								name: "hello world!",
							});
							return user;
						})
				);
			}, 500)
		);
	}
	send(data: SendDataType): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	listenTo<T extends DataFlowTypes>(
		to: T,
		callback: (data: RecievedDataType & { type: T }) => void
	) {
	}
}

export default P2P;
