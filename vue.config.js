module.exports = {
  transpileDependencies: true,
  devServer: {
    port: 9527,
    open: true,
    // 阻止浏览器弹出错误
    client: {
      overlay: false
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/scss/main.scss";`
      }
    }
  },
}
