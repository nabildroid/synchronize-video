const names = [
	"nabil",
	"lakrib",
	"hello world",
	"test",
	"name is",
	"lorem eposn",
];

export default function () {
	const rand = Math.floor(Math.random() * names.length);
	return names[rand];
}
