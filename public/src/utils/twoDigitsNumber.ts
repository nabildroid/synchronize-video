export default function TwoDigits(n: number) {
	if (n < 10) return `0${n}`;
	else return n.toString();
}
