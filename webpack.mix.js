const mix = require('laravel-mix')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
const config = {
    resolve: {
        alias: {
            '@js': path.resolve(__dirname, './resources/assets/js'),
            '@css': path.resolve(__dirname, './resources/assets/sass')
        }
    }
}
if (mix.inProduction()) {
    mix.version()
    config.plugins = [new BundleAnalyzerPlugin()]
} else {
    mix.sourceMaps()
}
mix.webpackConfig(config)
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .react('resources/assets/js/app.js', 'public/js')
    .react('resources/assets/js/views/Home/index.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .extract(['react', 'react-dom'])
