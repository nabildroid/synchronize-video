import { TWColors } from "../types/colors";


export default function applyColor(
	color: TWColors,
	prefix: "bg" | "text",
	sufix: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 5
) {
	if (color == TWColors.BLACK || color == TWColors.WHITE) {
		return `${prefix}-${color}`;
	} else return `${prefix}-${color}-${sufix * 100}`;
}
