<div align="center">

# 📖 Dear Diary 📖

*A cozy digital journal with mood picker, built with HTML, CSS & JavaScript*

![HTML5](https://img.shields.io/badge/HTML5-FFB6C1?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-C8A2C8?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-B5EAD7?style=for-the-badge&logo=javascript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-FFDAC1?style=for-the-badge)

[✨ Live Demo](https://username.github.io/dear-diary) · [🐛 Report Bug](https://github.com/username/dear-diary/issues) · [💡 Request Feature](https://github.com/username/dear-diary/issues)

</div>

---

## 📸 Preview

> Ganti gambar di bawah dengan screenshot aplikasimu ya!

![Preview](./assets/preview.png)

---

## 💖 Tentang Proyek

**Dear Diary** adalah jurnal harian online yang simpel dan aesthetic. Kamu bisa menulis cerita hari ini, memilih mood dengan emoji, lalu melihat kembali semua entri kapan saja. Semua data tersimpan di browser (localStorage), jadi tidak perlu login dan privasimu tetap aman.

---

## ✨ Fitur

- ✍️ **Tulis entri harian** lengkap dengan judul, isi, dan tanggal otomatis
- 😊 **Mood picker** dengan emoji (senang, sedih, capek, excited, dan lainnya)
- 🗂️ **Daftar entri** yang tersusun dari yang terbaru
- 🔍 **Pencarian** berdasarkan kata kunci atau mood
- ✏️ **Edit dan hapus** entri kapan saja
- 💾 **Tersimpan otomatis** di browser dengan localStorage
- 🌙 **Dark / light mode**
- 📱 **Responsif** di HP dan desktop

---

## 🛠️ Teknologi

| Teknologi | Kegunaan |
|---|---|
| HTML5 | Struktur halaman |
| CSS3 | Styling dan animasi |
| JavaScript | Logika CRUD, pencarian, dan localStorage |
| Google Fonts | Tipografi (Quicksand & Caveat) |

---

## 📁 Struktur Folder

```
dear-diary/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── preview.png
└── README.md
```

---

## 🚀 Cara Menjalankan

```bash
# Clone repository
git clone https://github.com/username/dear-diary.git

# Masuk ke folder proyek
cd dear-diary
```

Lalu buka `index.html` di browser, atau pakai ekstensi **Live Server** di VS Code.

---

## 🎨 Kustomisasi

### Tambah pilihan mood

Edit daftar mood di `js/script.js`:

```js
const moods = [
  { emoji: "😊", label: "Senang" },
  { emoji: "😢", label: "Sedih" },
  { emoji: "😴", label: "Capek" },
  { emoji: "🥰", label: "Jatuh Cinta" }
];
```

### Ganti warna tema

Edit variabel di `css/style.css`:

```css
:root {
  --pink: #ffd6e0;
  --lavender: #e6d9f5;
  --cream: #fff9f0;
  --text: #4a3f4f;
}
```

---

## 🌍 Deploy ke GitHub Pages

1. Push proyek ke GitHub
2. Buka **Settings → Pages**
3. Pilih branch `main` dan folder `/ (root)`
4. Klik **Save** dan tunggu beberapa menit
5. Aplikasi aktif di `https://username.github.io/dear-diary` 🎉

---

## 🗺️ Roadmap

- [x] Tambah, edit, hapus entri
- [x] Mood picker
- [x] Pencarian entri
- [ ] Export jurnal ke PDF
- [ ] Proteksi PIN
- [ ] Kalender mood bulanan
- [ ] Upload foto di entri

---

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch baru (`git checkout -b fitur-baru`)
3. Commit perubahanmu (`git commit -m "Tambah fitur baru"`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buka Pull Request

---

## 📄 Lisensi

Didistribusikan di bawah lisensi **MIT**.

---

## 💌 Kontak

**Nama Kamu**

[![Instagram](https://img.shields.io/badge/Instagram-FFB6C1?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/username)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-C8A2C8?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/username)
[![Email](https://img.shields.io/badge/Email-FFDAC1?style=for-the-badge&logo=gmail&logoColor=white)](mailto:email@example.com)

---

<div align="center">

Dibuat dengan 💗 oleh **Nama Kamu**

⭐ Kasih bintang kalau kamu suka proyek ini ya!

</div>
