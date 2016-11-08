/* eslint import/no-extraneous-dependencies: [0] */
import { object, func } from 'proptypes';

export const proptTypes = {
  data: object.isRequired,
  dispatch: func.isRequired,
};

export const contextTypes = {
  product: object,
};
