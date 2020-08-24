const { webpackConfig, webpackMerge, htmlOverlay } = require('just-scripts');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = webpackMerge(
  webpackConfig,
  htmlOverlay({
    template: 'public/index.html'
  }),
  {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|jdx)$/i,
          use: ['file-loader'],
        },
      ],
    },
    // Here you can custom webpack configurations
  },
);
