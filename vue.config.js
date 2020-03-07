module.exports = {
  devServer: {
    proxy: {
      '/listapi': {
        target:'http://api.tianapi.com/txapi/ncov/index',
        changeOrigin: true,
        pathRewrite: { '^/listapi':'' }
      },
      '/api': {
        target:'https://lab.isaaclin.cn/',
        changeOrigin: true,
        pathRewrite: { '^/api':'' }
      },
    }
  },
}