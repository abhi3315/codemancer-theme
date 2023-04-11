/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import AccordionItem from './accordion-item';
import './editor.scss';

/**
 * Accordion block edit component.
 *
 * @param {Object}   props               - Component props.
 * @param {Object}   props.attributes    - Block attributes.
 * @param {Function} props.setAttributes - Set block attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { accordionItems } = attributes;

	// Accordion block
	const [accordion, setAccordion] = useState(accordionItems);

	// Add accordion
	const addAccordion = () => {
		setAccordion([
			...accordion,
			{
				title: '',
				content: '',
				id: Math.floor(Math.random() * 10000),
			},
		]);
	};

	// Remove accordion
	const removeAccordion = (id) => {
		setAccordion(accordion.filter((item) => item.id !== id));
	};

	// Edit accordion
	const editAccordion = (id, title, content) => {
		setAccordion(
			accordion.map((item) => {
				if (item.id === id) {
					item.title = title;
					item.content = content;
				}
				return item;
			})
		);
	};

	useEffect(() => {
		setAttributes({ accordionItems: accordion });
	}, [accordion, setAttributes]);

	return (
		<div {...useBlockProps()}>
			<div className="accordion">
				{accordion.map((item) => (
					<AccordionItem
						key={item.id}
						id={item.id}
						title={item.title}
						content={item.content}
						removeAccordion={removeAccordion}
						editAccordion={editAccordion}
					/>
				))}
			</div>
			<button className="accordion__add-btn" onClick={addAccordion}>
				{__('Add New Item', 'codemancer-theme')}
			</button>
		</div>
	);
}
