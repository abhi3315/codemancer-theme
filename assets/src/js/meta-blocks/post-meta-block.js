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

const PostMetaBlock = ({ postType, postMeta, setPostMeta }) => {
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
					onChange={(value) => setPostMeta({ is_featured: value })}
					checked={postMeta.is_featured || false}
				/>
			</PanelRow>
			{postMeta.source_urls &&
				postMeta.source_urls.map((sourceUrl, index) => (
					<PanelRow key={index}>
						<TextControl
							placeholder={
								__('Source URL', 'codemancer-theme') +
								' ' +
								(index + 1)
							}
							onChange={(value) => {
								const newSourceUrls = postMeta.source_urls;
								newSourceUrls[index] = value;
								setPostMeta({ source_urls: newSourceUrls });
							}}
							value={sourceUrl}
						/>
						<Button
							className="is-destructive"
							onClick={() => {
								const newSourceUrls = postMeta.source_urls;
								newSourceUrls.splice(index, 1);
								setPostMeta({ source_urls: newSourceUrls });
							}}
						>
							{__('Remove', 'codemancer-theme')}
						</Button>
					</PanelRow>
				))}
			<PanelRow>
				<Button
					className="is-secondary"
					onClick={() => {
						const newSourceUrls = postMeta.source_urls || [];
						newSourceUrls.push('');
						setPostMeta({ source_urls: newSourceUrls });
					}}
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
