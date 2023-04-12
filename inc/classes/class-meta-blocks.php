<?php
/**
 * Register post meta blocks.
 * 
 * @package codemancer-theme
 */

namespace Codemancer_Theme;

use Codemancer_Theme\Traits\Singleton;

/**
 * Class Meta_Blocks
 * 
 * @since 1.0.0
 */
class Meta_Blocks {

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
		add_action( 'init', [ $this, 'register_meta_blocks' ] );
	}

	/**
	 * Register post meta blocks.
	 * 
	 * @since 1.0.0
	 * 
	 * @action init
	 */
	public function register_meta_blocks() {
		
		// Check if the register function exists.
		if ( ! function_exists( 'register_post_meta' ) ) {
			return;
		}

		// Register meta blocks.
		register_post_meta(
			'post',
			'is_featured',
			[
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'boolean',
				'default'      => false,
			]
		);

		register_post_meta(
			'post',
			'source_urls',
			[
				'show_in_rest' => [
					'schema' => [
						'type'  => 'array',
						'items' => [
							'type' => 'string',
						],
					],
				],
				'single'       => true,
				'type'         => 'array',
				'default'      => [],
				'items'        => [
					'type' => 'string',
				],
			]
		);
	}

}
