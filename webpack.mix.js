const mix = require('laravel-mix')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin

if (mix.inProduction()) {
    mix.version()
} else {
    mix.sourceMaps().webpackConfig({
        plugins: [new BundleAnalyzerPlugin()]
    })
}
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
    .react('resources/assets/js/views/home.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .browserSync('influencer.test')
    .extract(['react', 'react-dom'])
