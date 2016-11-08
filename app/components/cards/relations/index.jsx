import { h, Component } from 'preact';
import Card from '../template';
import className from '../../../utils/classname';
import classNames from './classNames';
import resizeListener from '../../../utils/resize-listener';
import { formatImageUrl } from '../../../utils/nike-helpers';

export const relationsCardHeader = ({ data }) => (
	<div className={className(classNames.header)}>
		<h2 className={className(classNames.title)}>{data.title}</h2>
	</div>
);

export const relationsCardContent = ({ data, viewport, onAction }) => {
	const height = viewport.width / 2;
	return (
		<div className={className(classNames.content)}>
			{data.threads.map(({ imageUrl, threadId }, i) => {
				const padding = ((i + 1) % 2 === 0 ? 'pl1-sm' : 'pr1-sm');
				return (
					<div
						key={`related-thread-${i}`}
						className={className([classNames.column, classNames.related, padding])}
						style={{ height: `${height}px` }}
					>
						<div
							className={className(classNames.image)}
							style={{ backgroundImage: `url('${formatImageUrl(imageUrl, 'card')}')` }}
							onClick={() => (!onAction || onAction('related:select', { threadId }))}
						/>
					</div>
				);
			})}
		</div>
	);
};

const Relations = props => (
	<Card
		cardName="relations"
		className={className(classNames.card)}
		header={() => relationsCardHeader(props)}
		content={() => relationsCardContent(props)}
	/>
);

Relations.defaultProps = {
	onAction: () => {},
};

export default resizeListener()(Relations);
