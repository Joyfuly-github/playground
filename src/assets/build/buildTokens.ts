import { flattenTokens } from "@/assets/build/flattenToToken";
import { pxToRem } from "@/assets/build/pxToRem";
import fs from "fs";
import path from "path";

const TOKEN_PATH = path.resolve('src/assets/tokens');
const OUTPUT_PATH = path.resolve('src/assets/scss/base');

const files = fs.readdirSync(TOKEN_PATH)

files.forEach((file) => {
	const name = file.replace('.json', '');

	const json = JSON.parse(
		fs.readFileSync(path.join(TOKEN_PATH, file), 'utf-8')
	)

	const flatTokens = flattenTokens(json);
	let scss = '';

	Object.entries(flatTokens).forEach(([key, value]) => {
		const converted = pxToRem(value as string);
		scss += `${key}: ${converted}; \n`;
	})

	if (name === 'mobile') {
		scss = `@media (width < 768px) {\n:root {\n${scss}\n}\n}`
	} else {
		scss = `:root {\n${scss}\n}`
	}

	fs.writeFileSync(
		path.join(OUTPUT_PATH, `_${name}.scss`), scss
	)
});