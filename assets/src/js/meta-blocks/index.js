/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import PostMetaBlock from './post-meta-block';

registerPlugin('codemancer-meta-blocks', {
	render() {
		return <PostMetaBlock />;
	},
});
