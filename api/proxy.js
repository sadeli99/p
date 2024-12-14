// api/proxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const { url } = req.query;  // Mengambil URL dari query parameter 'url'
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' }); // Jika parameter 'url' tidak ada
  }

  // Membuat proxy untuk meneruskan permintaan ke URL yang diberikan
  const proxy = createProxyMiddleware({
    target: url,  // Target URL yang diberikan dalam query parameter
    changeOrigin: true,
    secure: false,
    headers: {
      'X-Forwarded-For': req.headers['x-forwarded-for'], // Menambahkan header jika diperlukan
    },
  });

  proxy(req, res); // Menjalankan proxy
};
