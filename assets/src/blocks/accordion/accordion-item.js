/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function accordionItem({
	title,
	content,
	editAccordion,
	removeAccordion,
	id,
}) {
	return (
		<div {...useBlockProps.save()}>
			<div className="accordion__item">
				<RichText
					tagName="h3"
					className="accordion__title"
					value={title}
					placeholder={__('Accordion title', 'codemancer-theme')}
					onChange={(value) => editAccordion(id, value, content)}
				/>
				<RichText
					tagName="div"
					className="accordion__content"
					value={content}
					placeholder={__('Accordion content', 'codemancer-theme')}
					onChange={(value) => editAccordion(id, title, value)}
				/>
				<button
					className="accordion__remove-btn"
					onClick={() => removeAccordion(id)}
				>
					{__('Remove Item', 'codemancer-theme')}
				</button>
			</div>
		</div>
	);
}
