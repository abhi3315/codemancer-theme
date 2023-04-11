<?php
/**
 * Register blocks.
 * 
 * @package codemancer-theme
 */

namespace Codemancer_Theme;

use Codemancer_Theme\Traits\Singleton;

/**
 * Class Blocks
 * 
 * @since 1.0.0
 */
class Blocks {

	use Singleton;

	/**
	 * Constructor.
	 */
	protected function __construct() {
		// Setup hooks.
		$this->setup_hooks();
	}

	/**
	 * Setup hooks.
	 * 
	 * @since 1.0.0
	 */
	public function setup_hooks() {
		add_action( 'init', [ $this, 'register_blocks' ] );
	}

	/**
	 * Register blocks.
	 * 
	 * @since 1.0.0
	 * 
	 * @action init
	 */
	public function register_blocks() {

		// Check if the register function exists.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		// Register accordion block.
		register_block_type(
			CODEMANCER_THEME_BUILD_DIR . '/blocks/accordion/'
		);
	}

}
