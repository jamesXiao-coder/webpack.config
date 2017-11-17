const { resolve } = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ""


module.exports = (option = {}) => ({
  entry: {
    index: resolve(__dirname, './src/main.js'), //入口文件
    vendor: resolve(__dirname, './src/vendor') // 打包公共库
  },
  output: {
    path: resolve(__dirname, 'dist'), //打包输出的文件路径
    filename: option.dev ? '[name].js' : '[name].js?[chunkhash]', //打包输出的文件名
    chunkFilename: '[id].js?[chunkhash]', //异步加载时的文件名
    publicPath: option.dev ? '/assets/' : publicPath, // 公共文件防止的额地方
    libraryTarget: 'umd', // 打包使用的规范
    library: 'MyLibrary',
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }, "postcss-loader"]
        })
      },
      {
        test: /.\less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          },
            "postcss-loader"
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  devServer: {
    host: '127.0.0.1',
    port: 8010,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8080',
        changeOringin: true,
        pahtRewrite: {
          '^/api': ''
        }
      },
      historyApiFallback: {
        index: url.parse(option.dev ? '/assets/' : publicPath).pathname
      }
    }
  }
  ,
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    // 打包公共库需要的配置
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor', 'manifest']
    // })
  ],
  devtool: option.dev ? '#eval-source-map' : '#source-map'
})