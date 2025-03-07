import { IRoomInfo } from "../models/room_model";
import { IPAdressType } from "../types/P2P_node_API";
import { JoinRoomResponse, NewRoomResponse, RoomId } from "../types/room_type";
import { AuthKey, IServerAPI } from "../types/server_API";
import { Guest } from "../types/user_type";
import { VideoLink, VideoType } from "../types/video_type";

const fakeAuthKey: AuthKey = {
	key: "auth me please!",
	generated: new Date(),
	expire: new Date(),
};
class Server implements IServerAPI {
	auth: AuthKey = null;

	signMeIn(auth: AuthKey): Promise<Guest> {
		console.log("==========> get user from auth request");

		return new Promise((res, rej) =>
			setTimeout(() => {
				if (auth.key == "auth me please!") {
					this.auth = fakeAuthKey;
					res({
						id: 155,
						name: "nabil",
						// TODO `signMeIn` just to check the credential, response shouldn't contian `isAuth`
						isAuthor: false,
					});
				} else return res(null);
			}, 500)
		);
	}

	join(name): Promise<Guest> {
		console.log("==========> join request");

		return new Promise((res, rej) =>
			setTimeout(() => {
				if (name == "nabil") {
					this.auth = fakeAuthKey;
					res({
						id: 155,
						isAuthor: false,
						name: "nabil",
					});
				} else return res(null);
			}, 500)
		);
	}

	boardcastIp(
		roomId: RoomId,
		ip: IPAdressType
	): Promise<IPAdressType[] | false> {
		console.log("==========> add my api to sever, and get watchers ips request");

		if (!this.auth) return Promise.resolve<false>(false);
		else
			return new Promise((res, rej) =>
				setTimeout(() => {
					if (this.auth.key != "auth me please!") res(false);
					else res(["ip1", "ip2", "ip3"]);
				}, 500)
			);
	}

	loadRoomInfo(id: string,allowAuthors:boolean = true): Promise<IRoomInfo | false> {
		console.log("==========> room info request");

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
										id: 155,
										name: "nabil",
										isAuthor: false,
									},
									{
										id: 310,
										name: "Admin",
										isAuthor: allowAuthors,
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
		console.log("==========> create new room request");

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
				id: 155,
				name: name,
				isAuthor: true,
			};
		}
		return new Promise((res, rej) => setTimeout(() => res(response), 1000));
	}
}

export default Server;
