// Fungsi untuk membuat stiker jatuh
function createSticker() {
    // Membuat elemen gambar baru
    const sticker = document.createElement('img');
    
    // Menggunakan foto kucing yang kamu kirim sebagai stiker
    sticker.src = 'images_transfer_2026-08-09_204738.jpg'; 
    sticker.classList.add('sticker');
    
    // Mengatur ukuran stiker secara acak (antara 50px sampai 90px)
    const size = Math.random() * 40 + 50;
    sticker.style.width = size + 'px';
    sticker.style.height = size + 'px';
    
    // Membuat stiker menjadi bentuk bulat agar lebih lucu seperti stiker asli
    sticker.style.objectFit = 'cover';
    sticker.style.borderRadius = '50%'; 
    sticker.style.border = '2px solid #ff69b4';
    
    // Mengatur posisi horizontal acak dari ujung kiri ke kanan layar
    sticker.style.left = Math.random() * 100 + 'vw';
    
    // Mengatur kecepatan jatuh secara acak (antara 5 sampai 10 detik)
    sticker.style.animationDuration = Math.random() * 5 + 5 + 's';
    
    // Memasukkan stiker ke dalam website
    document.getElementById('stickers-container').appendChild(sticker);
    
    // Menghapus stiker setelah 10 detik agar HP/Laptop tidak lag karena kebanyakan gambar
    setTimeout(() => {
        sticker.remove();
    }, 10000);
}

// Bikin stiker baru muncul setiap 600 milidetik (0.6 detik)
setInterval(createSticker, 600);