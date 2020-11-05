const names = [
	"nabil",
	"lakrib",
	"hello world",
	"test",
	"name is",
	"lorem eposn",
	"Admin"
];

export default function (exclude:string[]=[]) {
	let rand:number = null;
	do{
		rand = Math.floor(Math.random() * names.length);
	}while(exclude.includes(names[rand]));

	return names[rand];
}
