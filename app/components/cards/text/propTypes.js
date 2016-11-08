/* eslint import/no-extraneous-dependencies: [0] */
import { object, bool, string } from 'proptypes';

export const proptTypes = {
	data: object.isRequired,
	noheader: bool,
	nofooter: bool,
	className: string,
};

export const contextTypes = {
	product: object,
};
