/**
 * Main JS file.
 */

/**
 * Import dependencies.
 */
import domReady from '@wordpress/dom-ready';

const handleAccordion = () => {
	const titles = document.querySelectorAll('.accordion__title');
	const content = document.querySelectorAll('.accordion__content');

	titles.forEach((title, index) => {
		title.addEventListener('click', () => {
			if (
				parseInt(content[index].style.height) !==
				content[index].scrollHeight
			) {
				content[index].style.height =
					content[index].scrollHeight + 'px';
				title.classList.add('active');
			} else {
				content[index].style.height = '0px';
				title.classList.remove('active');
			}

			content.forEach((item, i) => {
				if (i !== index) {
					item.style.height = 0;
					titles[i].classList.remove('active');
				}
			});
		});
	});
};

domReady(() => {
	handleAccordion();
});
