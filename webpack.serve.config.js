const { webpackMerge, htmlOverlay, webpackServeConfig } = require('just-scripts');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = webpackMerge(
  webpackServeConfig,
  htmlOverlay({
    template: 'public/index.html'
  }),
  {
    // Here you can custom webpack configurations
    output: {
      publicPath: '/'
    },
    devServer: {
      host: "0.0.0.0",
      port: 8080,
      publicPath: '/'
    },
    plugins: [
      new CopyPlugin([
        { from: 'public/static', to: 'static' }
      ])
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|jdx)$/i,
          use: ['file-loader'],
        }
      ],
    },
    
  }
);
