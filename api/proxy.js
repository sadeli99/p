// api/proxy.js
export default async function handler(req, res) {
  const { url } = req.query;  // Ambil parameter 'url' dari query string

  // Jika parameter 'url' tidak ada, kirimkan respons error
  if (!url) {
    return res.status(400).json({ error: 'Parameter "url" diperlukan' });
  }

  try {
    // Lakukan permintaan ke URL yang diberikan
    const response = await fetch(url);

    // Jika respons berhasil, kirimkan data ke client
    if (response.ok) {
      const data = await response.text();  // Ambil respons dalam bentuk teks (misalnya file m3u8)
      
      // Set header CORS agar API dapat diakses dari domain lain
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      // Kirimkan data yang diterima dari URL yang diminta ke client
      res.status(200).send(data);
    } else {
      // Jika gagal mendapatkan data dari URL, kirimkan status error
      res.status(response.status).json({ error: 'Gagal mengambil data dari URL yang diberikan' });
    }
  } catch (error) {
    // Tangani kesalahan jika terjadi masalah jaringan atau lainnya
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
  }
}
