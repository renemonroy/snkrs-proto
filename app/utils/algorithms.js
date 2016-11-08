/**
 * Returns the distance between 2 points using the Pythagorean theorem.
 */
export const getDistanceBetween2Points = (p1, p2) =>
	Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

/**
 * Calculates and returns the angle between 2 points in radians.
 */
export const getAngleBetween2Points = (p1, p2) =>
	Math.atan2(p2.x - p1.x, p2.y - p1.y);

/**
 * Returns the position of the mouse inside a specific element.
 */
export const getMousePosition = (e, el) => {
	const rect = el.getBoundingClientRect();
	return {
		x: (e.pageX || e.touches[0].clientX) - rect.left,
		y: (e.pageY || e.touches[0].clientY) - rect.top,
	};
};

/**
 * Resize dimensions proportionally to the size of a specific width.
 */
export const scaleToWidth = (maxWidth, { width, height }) => {
	const aspectRatio = maxWidth / width;
	return {
		width: width * aspectRatio,
		height: height * aspectRatio,
	};
};
