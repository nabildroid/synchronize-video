export enum TWColors {
	WHITE = "white",
	BLACK = "black",
	RED = "red",
	GREEN = "green",
	BLUE = "blue",
	YELLOW = "yellow",
	BROWN = "brown",
	PINK = "pink",
	INDIGO = "indigo",
}

export default function applyColor(
	color: TWColors,
	prefix: "bg" | "text",
	sufix: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 5
) {
	if (color == TWColors.BLACK || color == TWColors.WHITE) {
		return `${prefix}-${color}`;
	} else return `${prefix}-${color}-${sufix * 100}`;
}
