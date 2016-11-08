import className from '../../../utils/classname';
import { heading } from '../../../utils/cx-helpers';

export default {
  card: [
    'pt8-sm',
  ],
  header: [
    'header-container',
    'prl4-sm',
  ],
  content: [
    'content-container',
  ],
  column: [
    'ncss-col-sm-6',
  ],
  related: [
    'related-thread',
    'prl0-sm',
    'pt1-sm',
    'pb1-sm',
  ],
  title: className(heading(18), [
    'text-color-black',
    'mb4-sm',
  ]),
  image: [
    'related-thread-image',
  ],
};
