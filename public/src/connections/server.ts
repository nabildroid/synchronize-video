import { IRoomInfo } from "../models/room_model";
import { IPAdressType } from "../types/P2P_node_API";
import { JoinRoomResponse, RoomId } from "../types/room_type";
import { AuthKey, IServerAPI } from "../types/server_API";

const fakeAuthKey: AuthKey = {
	key: "auth me please!",
	generated: new Date(),
	expire: new Date(),
};
class Server implements IServerAPI {
	auth: AuthKey = null;

	signMeIn(auth: AuthKey): Promise<JoinRoomResponse> {
		return new Promise((res, rej) =>
			setTimeout(() => {
				if (auth.key == "auth me please!") {
					this.auth = fakeAuthKey;
					res({
						id: 155,
						name: "nabil",
						isAuthor:true
					});
				} else return res(false);
			}, 500)
		);
	}

	join(name): Promise<JoinRoomResponse> {
		console.log("........fetching join")

		return new Promise((res, rej) =>
			setTimeout(() => {
				if (name == "nabil") {
					this.auth = fakeAuthKey;
					res({
						id: 155,
						isAuthor:true,
						name: "nabil",
					});
				} else return res(false);
			}, 500)
		);
	}

	boardcastIp(
		roomId: RoomId,
		ip: IPAdressType
	): Promise<IPAdressType[] | false> {
		if (!this.auth) return Promise.resolve<false>(false);
		else
			return new Promise((res, rej) =>
				setTimeout(() => {
					if (this.auth.key != "auth me please!") res(false);
					else res(["ip1", "ip2", "ip3"]);
				}, 500)
			);
	}

	loadRoomInfo(id: string): Promise<IRoomInfo | false> {
		console.log("........fetching room info")
		return new Promise((res, rej) =>
			setTimeout(
				() =>
					id != "11"
						? res(false)
						: res({
								background:
									"https://images.unsplash.com/photo-1505051508008-923feaf90180?ixlib=rb-1.2.1&w=1000&q=80",
								title:
									"hello " + Math.floor(Math.random() * 100),
								watchers: [
									{
										id: 151,
										name: "watcher",
										isAuthor:false
									},
									{
										id: 160,
										name: "Admin",
										isAuthor:true
									},
								],
						  }),
				500
			)
		);
	}
}

export default Server;
