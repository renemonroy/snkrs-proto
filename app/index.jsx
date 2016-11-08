import { h, render } from 'preact';
import Thread from './components/thread';

const App = () =>
  <div><Thread /></div>;

render(<App />, document.body);
