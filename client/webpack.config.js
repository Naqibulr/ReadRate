// @flow

/**
 * Configuration file for webpack.
 *
 * Webpack bundles several JavaScript files into a single file
 * for easier script embedding in an index.html file.
 */

const path = require('path');
var webpack = require('webpack');

process.env.IMAGES_CAROUSEL = './img/old.jpeg';

module.exports = {
  plugins: [
    //la inn plugins for å håndtere verdier i env filen
    new webpack.DefinePlugin({
      'process.env.IMAGES_CAROUSEL': JSON.stringify(process.env.IMAGES_CAROUSEL),
    }),
  ],

  entry: './src/index.tsx', // Initial file to bundle
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    // Output file: ./public/bundle.js
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  // Makes original source code available to the browser for easier identification of error causes.
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // Use babel to parse .tsx files in the src folder
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/',
            },
          },
        ],
      },
    ],
  },
};
