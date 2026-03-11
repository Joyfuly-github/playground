export const pxToRem = (value: string): string => {
	const base = 10;

	if (value.endsWith('px')) {
		const num = parseFloat((value.replace('px', '')));
		return `${num / base}rem`;
	}

	return value;
}