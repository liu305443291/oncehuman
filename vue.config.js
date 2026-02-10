const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9527,
    open: true,
    // 阻止浏览器弹出错误
    client: {
      overlay: false
    }
  },
})
