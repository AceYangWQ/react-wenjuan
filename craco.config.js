module.exports = {
  webpack: {
    configure(webpackConfig) {
      if (webpackConfig.mode === 'production') {
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/,
              priority: 100,
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99,
            },
            recharts: {
              name: 'recharts-chunk',
              test: /recharts/,
              priority: 98,
            },
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 97,
            },
          },
        }
      }
      return webpackConfig
    },
  },
  devServer: {
    port: 8000,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
}
