export default async function firstResolvedPromise<T>(promises: Promise<T>[]) {
	for (let p of promises) {
		try {
			const response = await p;
			return response;
		} catch (e) {}
	}
}

