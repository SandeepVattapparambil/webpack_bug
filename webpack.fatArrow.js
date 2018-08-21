/**
 * Webpack config file for WrapSplash
 * Sandeep Vattapparambil
 */
//Constants
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

//Webpack config object
module.exports = (env) => {
    return {
        //set webpack build mode
        mode: env && env.production === true ? 'production' : 'development',
        //Node polyfills
        node: {
            process: true
        },
        //set minification flag
        optimization: {
            minimize: env && env.production === true ? true : false
        },
        //set webpack bundle entry point
        entry: path.resolve(__dirname, 'src/fat_arrow.js'),
        //set webpack bundle output
        output: {
            //set output target for UMD
            library: 'webpack_bug',
            libraryTarget: 'umd',
            path: path.resolve(__dirname, 'fat_arrow_build'),
            filename: env && env.production === true ? 'fat_arrow.min.js' : 'fat_arrow.js',
            umdNamedDefine: true,
            globalObject: 'typeof self !== \'undefined\' ? self : this'
        },
        //set up babel transpiler
        module: {
            rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }]
        },
        //set console logs in color
        stats: {
            colors: true
        },
        //include source-map in builds
        devtool: 'cheap-source-map'
    }
};