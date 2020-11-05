import { IRoomInfo } from "../models/room_model";
import { IPAdressType } from "../types/P2P_node_API";
import { JoinRoomResponse, NewRoomResponse, RoomId } from "../types/room_type";
import { AuthKey, IServerAPI } from "../types/server_API";
import { VideoLink, VideoType } from "../types/video_type";

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
						// TODO `signMeIn` just to check the credential, response shouldn't contian `isAuth`
						isAuthor: Math.random() > 0.5,
					});
				} else return res(false);
			}, 500)
		);
	}

	join(name): Promise<JoinRoomResponse> {
		console.log("........fetching join");

		return new Promise((res, rej) =>
			setTimeout(() => {
				if (name == "nabil") {
					this.auth = fakeAuthKey;
					res({
						id: 155,
						isAuthor: true,
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
		console.log("........fetching room info");
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
										isAuthor: false,
									},
									{
										id: 160,
										name: "Admin",
										isAuthor: true,
									},
								],
						  }),
				500
			)
		);
	}

	createRoom(
		name: string,
		video: VideoLink,
		title: string,
		background: string
	): Promise<NewRoomResponse> {
		const response: NewRoomResponse = {
			id: Math.floor(Math.random() * 100).toString(),
			video: {
				type: VideoType.DOWNLOAD,
				link: video,
			},
		};
		if (!this.auth) {
			// TODO the server will return the new auth
			this.auth = fakeAuthKey;
			response.user = {
				id: 89,
				name: name,
				isAuthor: true,
			};
		}
		return new Promise((res, rej) => setTimeout(() => res(response), 1000));
	}
}

export default Server;
