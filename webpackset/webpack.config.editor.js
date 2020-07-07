const fs = require('fs');
const { resolve, theme, packSpecifiedPlugins, rootPath } = require('./config');
// webpack 配置文档
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

let plugins = packSpecifiedPlugins ? packSpecifiedPlugins : fs.readdirSync(rootPath('./plugins'));
const pluginConf = {
  mode: 'production',
  // mode: 'development',
  entry: {},
  output: {
    publicPath: '/',
    path: resolve('../dist-plugins'),
    filename: `plugins/[name]/index.js`,
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    'h5ds-ui': {
      root: 'H5dsUI',
      commonjs2: 'h5ds-ui',
      commonjs: 'h5ds-ui',
      amd: 'h5ds-ui'
    },
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    mobx: 'mobx',
    'mobx-react': {
      root: 'MobxReact',
      commonjs2: 'mobx-react',
      commonjs: 'mobx-react',
      amd: 'mobx-react'
    },
    PubSub: 'PubSub',
    lodash: '_',
    antd: 'antd',
    moment: 'moment'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.esm', '.css', '.less'],
    alias: {}
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            warnings: false, // 去除warning警告
            pure_funcs: ['console.log'] // 配置发布时，不被打包的函数
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'common/editor',
          priority: 10, // 优先级
          test: /react|mobx|antd|moment/,
          chunks: 'initial',
          minSize: 0, // 默认小于30kb不会打包
          minChunks: 9999999999999 // 引用1次就要打包出来， 只需要单独打包react，mobx，antd
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve('../plugins'), resolve('../src')],
        use: ['babel-loader']
      },
      {
        test: /\.(css|less)$/,
        include: [resolve('../node_modules'), resolve('../plugins'), resolve('../src')],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          `less-loader?{javascriptEnabled: true, modifyVars: ${JSON.stringify(theme)}}`
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `plugins/[name]/style.css`
    }),
    new CaseSensitivePathsPlugin()
  ]
};

plugins.forEach(name => {
  console.log('build:editor', name);
  pluginConf.entry[`${name}/editor`] = rootPath(`./plugins/${name}/index.js`);
});

module.exports = webpackMerge(baseConfig, pluginConf);
