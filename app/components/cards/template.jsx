import { h, Component } from 'preact';

const Card = ({ header, content, footer, ...props }) => (
	<section>
		{header ? <header>{header()}</header> : null}
		{content ? <div>{content()}</div> : null}
		{footer && footer() !== null ? <footer>{footer()}</footer> : null}
	</section>
);

export default Card;
