const { createFalse } = require("typescript");

module.exports = {
  publicPath: "/iLab",
  configureWebpack:{
    devtool: 'source-map',
  },
  devServer: {
    host: 'localhost',
    port: '8080',
    proxy: {
      '/api': {
         target: 'http://10.3.2.84/iLab', // 代理接口地址
         secure: false,  // 如果是https接口，需要配置这个参数
         changeOrigin: true, // 是否跨域
         pathRewrite: {
           '^/api': ''   //需要rewrite的, 这里理解成以'/api'开头的接口地址，把/api代替target中的地址
        }
      }
    }
  }
};