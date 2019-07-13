const path = require('path')
const webpack = require('webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const getDateTimes = (function () {
  var date = new Date();
  var Y = date.getFullYear() + '';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + '';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  return Y + M + D + h + m;
})();

// cdn开关
const OPENCDN = false
const assetsPath = 'static'
const resolve = dir => path.join(__dirname, dir)
// posix兼容方式处理路径
const posixJoin = _path => path.posix.join(assetsPath, _path)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
module.exports = {
  // 项目部署的基础路径, 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里, 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/`
  publicPath: '/',
  // 将构建好的文件输出到哪里
  outputDir: 'dist',
  //指定生成的index.html的输出路径，相对于outputDir。也可以是一个绝对路径。
  indexPath : 'index.html',
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: assetsPath,
  //是否在保存的时候检查
  lintOnSave: true,
  // 生产环境是否生成 SourceMap
  productionSourceMap: false,
  //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require('os').cpus().length > 1,
  // 配置 webpack-dev-server 行为。
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8989,
    https: false,
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    proxy: {
      '/apis': {
        //目标代理服务器地址
        target: 'http://172.18.66.71:8082',
        pathRewrite: {
          // 重写接口，去掉/api
          '^/apis': '/'
        },
        // 是否启用websocket
        ws: true,
        //是否允许跨域
        changeOrigin: true
      }
    },
    before: app => {}
  },
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  configureWebpack: (config) => {
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    config.resolve.extensions = ['.js', '.json', '.vue', '.css', '.scss'];
    if (IS_PROD) {
      // 为生产环境修改配置...
      //防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
      // 开启cdn状态：externals不进入webpack打包
      if (OPENCDN) {
        config.externals = {
          'vue': 'Vue',
          'vue-router': 'VueRouter',
          'vuex': 'Vuex',
          'axios': 'axios'
        }
      }
      config.plugins.push(
        //生产环境自动删除console
       /* new UglifyJsPlugin({
          sourceMap: false,
          parallel: true,
        })*/
      );
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
    // 添加别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@static', resolve('src/static'))
      .set('@img', resolve('src/static/images'))
      .set('@js', resolve('src/static/js'))
      .set('@views', resolve('src/views'));

    // 删除预加载
    config.plugins.delete('preload').delete('prefetch');

    // 添加CDN参数到htmlWebpackPlugin配置中， 修改 public/index.html
    config.plugin('html').tap(args => {
      // 生产环境将cdn写入webpackHtmlOptions，在public/index.html应用
      args[0].envs = IS_PROD
      return args
    })

    // 生产环境配置
    if (IS_PROD) {
      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
      })
      config.when(IS_PROD, config =>
        // 生产环境js增加版本号
        config.output
        .set('filename', posixJoin(`js/[name].${getDateTimes}.js`))
        .set('chunkFilename', posixJoin(`js/[name].${getDateTimes}.js`))
      )


    }
    // 修改图片输出路径
    config.module.rule("images")
    .test(/\.(png|jpe?g|gif|ico)(\?.*)?$/)
    .use("url-loader").loader("url-loader")
    .options({
      limit: 10,
      // 以下配置项用于配置file-loader,将图片打包到dist/img文件夹下, 不配置则打包到dist文件夹下
      outputPath: assetsPath,
      // 配置打包后图片文件名
      name: 'images/[name].[ext]',
    }).end();
  },
  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: {
      filename: posixJoin('css/[name].' + getDateTimes + '.css'),
      chunkFilename: posixJoin('css/[name].' + getDateTimes + '.css')
    },
    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      //sass: {
      // 向全局sass样式传入共享的全局变量
      // data: `@import "~assets/scss/variables.scss";$src: "${process.env.VUE_APP_SRC}";`
      //data: `$src: "${process.env.VUE_APP_SRC}";`
      //}
      // px转换为rem
      // postcss: {
      // plugins: [
      // require('postcss-pxtorem')({
      // rootValue : 1, // 换算的基数
      // selectorBlackList : ['weui', 'el'], // 忽略转换正则匹配项
      // propList : ['*']
      // })
      // ]
      // }
    },

    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false
  },
  // 第三方插件的选项
  pluginOptions: {

  }
}
