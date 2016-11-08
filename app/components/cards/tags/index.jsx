import { h, Component } from 'preact';
import { connect } from 'react-redux';
import { ThreadActions } from '../../../actions';
import Card from '../template';
import className from '../../../utils/classname';
import classes from './classNames';
import './styles.styl';

export const tagsHeader = ({ data }) => (
  <div className={className(classes.header)}>
    <h4 className={className(classes.title)}>{data.title}</h4>
  </div>
);

export const tagsContent = ({ data, dispatch }) => (
  <div className={className(classes.content)}>
    {data.tags.map((tag, i) => (
      <button
        key={`snkr-tag-${i}`}
        className={className(classes.button)}
        onClick={() => dispatch(ThreadActions.selectTag(tag))}
      >
        {tag}
      </button>
    ))}
  </div>
);

const Tags = props => (
  <Card
    cardName="tags"
    className={className(classes.card)}
    header={() => tagsHeader(props)}
    content={() => tagsContent(props)}
  />
);

export default connect()(Tags);
