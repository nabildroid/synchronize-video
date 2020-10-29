type ClAcceptedValue = string | Cl | { [key: string]: boolean };

export default function cl(...args: ClAcceptedValue[]) {
	const t = new Cl();
	t.value = args;
	return t;
}
export function cls(...args: ClAcceptedValue[]) {
	return { className: cl(...args).toString() as string };
}

/*
a = cl("border","sm:hello")

b = cl(a,"bg-red-500")

cl(b,"bg-red",{"green-500":true})
cl(b.apply(trye))

*/

interface ICl {
	value: ClAcceptedValue[];
	applied: boolean;
	apply(value: boolean);
	toString(): string;
}

class Cl implements ICl {
	value: ClAcceptedValue[] = [];
	applied = true;

	apply(value) {
		this.applied = value;
		return this;
	}

	toString() {
		if (!this.applied) return "";
		return this.value.reduce((acc, val: ClAcceptedValue) => {
			if (val instanceof Cl) return `${acc} ${val.toString()}`;
			else if (typeof val == "string") return `${acc} ${val}`;
			else
				return (
					acc +
					Object.entries(val).reduce((a, v) => {
						if (v[1] == true) return `${a} ${v[0]}`;
						else return a;
					}, "")
				);
		}, "");
	}
}
