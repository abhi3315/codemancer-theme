/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Accordion block edit component.
 *
 * @param {Object} props            - Component props.
 * @param {Object} props.attributes - Block attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const { accordionItems } = attributes;

	return (
		<div {...useBlockProps.save()}>
			{accordionItems.map((item) => (
				<div className="accordion__item" key={item.id}>
					<h3 className="accordion__title">
						{item.title}
						<span className="dashicons dashicons-plus accordion__icon"></span>
					</h3>
					<div className="accordion__content">{item.content}</div>
				</div>
			))}
		</div>
	);
}
