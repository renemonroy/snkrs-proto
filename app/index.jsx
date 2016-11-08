import { h, render } from 'preact';
import Thread from './components/views/thread';

const App = () =>
	<div><Thread /></div>;

render(<App />, document.body);
