import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash'; // Used for cache busting, it append the file name with a new hash when the content of the file is changed
import ExtractTextPlugin from 'extract-text-webpack-plugin';


export default {
  debug: true,
  devtool: 'source-map', // It is little slower than inline-source-map but much beeter hence used in case of Production
  noInfo: false,
  entry: {
    main: path.resolve(__dirname, 'src/index'),   // This is used to bundle the main js file which is required during start of the applciation
    vendor: path.resolve(__dirname, 'src/vendor') // This is used to bundle all the libraries together in one js file
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'), // we will put the generated artifact in floder named dist for production
    publicPath: '/',
    filename: '[name].[chunkhash].js' // this name value is subsituted by webpack during the build process, it picksup the name value fromt he entry object defined above
                                      // chunkhash is varibale name used by webpack , hence we are appending it to the name of the file.
  },
  plugins: [
    //Plugin to Minify (Uglify)
    new webpack.optimize.UglifyJsPlugin(),

    //Eliminates duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    //Creates HTML file in dist folder which includes refrence to bundle.js
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),

    //plugin to support bundle splitting -- It will generate seperate chunk/bundle for vendor.js file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    //Plugin to generate hash
    new WebpackMd5Hash(),

    /*Webpack usually bundles the css with the JS file in bundle.js file ,
    hence to have a seperate css file we can make use of the pluging which extract the css and makes a new file */
    new ExtractTextPlugin('[name].[contenthash].css')
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}

// import webpack from 'webpack';
// import path from 'path';

// export default {
//   devtool: 'inline-source-map',
//   entry: [
//     path.resolve(__dirname, 'src/index')
//   ],
//   target: 'web',
//   output: {
//     path: path.resolve(__dirname, 'src'),
//     publicPath: '/',
//     filename: 'bundle.js'
//   },
//   plugins: [
//     new webpack.LoaderOptionsPlugin({
//         debug: true,
//         noInfo: false,
//       })
//   ],
//   module: {
//     rules: [
//       {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
//       {test: /\.css$/, loaders: ['style','css']}
//     ]
//   }
// }
