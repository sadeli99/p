// api/proxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    target: 'https://jeniusplay.com', // URL server tujuan
    changeOrigin: true,
    pathRewrite: {
      '^/api/proxy': '', // Menghapus '/api/proxy' dari URL yang diminta
    },
  });
  return proxy(req, res);
};
