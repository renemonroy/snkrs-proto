const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin')
const aws = require('./config/aws.json');
const pkg = require('./package.json');

const PATHS = {
  indexJS: path.join(__dirname, 'app/index.jsx'),
  indexHTML: path.join(__dirname, 'app/index.html'),
  build: path.join(__dirname, 'build'),
};

const config = {
  devTool: 'source-map',
  entry: {
    vendor: Object.keys(pkg.dependencies),
    app: PATHS.indexJS,
  },
  output: {
    path: PATHS.build,
    filename: '[name].bundle-[chunkhash].js',
    chunkFilename: '[chunkhash].js',
  },
  module: {
    loaders : [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
      {
        loader: ExtractTextPlugin.extract('stylus', 'css-loader!stylus-loader'),
        test: /\.styl$/,
        exclude: /node_modules/,
      },
      {
        loader: 'url-loader?limit=100000',
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      },
      {
        loader: 'file-loader?name=images/[name].[ext]',
        test: /\.(png|jpg)$/,
      },
    ],
  },
  resolve : {
    extensions : ['', '.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(PATHS.build, { root: process.cwd() }),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('app.bundle-[chunkhash].css', { allChunks: true }),
    new HtmlWebpackPlugin({ inject: true, template: PATHS.indexHTML }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, drop_console: true },
      output: { comments: false },
    }),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 20 }),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js", Infinity),
  ],
};

if (process.env.DEPLOY) {
  config.plugins.push(
    new S3Plugin({
      s3Options: {
        accessKeyId: aws.ACCESS_KEY_ID,
        secretAccessKey: aws.SECRET_ACCESS_KEY,
        region: aws.REGION,
      },
      s3UploadOptions: {
        Bucket: aws.BUCKET,
        CacheControl: 'public, max-age=300',
        ACL: 'public-read',
      },
      noCdnizer: true,
    })
  );
}

module.exports = config;