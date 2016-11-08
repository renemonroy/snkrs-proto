import { h, Component } from 'preact';
import View from '../template';
import * as Cards from '../../cards';
import { Loader } from '../../ui';
import { isEmptyObject } from '../../../utils/js-helpers';
import './styles.styl';

export const tagsList = tags => (
  tags.map((tag, i) =>
    <Cards.Tags key={`tags-list-${i}`} data={tag} />
  )
);

const Thread = ({ thread, tags }) => (
  <div className="snkr-thread">
    {isEmptyObject(thread) ?
      <Loader /> :
      (<div className="snkr-content">
        {tagsList(tags)}
      </div>)
    }
  </div>
);

Thread.defaultProps = {
  thread: {},
  relations: [],
  tags: [],
};

export default Thread;
