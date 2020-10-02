export default function (a: Object) {
	const converted: { [key: string]: string } = {};

	Object.entries(a).map(([key, val]) => {
		if (
			Object.values(converted).indexOf(key) == -1 &&
			!(parseInt(key) >= 0)
		)
			converted[key] = val;
	});
	return Object.keys(converted);
}
