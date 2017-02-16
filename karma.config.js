/* SWITCHED TO JEST BUT LEAVING THIS FOR REFERENCE */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

const webpackconfig = require('./webpack.config.js');

module.exports = (config) => {
    config.set({
        browsers: ['PhantomJS, Chrome'], //run in Chrome
        singleRun: false, //run once by default
        frameworks: ['mocha', 'es6-shim'], //use the mocha framework - es6-shim required for phantomJS
        files: [
            'tests.webpack.js'  //just load this file
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap'] //preprocess with webpack and our sourcemap loader
        },
        reporters: ['dots', 'junit'], //report results in this format - current options... 'junit'  'dots'
        junitReporter: {
            outputDir: './reportingOutput'
        },
        webpack: { //kind of a copy of your webpack config - just with what we need for testing
            resolve: {
                modulesDirectories: ['node_modules', 'src'],
                extensions: ['', '.js']
            },
            node: { fs: "empty" },
            devtool: 'inline-source-map',
            module: webpackconfig.module,
            plugins: [
                new webpack.ProvidePlugin({
                    "React": "react"
                }),
                new ExtractTextPlugin('/[name].css', {disabled: true}),
                new webpack.DefinePlugin({__VERSION__: JSON.stringify(webpackconfig.module.VERSION)})
            ]
        },
        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        }
    })
};
