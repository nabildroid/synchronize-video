import { IRoomInfo } from "../models/room_model";
import { IPAdressType } from "../types/P2P_node_API";
import { JoinRoomResponse } from "../types/room_type";
import { IServerAPI } from "../types/server_API";
import { Guest } from "../types/user_type";

class Server implements IServerAPI {
	auth = null;

	join(name): Promise<JoinRoomResponse> {
		return new Promise((res, rej) =>
			setTimeout(() => {
				if (name == "nabil") {
					this.auth = "auth me";
					res({
						id: 155,
						name: "nabil",
					});
				} else return res(false);
			}, 500)
		);
	}

	boardcastIp(ip): Promise<IPAdressType[] | false> {
		if (!this.auth) return Promise.resolve<false>(false);
		else
			return new Promise((res, rej) =>
				setTimeout(() => {
					if (this.auth != "auth me") res(false);
					else res(["ip1", "ip2", "ip3"]);
				}, 500)
			);
	}

	loadRoomInfo(id): Promise<IRoomInfo | false> {
		return new Promise((res, rej) =>
			setTimeout(
				() =>
					res({
						author: {
							id: 155,
							name: "efzefz",
						},
						background:
							"https://images.unsplash.com/photo-1505051508008-923feaf90180?ixlib=rb-1.2.1&w=1000&q=80",
						title: "hello "+Math.floor(Math.random() *100),
						watchers: [
							{
								id: 151,
								name: "efzefz",
							},
							{
								id: 160,
								name: "efzefz",
							},
						],
					}),
				5000
			)
		);
	}
}

export default Server;
