const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/')
    }

  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.css$/i,
      use: [
        { loader: MiniCssExtractPlugin.loader },
        {
          loader: 'css-loader',
          options: {
            esModule: false
          }
        }
      ]
    },
    {
      test: /\.(png|jpg)/,
      type: 'asset/resource'
    },
    {
      test: /\.(woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: false,
          mimetype: 'application/font-woff',
          name: '[name].[contenthash].[ext]',
          outputPath: './assets/fonts/',
          publicPath: '../assets/fonts/',
          esModule: false
        }
      }
    },
    {
      test: /\.html$/i,
      loader: 'html-loader'
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    })

  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3000
  }

}
