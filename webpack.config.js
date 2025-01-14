const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nunjucks = require('nunjucks');
const SvgSpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: './dist',
    port: 3001,
    open: true,
    hot: true,
    watchFiles: [
      'src/**/*',
      path.resolve(__dirname, 'src/templates'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(njk|nunjucks|html)$/i,
        use: [
          'html-loader', // Обработка HTML
          {
            loader: 'nunjucks-loader', // Обработка Nunjucks
            options: {
              watch: true,
              searchPaths: [path.resolve(__dirname, 'src/templates')],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: path.resolve(__dirname, 'src/images/icons'),
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src/images/icons'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'sprite.svg',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.njk',
      filename: 'index.html',
      templateContent: ({ htmlWebpackPlugin }) => {
        const env = nunjucks.configure(path.resolve(__dirname, 'src/templates'), {
          autoescape: true,
          watch: true,
        });
        
        return nunjucks.render('index.njk', env);
      },
      cache: false,
    }),
    new SvgSpriteLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/images', to: 'images' },
      ],
    }),
  ],
};