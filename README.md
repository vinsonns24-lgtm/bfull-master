# bfull — aplikasi pesan makanan kantin BINUS

Prototipe aplikasi untuk memesan makanan di kantin BINUS tanpa perlu mengantre. Mahasiswa memilih tenant, memesan lewat aplikasi, membayar secara nontunai, lalu memantau status pesanannya sampai siap diambil.

Dibuat untuk mata kuliah Human and Computer Interaction (COMP6800001). Satu kode dipakai untuk web dan Android, memakai Expo (React Native).

Demo web: https://bfull.expo.app

<!-- Tambahkan di sini bagian yang kamu kerjakan sendiri, misalnya fitur atau halaman tertentu. -->

## Catatan tentang proyek ini

Aplikasi ini dikerjakan berdua dengan Nicholas Darren. Repo tim beserta riwayat commit lengkapnya ada di https://github.com/nichodarren/bfull, dan repo ini adalah salinannya dengan tampilan berbahasa Inggris. Versi di repo tim tampilannya sudah diterjemahkan ke bahasa Indonesia.

## Fitur

- Masuk dan daftar dengan email `@binus.ac.id`, lengkap dengan akun demo.
- Pemilihan kampus, mencakup delapan kampus BINUS.
- Dua cara menjelajah menu: per tenant (A&W, Starbucks, Yoshinoya, dan lainnya) atau lewat daftar menu dengan pencarian dan filter kategori.
- Halaman detail makanan dengan catatan khusus untuk penjual.
- Keranjang yang hanya boleh berisi satu tenant, dengan konfirmasi saat pengguna mau memesan dari tenant lain.
- Voucher potongan harga dan total yang berubah langsung saat jumlah pesanan diubah.
- Pembayaran nontunai dengan QRIS.
- Pelacak pesanan dengan tiga tahap: dikonfirmasi, dimasak, siap diambil.
- Papan antrean kantin yang menunjukkan tingkat keramaian setiap tenant dan perkiraan waktu tunggu.
- Pemberitahuan keterlambatan pesanan.
- Penilaian bintang, tag cepat, dan komentar setelah pesanan diambil.
- Favorit, riwayat pesanan, dompet, dan poin.
- Data tersimpan di perangkat, sehingga tetap ada setelah aplikasi ditutup.
- Tampilan menyesuaikan perangkat: menu atas dan tata letak beberapa kolom di web, tab bawah di ponsel.

## Teknologi

- Expo SDK 56 dan Expo Router untuk navigasi berbasis file
- React Native 0.85, React 19, TypeScript
- NativeWind v4 (Tailwind CSS untuk React Native)
- AsyncStorage untuk menyimpan data di perangkat
- expo-image, expo-linear-gradient, dan ikon lucide-react-native

## Cara menjalankan

Butuh Node 18 atau lebih baru.

```bash
npm install

# Buka di browser
npm run web

# Buka di ponsel: pasang aplikasi Expo Go, lalu pindai QR yang muncul
npm start
```

Memeriksa tipe TypeScript: `npm run typecheck`

### Akun demo

Di halaman masuk, tekan tombol akun demo, atau isi sendiri:

```
Email:      demo@binus.ac.id
Kata sandi: bfull2026
```

Email apa pun yang berakhiran `@binus.ac.id` juga bisa dipakai.

## Cara membuat versi siap pakai

Versi web dan Android dibuat lewat layanan EAS milik Expo, dan butuh akun Expo sendiri.

```bash
npm install -g eas-cli
eas login
eas init

npm run deploy:web    # menerbitkan versi web
npm run build:apk     # membuat file APK untuk Android
```

Repo ini juga punya alur GitHub Actions di `.github/workflows/deploy-web.yml` yang menerbitkan ulang versi web setiap ada push ke branch utama.

## Struktur folder

```
app/                    halaman aplikasi (Expo Router)
  _layout.tsx           penyedia state dan susunan navigasi
  index.tsx             layar pembuka dan pemeriksaan login
  login.tsx             halaman masuk
  register.tsx          halaman daftar
  campus.tsx            pemilihan kampus
  (tabs)/               tab bawah: kantin, keranjang, profil
    index.tsx           beranda: pelacak pesanan, pencarian, daftar menu
    tenants.tsx         daftar tenant
    cart.tsx            keranjang
    profile.tsx         profil, dompet, dan poin
  tenant/[id].tsx       halaman satu tenant
  food/[id].tsx         detail makanan
  payment.tsx           pembayaran QRIS
  review.tsx            penilaian setelah pesanan diambil
  orders.tsx            riwayat pesanan
  favorites.tsx         daftar favorit
  vouchers.tsx          daftar voucher
components/             komponen tampilan: kartu makanan, kartu tenant,
                        pelacak pesanan, papan antrean, modal keterlambatan, toast
lib/                    tipe data, menu contoh, format angka, dan state aplikasi
```

## Keterbatasan

- Ini prototipe untuk tugas kuliah, bukan aplikasi yang benar-benar terhubung ke kantin.
- Menu, tenant, dan antrean memakai data contoh yang ditulis di dalam kode, bukan data asli.
- Pembayaran QRIS hanya tampilan, tidak ada transaksi sungguhan.
- Data pesanan disimpan di perangkat masing-masing, sehingga tidak bisa dilihat oleh tenant.

## Lisensi

MIT, mengikuti template awal Expo. Lihat file `LICENSE`.
