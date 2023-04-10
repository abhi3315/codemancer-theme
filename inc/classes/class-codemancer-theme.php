<?php
/**
 * Theme bootstrap file.
 *
 * @package codemancer-theme
 */

namespace Codemancer_Theme;

use Codemancer_Theme\Traits\Singleton;
use Codemancer_Theme\Assets;

/**
 * Class Codemancer_Theme
 *
 * @since 1.0.0
 */
class Codemancer_Theme {

	use Singleton;

	/**
	 * Constructor.
	 */
	protected function __construct() {
		// Instantiate classes.
		Assets::get_instance();

		// Setup hooks.
		$this->setup_hooks();
	}

	/**
	 * Setup hooks.
	 *
	 * @since 1.0.0
	 */
	public function setup_hooks() {
		add_action( 'after_setup_theme', [ $this, 'codemancer_theme_support' ] );
	}

	/**
	 * Add required theme support.
	 *
	 * @since 1.0.0
	 */
	public function codemancer_theme_support() {
		// Add support for core block styles.
		add_theme_support( 'wp-block-styles' );
	}
}
