# BukuKita – Aplikasi Pemesanan Buku Berbasis Web

## 1. Deskripsi Project

BukuKita merupakan aplikasi pemesanan buku berbasis web yang dikembangkan untuk memenuhi tugas Ujian Tengah Semester (UTS) mata kuliah Pemrograman Web.

Aplikasi ini dirancang untuk memudahkan pengguna dalam mencari informasi buku, melihat ketersediaan stok, memilih buku, melakukan pemesanan, serta memantau status pengiriman.

BukuKita juga menyediakan halaman administrator yang digunakan untuk mengelola katalog buku dan memantau pesanan pengguna.

## 2. Latar Belakang

Perkembangan teknologi informasi memberikan kemudahan dalam berbagai aktivitas, termasuk proses pencarian dan pemesanan buku.

Pemesanan buku secara manual terkadang membutuhkan waktu lebih lama karena pengguna harus mencari informasi buku dan melakukan pemesanan secara langsung.

Oleh karena itu, BukuKita dikembangkan sebagai aplikasi sederhana yang mengintegrasikan katalog buku, keranjang belanja, checkout, dan pelacakan pesanan dalam satu website.

## 3. Tujuan Project

Tujuan dari pengembangan aplikasi BukuKita adalah:

- Menerapkan penggunaan HTML, CSS, dan JavaScript dalam pengembangan website.
- Membuat tampilan katalog buku yang mudah digunakan.
- Menyediakan fitur pemesanan buku secara online.
- Memudahkan administrator dalam mengelola data buku.
- Menyediakan informasi status pesanan dan pengiriman.

## 4. Fitur Aplikasi

### 4.1 User

Pengguna memiliki beberapa fitur berikut:

- Login dan logout.
- Melihat daftar katalog buku.
- Melihat informasi judul, kategori, harga, dan stok buku.
- Melihat gambar sampul buku.
- Menambahkan buku ke keranjang.
- Mengatur jumlah buku yang ingin dibeli.
- Melihat total harga pesanan.
- Melakukan checkout.
- Melihat informasi pesanan.
- Melacak status pengiriman.
- Menghubungi administrator melalui fitur bantuan.

### 4.2 Administrator

Administrator memiliki akses untuk mengelola aplikasi, meliputi:

- Login sebagai administrator.
- Melihat dashboard.
- Melihat jumlah katalog buku.
- Mengelola data katalog buku.
- Menambahkan buku baru.
- Mengedit informasi buku.
- Menghapus data buku.
- Melihat daftar pesanan pengguna.
- Melihat detail pesanan dan total transaksi.
- Memantau status pengiriman.

Administrator memiliki pembatasan akses untuk fitur checkout sehingga tidak dapat membuat pesanan sebagai pengguna.

## 5. Teknologi yang Digunakan

Project BukuKita dikembangkan menggunakan beberapa teknologi berikut:

| Teknologi | Kegunaan |
|---|---|
| HTML5 | Membuat struktur halaman website |
| CSS3 | Mengatur tampilan dan tata letak website |
| JavaScript | Mengatur fungsi dan interaksi aplikasi |
| LocalStorage | Menyimpan data katalog dan pesanan pada browser |
| SessionStorage | Menyimpan informasi sesi login |
| Visual Studio Code | Editor untuk menulis dan mengelola kode |
| Git | Mengelola perubahan kode |
| GitHub | Menyimpan repository project |

## 6. Struktur Folder

Struktur folder project BukuKita:

```text
BukuKita/
│
├── css/
│   └── style.css
│
├── js/
│   ├── data.js
│   └── script.js
│
├── img/
│   └── gambar-cover-buku
│
├── dashboard.html
├── stok.html
├── checkout.html
├── tracking.html
│
└── README.md
```

Keterangan:

- `dashboard.html`: Halaman dashboard yang menampilkan ringkasan informasi aplikasi.
- `stok.html`: Halaman katalog dan pengelolaan data buku.
- `checkout.html`: Halaman keranjang dan proses pemesanan.
- `tracking.html`: Halaman untuk melihat informasi dan status pengiriman pesanan.
- `css/style.css`: File untuk mengatur desain dan tampilan website.
- `js/data.js`: File yang berisi data awal aplikasi.
- `js/script.js`: File yang berisi fungsi dan logika aplikasi.
- `img/`: Folder untuk menyimpan gambar sampul buku.

## 7. Cara Menjalankan Aplikasi

Berikut langkah-langkah untuk menjalankan project BukuKita:

### Persiapan

Pastikan perangkat sudah memiliki:

- Visual Studio Code.
- Web Browser seperti Google Chrome atau Microsoft Edge.
- Extension Live Server pada Visual Studio Code.

### Langkah Menjalankan

1. Clone repository dari GitHub:

   ```bash
   git clone https://github.com/marisaasr/BukuKita.git
   ```

2. Buka folder project BukuKita menggunakan Visual Studio Code.

3. Pastikan seluruh folder dan file project tersedia.

4. Buka file `dashboard.html`.

5. Klik kanan pada file tersebut, kemudian pilih **Open with Live Server**.

6. Website akan terbuka secara otomatis melalui browser.

## 8. Alur Penggunaan Aplikasi

### User

1. Pengguna membuka website BukuKita.
2. Pengguna melakukan login.
3. Pengguna masuk ke halaman dashboard.
4. Pengguna membuka katalog buku.
5. Pengguna memilih buku yang ingin dibeli.
6. Pengguna menambahkan buku ke keranjang.
7. Pengguna melakukan checkout.
8. Pengguna melihat informasi pesanan.
9. Pengguna memantau status pengiriman melalui halaman tracking.

### Administrator

1. Administrator membuka website BukuKita.
2. Administrator melakukan login.
3. Administrator masuk ke halaman dashboard.
4. Administrator membuka halaman katalog.
5. Administrator dapat menambahkan, mengedit, atau menghapus data buku.
6. Administrator melihat daftar pesanan pengguna.
7. Administrator memantau informasi dan status pesanan.

## 9. Penyimpanan Data

Pada versi ini, aplikasi BukuKita menggunakan penyimpanan berbasis browser.

**LocalStorage**

Digunakan untuk menyimpan data katalog buku dan data pesanan agar tetap tersedia ketika halaman dimuat ulang pada browser yang sama.

**SessionStorage**

Digunakan untuk menyimpan informasi sesi login pengguna selama sesi browser berlangsung.

Aplikasi ini belum menggunakan database server seperti MySQL. Oleh karena itu, data yang tersimpan masih bersifat lokal pada browser dan perangkat yang digunakan.

## 10. Pengembangan Selanjutnya

Beberapa pengembangan yang dapat dilakukan pada aplikasi BukuKita antara lain:

- Mengintegrasikan database MySQL.
- Membuat sistem autentikasi yang lebih aman.
- Menambahkan fitur pembayaran online.
- Mengembangkan fitur pengelolaan stok secara otomatis.
- Menambahkan notifikasi perubahan status pesanan.
- Mengoptimalkan tampilan website untuk perangkat mobile.

## 11. Informasi Project

**Nama Aplikasi:** BukuKita  
**Jenis Project:** Aplikasi Pemesanan Buku Berbasis Web  
**Mata Kuliah:** Pemrograman Web  
**Kegiatan:** Ujian Tengah Semester (UTS)  
**Tahun:** 2026

## 12. Developer

**Marisa Puspita Sari**

Program Studi Teknik Informatika  
Universitas Pelita Bangsa

Repository GitHub:  
https://github.com/marisaasr/BukuKita

---

Project ini dibuat sebagai bagian dari pembelajaran dan penerapan materi Pemrograman Web.
