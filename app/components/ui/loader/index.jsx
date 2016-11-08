import { h, Component } from 'preact';
import { className } from '../../../utils/classname';
import { classes } from './classNames';
import globals from '../../../constants/globals';

const Loader = ({ src, width, height }) => (
  <div className={className(classes.loader)}>
    <img src={src} width={width} height={height} role="presentation" />
  </div>
);

Loader.defaultProps = {
  src: globals.LOADER_PATH,
  width: 20,
  height: 20,
};

export default Loader;
