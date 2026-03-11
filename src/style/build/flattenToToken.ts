export function flattenTokens(
	obj: any,
	prefix = '--'
) {
	const result: Record<string, any> = {};

	for (const key in obj) {
		const value = obj[key];

		if (key === 'value') {
			result[prefix] = value;
		}
		else if (typeof value === 'object' && value !== null) {
			const newKey = prefix ? `${prefix}-${key}` : key;
			Object.assign(result, flattenTokens(value, newKey));
		}
	}

	return result;
}