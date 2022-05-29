const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      "/myblog": {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/myblog': ''
        }
      }
    }

  }
})