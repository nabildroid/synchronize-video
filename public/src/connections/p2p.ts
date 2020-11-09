import P2P_Node_API, {
	DataFlowTypes,
	IPAdressType,
	QueryDataType,
	RecievedDataType,
	SendDataType,
} from "../types/P2P_node_API";
import { Guest } from "../types/user_type";
import { VideoType } from "../types/video_type";

class P2P implements P2P_Node_API {
	private user: Guest;

	notifiers: {
		[key in DataFlowTypes]: ((data: RecievedDataType) => void)[];
	} = {
		[DataFlowTypes.MESSAGE]: [],
		[DataFlowTypes.NEW_WATCHERS]: [],
		[DataFlowTypes.WATCHER_POSITION]: [],
		[DataFlowTypes.VIDEO_DATA]: [],
		[DataFlowTypes.VIDEO_LENGTH]: [],
		[DataFlowTypes.VIDEO_STATE]: [],
	};

	init(user: Guest) {
		this.user = user;
	}
	getMyIp(): Promise<IPAdressType> {
		return new Promise((res, rej) =>
			setTimeout(() => res("192.168.1.1"), 500)
		);
	}

	join(IPAdresses: IPAdressType[]): Promise<Guest[]> {
		return new Promise((res, rej) =>
			setTimeout(() => {
				res(
					Array(Math.random() > 0.5 ? 3 : 0)
						.fill(null)
						.map((_, i) => ({
							id: 155 * i,
							name: "hello world!",
							isAuthor: Math.random() > 0.9, // TODO this information should only comes from the server
						}))
				);
			}, 500)
		);
	}

	send(data: SendDataType): Promise<boolean> {
		if (data.type == DataFlowTypes.MESSAGE) {
			console.log(
				"=====>>>> P2P send Message",
				data.payload[0].body.content
			);
			setTimeout(
				() =>
					this.listen({
						type: DataFlowTypes.MESSAGE,
						payload: data.payload,
						sender: {
							id: 8577,
							isAuthor: true,
							name: "Admin",
						},
					}),
				3000
			);
		}
		// TODO include the timestemp
		return new Promise((res, rej) => setTimeout(() => res(true), 5000));
	}

	query(data: QueryDataType): Promise<boolean> {
		if (data.type == DataFlowTypes.VIDEO_DATA) {
			setTimeout(
				() =>
					this.listen({
						type: DataFlowTypes.VIDEO_DATA,
						payload: {
							type: VideoType.DOWNLOAD,
							link: "https://www.w3schools.com/html/mov_bbb.mp4",
						},
						sender: {
							id: 8577,
							isAuthor: true,
							name: "eizeffe",
						},
					}),
				3000
			);
		}
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
		return () => {
			this.notifiers[to] = this.notifiers[to].filter(
				(f) => f != callback
			);
		};
	}
}

export default P2P;
