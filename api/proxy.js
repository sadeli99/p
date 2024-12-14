// api/proxy.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Menyusun middleware proxy
app.use('/proxy', createProxyMiddleware({
  target: 'https://jeniusplay.com',  // Ganti dengan URL target yang sesuai
  changeOrigin: true,  // Menyesuaikan header origin agar sesuai dengan target
  pathRewrite: {
    '^/proxy': '',  // Menghapus '/proxy' dari URL yang diminta
  },
}));

// Ekspor aplikasi untuk digunakan oleh Vercel
module.exports = (req, res) => {
  app(req, res);  // Menjalankan Express app untuk permintaan
};
