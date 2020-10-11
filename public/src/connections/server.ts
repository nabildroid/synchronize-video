import { IPAdressType } from "../types/P2P_node_API";
import { IServerAPI } from "../types/server_API";
import { Guest } from "../types/user_type";

class Server implements IServerAPI {
	auth = null;

	join(name) {
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
		) as Promise<Guest | false>;
	}

	boardcastIp(ip) {
		if (!this.auth) return Promise.resolve<false>(false);
		else
			return new Promise((res, rej) =>
				setTimeout(() => {
					if (this.auth != "auth me") res(false);
					else res(["ip1", "ip2", "ip3"]);
				}, 500)
			) as Promise<IPAdressType[] | false>;
	}
}

export default Server;
