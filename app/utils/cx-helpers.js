/**
 * Returns a set of NCSS classes used to create a header like into
 * text elements (not h1, h2, h3, etc).
 */
export const heading = (fontSize) => {
	const fs = fontSize.toString();
	return ['ncss-brand', `fs${fs}-sm`, `lh${fs}-sm`];
};
