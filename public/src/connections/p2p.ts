import P2P_Node_API, {
	DataFlowTypes,
	IPAdressType,
	RecievedDataType,
	SendDataType,
} from "../types/P2P_node_API";
import { IUser } from "../types/user_type";
import User from "./user";

class P2P implements P2P_Node_API {
	notifiers: {
		[key in DataFlowTypes]: ((data: RecievedDataType) => void)[];
	} = {
		[DataFlowTypes.MESSAGE]: [],
		[DataFlowTypes.NEW_USER]: [],
		[DataFlowTypes.USER_POSITION]: [],
		[DataFlowTypes.VIDEO_DATA]: [],
		[DataFlowTypes.VIDEO_LENGTH]: [],
		[DataFlowTypes.VIDEO_STATE]: [],
	};

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
								isAuthor: Math.random() > 0.9, // TODO this information should only comes from the server
							});
							return user;
						})
				);
			}, 500)
		);
	}

	send(data: SendDataType): Promise<boolean> {
		return new Promise((res, rej) => setTimeout(() => res(true), 5000));
	}

	listen(data: RecievedDataType) {
		this.notifiers[data.type].forEach((notifier) => notifier(data));
	}

	listenTo<T extends DataFlowTypes>(
		to: T,
		callback: (data: RecievedDataType & { type: T }) => void
	) {
		this.notifiers[to].push(callback);
	}
}

export default P2P;
