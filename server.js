const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Memastikan server dapat diakses di Android/Termux
const BASE_URL = 'https://am.rafaelxd.my.id';
const TIMEOUT = 60000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Explicit Route jika static folder mengalami masalah path di Termux
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API 1: Kirim Link ke Email
app.post('/api/send', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, error: 'Email wajib diisi!' });
    }

    try {
        const response = await axios.post(`${BASE_URL}/api/send`, { email }, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            timeout: TIMEOUT
        });

        return res.json({
            success: true,
            message: response.data?.message || 'Link verifikasi berhasil dikirim ke email!',
            data: response.data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.response?.data?.message || error.message || 'Gagal terhubung ke API tujuan'
        });
    }
});

// API 2: Verifikasi Link dari Email
app.post('/api/verify', async (req, res) => {
    const { email, rawLink } = req.body;
    if (!email || !rawLink) {
        return res.status(400).json({ success: false, error: 'Email dan Link Verifikasi wajib diisi!' });
    }

    try {
        const response = await axios.post(`${BASE_URL}/api/verify`, { email, rawLink }, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            timeout: TIMEOUT
        });

        return res.json({
            success: true,
            message: response.data?.message || 'Akun Alight Motion berhasil dipremiumkan!',
            oobCode: response.data?.oobCode || null,
            idToken: response.data?.idToken || null,
            userProfile: response.data?.userProfile || null,
            premium: true,
            duration: '1 Tahun'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.response?.data?.message || error.message || 'Gagal memproses verifikasi'
        });
    }
});

app.listen(PORT, HOST, () => {
    console.log(`===========================================`);
    console.log(`🚀 Server Berhasil Berjalan!`);
    console.log(`🌐 Buka di browser HP kamu:`);
    console.log(`👉 http://localhost:${PORT}`);
    console.log(`👉 http://127.0.0.1:${PORT}`);
    console.log(`===========================================`);
});
