export default function removeDuplicates<T extends any>(
	arr: T[],
	cretria: (a: T, b: T) => boolean
) {
	return arr.filter((val, i) => arr.findIndex((f) => cretria(f, val)) == i);
}