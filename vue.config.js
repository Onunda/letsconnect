module.exports = {
   lintOnSave: false,
   devServer: {
    proxy: {
      '/api': {
        target: 'https://private-517bb-wad20postit.apiary-mock.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}

