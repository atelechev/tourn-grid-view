const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fileNameBase = 'tourn-grid-view';

module.exports = {
  entry: {
    main: './src/index.tsx',
    vendor: ['react', 'react-dom', 'react-is', 'rxjs', 'd3', 'jss', 'popper.js']
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: `${fileNameBase}.min.js`,
    chunkFilename: `${fileNameBase}-[name].min.js`,
    library: 'TournamentGrid'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  performance: {
    maxAssetSize: 800000,
    maxEntrypointSize: 800000
  }
};
