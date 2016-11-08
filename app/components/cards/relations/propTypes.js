/* eslint import/no-extraneous-dependencies: [0] */
import { object, func, any } from 'proptypes';

export const proptTypes = {
	data: object.isRequired,
	onAction: func.isRequired,
	viewport: object,
};

export const contextTypes = {
	product: object,
};
