const _ = require('lodash');
const { join, resolve } = require('path');

const modulePaths = {
  api: './src/api',
  components: './src/components',
  containers: './src/containers',
  routes: './src/routes',
  config: './src/config',
  helper: './src/helper',
  action: '/src/redux/action',
  reducer: './src/redux/reducer',
  store: './src/redux/store',
  type: './src/redux/type',
  service: './src/service',
  event: './src/event',
  listener: './src/listener',
  styles: './src/styles',
};

const config = {
  context: resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      ..._.mapValues(modulePaths, str => join(process.cwd(), ...str.split('/'))),
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};

module.exports = config;
