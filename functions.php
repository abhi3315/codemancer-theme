<?php
/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package codemancer-theme
 * @since 1.0.0
 */

if ( ! defined( 'CODEMANCER_THEME_VERSION' ) ) {
	define( 'CODEMANCER_THEME_VERSION', wp_get_theme()->get( 'Version' ) );
}

if ( ! defined( 'CODEMANCER_THEME_TEMP_DIR' ) ) {
	define( 'CODEMANCER_THEME_TEMP_DIR', untrailingslashit( get_template_directory() ) );
}

if ( ! defined( 'CODEMANCER_THEME_BUILD_URI' ) ) {
	define( 'CODEMANCER_THEME_BUILD_URI', untrailingslashit( get_template_directory_uri() ) . '/build' );
}

if ( ! defined( 'CODEMANCER_THEME_BUILD_DIR' ) ) {
	define( 'CODEMANCER_THEME_BUILD_DIR', untrailingslashit( get_template_directory() ) . '/build' );
}

/**
 * Load the autoloader.
 */
require_once CODEMANCER_THEME_TEMP_DIR . '/vendor/autoload.php';

/**
 * Load the theme.
 */
Codemancer_Theme\Codemancer_Theme::get_instance();
