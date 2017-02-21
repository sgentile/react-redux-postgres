const webpack = require('webpack');
const path = require('path');

// Webpack extensions
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const validate = require('webpack-validator');

// For production builds, additional steps are necessary.
const TARGET = process.env.npm_lifecycle_event;
const PRODUCTION = process.env.NODE_ENV === 'production';

console.log(PRODUCTION);


const ASSETS_LIMIT = 8192; // Threshold for generating inline base64 URLs
const COPYRIGHT_NOTICE = 'Copyright ' + new Date().getFullYear() + ' YOUR COMPANY NAME HERE. ALL RIGHTS RESERVED.';

// Define the source and destinations folders used for bundling.
const PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'server/public')
};

const INDEX_TEMPLATE = path.join(PATHS.src, 'index.html');

const config = {
    debug: !PRODUCTION,
    devtool: PRODUCTION ? 'source-map' : 'eval-source-map',

    entry: {
        app: PATHS.src
    },

    output: {
        path: PATHS.build,
        filename: '[name]-[hash:5].js'
    },

    plugins: [

        // Generate the index.html page from a template
        new HtmlWebpackPlugin({
            template: INDEX_TEMPLATE,
            favicon: PATHS.src + '/favicon.ico'
        })

        // , new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //        "window.jQuery": "jquery",
        //     "window.$": "jquery"
        // })

    ],

    module: {

        preLoaders: [
            // Perform linting prior to compilation.
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ],

        loaders: [

            // ES6 Javascript transpiling
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },


            // Less to CSS transpiling
            {
                test: /\.less$/,
                include: PATHS.src,
                loader: PRODUCTION ?
                    ExtractTextPlugin.extract('style', 'css!postcss!less')
                    : 'style!css!postcss!less'
            },


            // Raw CSS
            {
                test: /\.css$/,
                include: PATHS.src,
                loader: PRODUCTION ?
                    ExtractTextPlugin.extract('style', 'css!postcss')
                    : 'style!css!postcss'
            },



            // Inline base64 URLs for <=ASSETS_LIMIT images, direct URLs for the rest
            // note: sgentile - I had to change this for the svg to work properly (ie. with fontawesome svgs)
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=' + ASSETS_LIMIT + '&mimetype=application/font-woff'
            },


            {
                test: /\.(png|jpg|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=[path][name].[hash:5].[ext]'
            },


            //this resolves where jquery.flot.resize references 'window' - in this context it should be 'this.window'
            // {
            //     test: require.resolve("jquery-flot/jquery.flot.resize"),
            //     loader: "imports?this=>window"
            // },

            //used by the tests
            { test: /\.json$/, loader: 'json' }

        ]

    },

    postcss: [
        // Handle cross-browser CSS prefixing
        require('autoprefixer-core')
    ],

    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js']
    }
};

if (PRODUCTION) {

    // Add clean for 'build' directory.
    // Development is served from memory and no clean-up needed.
    config.plugins.unshift(
        new CleanWebpackPlugin(
            ['build'],{
                verbose: true,
                dry: false, // If true, reports intentions but won't delete.
                root: __dirname
            })
    );


    // For production builds, extract CSS into seperate file to
    // avoid flash of unstyled content (FOUC).  Use normal
    // javascript loader in development to facilitate hot loading.
    // Switch between environments is handled by disable flag.
    config.plugins.push(
        new ExtractTextPlugin(
            '[name]-[hash:5].css',
            { allChunks: true }
        )
    ),


        // Add copyright to files.
        config.plugins.push(
            new webpack.BannerPlugin(COPYRIGHT_NOTICE)
        );

    // Optimize order of imported modules.
    config.plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin()
    );


    // Optimization (reference: https://reactjsnews.com/how-to-make-your-react-apps-10x-faster)
    config.plugins.push(
        // A common mistake is not stringifying the "production" string.
        new webpack.DefinePlugin(
            {
                'process.env.NODE_ENV': JSON.stringify('production'),
                '__DEV__': JSON.stringify(false),
                __VERSION__: JSON.stringify(require('./package.json').version)
            })
    );



    // Dedupe code
    config.plugins.push(
        new webpack.optimize.DedupePlugin()
    );

    // Minify javascript
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // TODO: Not sure if this is a good idea. ReactJS has warnings
                // but this setting may mask dead-code issues in app code.
                warnings: false // turns off warnings when dead-code removed
            }
        })
    );
}

else { /* DEVELOPMENT */

    // Enable multi-pass compilation for enhanced performance
    // in larger projects. Good default.
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        })
    );

    // Hide spurious errors caused during hot reloading.
    config.plugins.push(
        new webpack.NoErrorsPlugin()
    );

    config.plugins.push(
        // A common mistake is not stringifying the "production" string.
        new webpack.DefinePlugin(
            {
                '__DEV__': JSON.stringify(true),
                __VERSION__: JSON.stringify(require('./package.json').version)
            })
    );

    config.devtool = 'inline-source-map';
    config.devServer = {

        // Root folder to server static content.  If you copy
        // your static content to the build folder, point it there instead.
        //contentBase: PATHS.build,
        contentBase: path.join(PATHS.src, 'assets'),

        // Enable history API fallback so HTML5 History API based
        // routing works.
        historyApiFallback: true,

        // Unlike the cli flag, this doesn't set HotModuleReplacementPlugin
        hot: true,
        inline: true,
        port: 8080,
        proxy: {
            '/api' : {
                target: 'http://localhost:8000',
                secure: false
            }
        },

        // Display only errors to reduce the amount of output.
        stats: 'errors-only'
    };

}


// Always validate webpack configuration.
module.exports = validate(config);

