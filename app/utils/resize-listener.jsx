import { h, Component } from 'preact';
import hoistStatics from 'hoist-non-react-statics';
import { debouncer } from './js-helpers';

/**
 * For React/Preact components that need to listen the window event
 * 'resize', resizeListener is a wrapper that refreshes itself every
 * time the window gets resized or the orientation change.
 * The wrapped component will have access to the window dimensions
 * through the prop 'viewport' every time those changes happen.
 * The refreshing time can be debounced.
 */
const defaultConfig = { debounceTime: 300 };
const resizeListener = (c = {}) => (WrappedComponent) => {
	const config = Object.assign({}, defaultConfig, c);

	class ResizeListener extends Component {

		constructor(props) {
			super(props);
			this.state = {
				viewport: {
					width: window.innerWidth,
					height: window.innerHeight,
				},
			};
			this.handleWindowResize = this.handleWindowResize.bind(this);
		}

		componentWillMount() {
			window.addEventListener('resize', this.handleWindowResize);
			window.addEventListener('orientationchange', this.handleWindowResize);
		}

		componentWillUnmount() {
			window.removeEventListener('resize', this.handleWindowResize);
			window.removeEventListener('orientationchange', this.handleWindowResize);
		}

		@debouncer(config.debounceWindowResize)
		handleWindowResize() {
			const { viewport } = this.state;
			if (viewport.width !== window.innerWidth || viewport.height !== window.innerHeight) {
				this.setState({
					viewport: { width: window.innerWidth, height: window.innerHeight },
				});
			}
		}

		render() {
			const { viewport } = this.state;
			return <WrappedComponent {...this.props} viewport={viewport} />;
		}

	}

	return hoistStatics(ResizeListener, WrappedComponent);
};

export default resizeListener;
