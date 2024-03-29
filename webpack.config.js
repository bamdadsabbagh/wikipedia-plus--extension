const CopyPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

// eslint-disable-next-line no-console
console.log('Production mode is: ', isProduction);

module.exports = {
  watch: !isProduction,
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'eval-source-map',
  entry: {
    'scripts/content': './src/scripts/content.ts',
    'scripts/background': './src/scripts/background.ts',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    publicPath: '',
  },
  node: false,
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './src/manifest.json',
          to: 'manifest.json',
        },
        {
          from: './src/assets',
          to: 'assets',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
