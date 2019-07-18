import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  debug: true,
  devtool: 'inline-source-map', // this line is used in order to use sourcemap which is used to debug
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
        //Creates HTML file in dist folder which includes refrence to bundle.js
        new HtmlWebpackPlugin({
          template: 'src/index.html',
          inject: true
        })
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
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
