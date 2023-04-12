/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import {
	PanelRow,
	ToggleControl,
	TextControl,
	Button,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

const PostMetaBlock = ({ postType, postMeta, setPostMeta }) => {
	const [featuredPost, setFeaturedPost] = useState(postMeta.is_featured);
	const [sourceUrls, setSourceUrls] = useState(postMeta.source_urls);

	useEffect(() => {
		setPostMeta({
			...postMeta,
			is_featured: featuredPost,
			source_urls: sourceUrls,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [featuredPost, sourceUrls]);

	if ('post' !== postType) return null; // Will only render component for post type 'post'

	return (
		<PluginDocumentSettingPanel
			title={__('Custom Meta Fields', 'codemancer-theme')}
			icon="edit"
			initialOpen="true"
		>
			<PanelRow>
				<ToggleControl
					label={__('Featured post', 'codemancer-theme')}
					onChange={() => setFeaturedPost((prev) => !prev)}
					checked={featuredPost}
				/>
			</PanelRow>
			{sourceUrls?.map((sourceUrl, index) => (
				<PanelRow key={index}>
					<TextControl
						placeholder={
							__('Source URL', 'codemancer-theme') +
							' ' +
							(index + 1)
						}
						onChange={(value) =>
							setSourceUrls((prevUrls) => {
								const newUrls = [...prevUrls];
								newUrls[index] = value;
								return newUrls;
							})
						}
						value={sourceUrl}
					/>
					<Button
						className="is-destructive"
						onClick={() =>
							setSourceUrls((prevUrls) => {
								const newUrls = [...prevUrls];
								newUrls.splice(index, 1);
								return newUrls;
							})
						}
					>
						{__('Remove', 'codemancer-theme')}
					</Button>
				</PanelRow>
			))}
			<PanelRow>
				<Button
					className="is-secondary"
					onClick={() =>
						setSourceUrls((prevUrls) => [...prevUrls, ''])
					}
				>
					{__('Add source URL', 'codemancer-theme')}
				</Button>
			</PanelRow>
		</PluginDocumentSettingPanel>
	);
};

export default compose([
	withSelect((select) => {
		return {
			postMeta: select('core/editor').getEditedPostAttribute('meta'),
			postType: select('core/editor').getCurrentPostType(),
		};
	}),
	withDispatch((dispatch) => {
		return {
			setPostMeta(newMeta) {
				dispatch('core/editor').editPost({ meta: newMeta });
			},
		};
	}),
])(PostMetaBlock);
