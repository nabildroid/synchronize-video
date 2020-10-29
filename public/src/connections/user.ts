import P2P_Node_API, { IPAdressType } from "../types/P2P_node_API";
import { Guest, IUser } from "../types/user_type";
import { Duration, VideoData, VideoType } from "../types/video_type";

class User implements IUser {
	id: number = null;
	name: string = null;
	network: P2P_Node_API = null;
	ip: IPAdressType = null;
	isAuthor: boolean = false;

	constructor(network: P2P_Node_API) {
		this.network = network;
	}

	init({ id, name, isAuthor }: Guest) {
		this.id = id;
		this.name = name;
		this.isAuthor = isAuthor;
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
	getVideo() {
		if (!this.isAuthor)
			return Promise.reject(`${this.name} is not the author`);
		return new Promise<VideoData>((res, rej) =>
			setTimeout(() => {
				res({
					type: VideoType.DOWNLOAD,
					length: {
						minute: 10,
						secoud: 15,
						toTimestemp: () => 1015,
					},
					link: "https://www.w3schools.com/html/mov_bbb.mp4",
				});
			}, 500)
		);
	}
}

export default User;
