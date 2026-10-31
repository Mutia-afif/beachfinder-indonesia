---
title: "Product Requirement Document — BeachFinder Indonesia"
version: "2.1"
status: "Draft Terpadu untuk Validasi Produk dan Implementasi"
date: "31 Oktober 2026"
product: "BeachFinder Indonesia"
format: "Markdown"
---

# PRODUCT REQUIREMENT DOCUMENT (PRD)
## BeachFinder Indonesia
### Platform Eksplorasi Pesisir Nusantara, Transparansi Tarif, Telemetri Maritim, GIS, dan Pengelolaan Destinasi

| Informasi | Keterangan |
|---|---|
| Nama produk | BeachFinder Indonesia |
| Versi dokumen | 2.1 — Consolidated Product & Design Specification |
| Status | Draft terpadu berdasarkan PRD v2.0 dan `SKILL.md` desain |
| Target platform | Website responsif: desktop, tablet, dan mobile |
| Target pengguna | Wisatawan, peselancar/komunitas, pengelola destinasi, Pokdarwis, dan Dinas Pariwisata |
| Cakupan data awal | Dataset nasional yang direncanakan memuat 348+ pantai di 38 provinsi; angka aktual harus mengikuti hasil impor dan validasi |
| Bahasa utama | Bahasa Indonesia |
| Sistem desain | Coastal Discovery / BeachFinder UI Design Skill |
| Target rilis pada dokumen sumber | Q2 2026 (demo dan public beta); jadwal perlu dikonfirmasi ulang karena dokumen ini diperbarui 31 Oktober 2026 |

> **Catatan penggunaan dokumen:** PRD ini menyatukan kebutuhan produk pada PRD v2.0 dengan standar antarmuka dari `SKILL.md`. Keterangan fitur yang disebut “simulasi”, “direncanakan”, atau “membutuhkan integrasi” tidak boleh dipresentasikan sebagai layanan produksi yang sudah aktif. Ketentuan hukum, tarif, ambang keselamatan, ketersediaan data BMKG, dan jumlah dataset harus diverifikasi terhadap sumber resmi sebelum dipublikasikan.

---

# 1. Ringkasan Eksekutif

## 1.1 Gambaran Produk

BeachFinder Indonesia adalah platform web untuk membantu masyarakat menemukan destinasi pantai, memahami kondisi dan fasilitasnya, memperkirakan biaya kunjungan, memantau informasi maritim, serta memperoleh rekomendasi pantai berdasarkan kebutuhan perjalanan. Di sisi pengelola, BeachFinder menyediakan portal back-office untuk mengelola data pantai, memvalidasi informasi tarif, mengatur galeri, meninjau laporan, dan menerbitkan pembaruan kepada publik.

Produk menggabungkan lima kapabilitas utama:

1. **Eksplorasi destinasi:** katalog pantai nasional dengan pencarian, filter, halaman detail, peta, dan koleksi favorit.
2. **Transparansi biaya:** rincian tiket, parkir, fasilitas berbayar, pemilik/pengelola tarif, dasar hukum, tanggal verifikasi, dan kanal aduan.
3. **Informasi maritim:** penyajian informasi gelombang, angin, pasang-surut, dan peringatan keselamatan berdasarkan sumber data yang sah dan tersedia.
4. **Rekomendasi berbasis aturan:** pencocokan destinasi berdasarkan preferensi seperti surfing, wisata keluarga, fotografi, glamping, atau perjalanan hemat.
5. **Pengelolaan terpusat:** dashboard admin untuk mengelola inventaris, audit tarif, media, ulasan, laporan, dan riwayat perubahan.

BeachFinder harus membangun kepercayaan melalui informasi yang jelas asal-usulnya. Setiap data penting perlu memiliki sumber, waktu pembaruan, status verifikasi, dan keterangan apabila informasi belum tersedia.

## 1.2 Masalah yang Ingin Diselesaikan

### A. Ketidakpastian tarif dan pungutan tidak resmi
Wisatawan sering tidak mengetahui besaran tiket masuk, parkir, atau biaya fasilitas sebelum tiba di lokasi. Informasi dapat berbeda antara kanal promosi, papan tarif, dan kondisi lapangan. BeachFinder menyediakan rincian biaya yang transparan dan kanal pelaporan jika terdapat ketidaksesuaian.

### B. Informasi kondisi maritim yang tidak cukup spesifik
Prakiraan cuaca umum belum tentu menjawab kebutuhan pengunjung pantai dan peselancar. Informasi gelombang, periode swell, arah angin, pasang-surut, dan peringatan perlu disajikan dalam konteks destinasi, dengan sumber serta waktu pembaruan yang terlihat.

### C. Keterbatasan informasi fasilitas dan akses
Wisatawan membutuhkan informasi mengenai akses jalan, jenis kendaraan yang dapat menjangkau lokasi, toilet, air bilas, mushola, area parkir, penjaga pantai, dan fasilitas keluarga. Informasi tersebut harus ditampilkan secara terstruktur dan tidak diasumsikan tersedia apabila belum diverifikasi.

### D. Informasi destinasi tersebar
Data pantai, foto, ulasan, harga, koordinat, dan kondisi lokasi sering tersebar pada banyak kanal. BeachFinder mengonsolidasikan informasi tersebut dalam satu pengalaman penemuan dan pengelolaan.

## 1.3 Visi Produk

Menjadi platform eksplorasi pantai Indonesia yang informatif, transparan, dan mengutamakan keselamatan, sekaligus membantu pengelola destinasi menyampaikan informasi yang akurat kepada publik.

## 1.4 Nilai Utama

- **Untuk wisatawan:** keputusan perjalanan yang lebih terencana, biaya yang lebih jelas, dan informasi fasilitas yang mudah dipahami.
- **Untuk peselancar dan komunitas:** konteks kondisi laut, catatan spot, dan ruang berbagi observasi yang dapat diverifikasi.
- **Untuk pengelola:** satu tempat untuk memperbarui data, mengelola tarif, memoderasi laporan, dan menerbitkan informasi.
- **Untuk ekosistem pariwisata:** peningkatan kualitas informasi destinasi dan transparansi komunikasi antara pengelola dengan pengunjung.

## 1.5 Prinsip Produk

1. Akurasi dan keterlacakan data lebih penting daripada banyaknya data.
2. Keselamatan tidak boleh disederhanakan menjadi klaim “aman” tanpa konteks.
3. Tarif harus menunjukkan nominal, satuan, pihak pengelola, dasar informasi, dan tanggal verifikasi.
4. Informasi yang belum diverifikasi harus diberi label yang jujur.
5. Fitur antarmuka harus memiliki fungsi yang nyata; jangan menampilkan tombol dekoratif.
6. Pengalaman publik dan admin harus konsisten, tetapi memiliki kebutuhan navigasi yang berbeda.
7. Mobile-first, aksesibel, dan mudah digunakan dalam kondisi jaringan yang beragam.

---

# 2. Tujuan, Sasaran, dan Indikator Keberhasilan

## 2.1 Tujuan Produk

| ID | Tujuan | Hasil yang diharapkan |
|---|---|---|
| OBJ-01 | Mempermudah penemuan pantai | Pengguna dapat mencari dan menyaring destinasi berdasarkan lokasi, biaya, fasilitas, rating, dan karakteristik |
| OBJ-02 | Meningkatkan transparansi biaya | Informasi tarif memiliki status verifikasi, pihak pengelola, dan dasar informasi |
| OBJ-03 | Menyediakan konteks keselamatan maritim | Pengguna dapat melihat informasi kondisi laut beserta sumber, waktu pembaruan, dan batasan datanya |
| OBJ-04 | Membantu pemilihan destinasi | Pengguna memperoleh rekomendasi yang dapat dijelaskan berdasarkan bobot preferensi |
| OBJ-05 | Memperkuat pengelolaan data | Admin dapat memperbarui, memeriksa, dan menerbitkan informasi dengan jejak audit |
| OBJ-06 | Mendorong kontribusi komunitas | Pengguna dapat mengirim ulasan dan laporan dengan mekanisme moderasi serta perlindungan privasi |

## 2.2 KPI Produk

Target berikut merupakan target awal dari PRD sumber dan perlu ditinjau setelah baseline penggunaan tersedia.

| KPI | Target awal | Definisi pengukuran |
|---|---:|---|
| Kelengkapan dasar hukum tarif | ≥95% destinasi mitra | Destinasi yang memiliki dokumen/rujukan tarif resmi yang telah diverifikasi dibagi seluruh destinasi mitra |
| Aduan ketidaksesuaian tarif | <5% per kuartal | Aduan valid terkait tarif dibandingkan transaksi/kunjungan yang dapat diukur; denominator harus ditetapkan |
| Indikator untuk kondisi gelombang tinggi | 100% destinasi yang memiliki data gelombang valid di atas ambang internal | Cakupan alert untuk destinasi dengan data yang memenuhi kriteria |
| Waktu tampil peringatan | <15 detik setelah sistem menerima dan memproses pesan sumber | Diukur dari timestamp penerimaan data hingga alert terlihat; tidak termasuk keterlambatan sumber eksternal |
| Rasio simpan favorit | ≥25% dari kunjungan halaman detail | Jumlah tindakan simpan unik dibagi kunjungan detail yang memenuhi definisi analitik |
| Ulasan dengan bukti/verifikasi | ≥80% | Ulasan yang memiliki bukti atau metode verifikasi yang disetujui dibagi total ulasan |
| Keberhasilan pencarian | Target ditetapkan setelah baseline | Persentase sesi pencarian yang menghasilkan pembukaan detail atau tindakan lanjutan |
| Kualitas data destinasi | Target ditetapkan setelah audit awal | Persentase record yang memenuhi field wajib dan aturan validasi |

## 2.3 Prinsip Pengukuran

- Setiap KPI harus memiliki definisi event, sumber data, periode, dan pemilik.
- Jangan menghitung data simulasi sebagai penggunaan produksi.
- Pisahkan jumlah destinasi yang terdaftar, lengkap, diverifikasi, dan dipublikasikan.
- Laporkan keterbatasan denominator jika data kunjungan fisik belum tersedia.
- KPI keselamatan mengukur ketersediaan dan kecepatan penyampaian informasi, bukan jaminan tidak terjadinya kecelakaan.

---

# 3. Ruang Lingkup Produk

## 3.1 In Scope — Rilis Awal

### Portal publik
- Beranda dan pencarian destinasi.
- Katalog jelajah pantai.
- Filter dan pengurutan.
- Halaman detail pantai.
- Informasi tarif dan dasar hukum yang tersedia.
- Informasi fasilitas dan aksesibilitas.
- Penyajian data maritim jika sumber/integrasi tersedia.
- Rekomendasi berbasis aturan.
- Peta interaktif dan penanda lokasi.
- Favorit lokal tanpa kewajiban login.
- Ulasan dan filter ulasan, sesuai kebijakan moderasi.
- Pusat peringatan dengan status data dan sumber.
- Profil komunitas/penjelajah apabila fitur akun telah disiapkan.

### Portal admin
- Login dan kontrol akses.
- Dashboard ringkasan.
- Pengelolaan data pantai.
- Form tambah/edit multi-tab.
- Validasi tarif dan masa berlaku/verifikasi.
- Pengelolaan foto/media.
- Moderasi ulasan dan aduan.
- Penerbitan dan pratinjau publik.
- Log aktivitas/audit.

## 3.2 Out of Scope — Rilis Awal

Fitur berikut termasuk roadmap dan tidak dianggap selesai pada rilis awal kecuali ada keputusan implementasi terpisah:

- Pembayaran tiket/QRIS dan e-retribusi.
- Pemesanan tiket atau fasilitas.
- Live streaming kamera pantai 24/7.
- Instalasi perangkat IoT milik BeachFinder.
- Geofencing otomatis berbasis lokasi pengguna.
- Integrasi langsung dengan sistem transaksi pemerintah daerah.
- Prediksi kondisi laut buatan BeachFinder.
- Jaminan keselamatan atau sertifikasi lokasi secara otomatis.

## 3.3 Batasan Integrasi

- Data BMKG hanya boleh ditampilkan jika tersedia melalui kanal resmi atau sumber yang memiliki izin/persetujuan penggunaan.
- Jika belum ada API atau feed resmi yang dapat digunakan, tampilkan data contoh sebagai **DEMO**, bukan data live.
- Peta membutuhkan penyedia peta, token/akses yang sesuai, dan kebijakan atribusi.
- Rating pihak ketiga hanya ditampilkan apabila sumber dan ketentuan penggunaannya mengizinkan.
- Notifikasi push memerlukan izin browser/perangkat dan infrastruktur pengiriman notifikasi.

---

# 4. Pengguna, Persona, dan Hak Akses

## 4.1 Persona A — Dimas Pratama: Peselancar dan Penjelajah Bahari

**Profil:** 28 tahun, atlet selancar/pemandu independen, beraktivitas di Pesisir Barat dan Jakarta.

**Kebutuhan:**
- Menilai kondisi ombak, periode swell, arah angin, dan pasang-surut.
- Menemukan spot berdasarkan karakteristik break dan tingkat pengalaman.
- Menyimpan spot favorit dan membandingkan beberapa lokasi.
- Mengirim logbook atau observasi lapangan.
- Melaporkan potensi bahaya seperti rip current.

**Hambatan:**
- Prakiraan umum tidak selalu sesuai dengan kondisi spot.
- Data topografi dan karakter ombak belum tentu tersedia.
- Informasi akses dan biaya spot terpencil tidak konsisten.

**Fitur prioritas:** peta GIS, informasi maritim, favorit, logbook komunitas, alert, dan detail karakteristik pantai.

## 4.2 Persona B — Maya Saraswati: Wisatawan Keluarga

**Profil:** 34 tahun, orang tua dengan dua anak, berdomisili di Bandar Lampung/Jabodetabek.

**Kebutuhan:**
- Mengetahui estimasi total biaya keluarga.
- Memastikan fasilitas dasar seperti toilet, air bilas, mushola, parkir, dan area istirahat.
- Mengetahui akses jalan dan kecocokan kendaraan.
- Memahami kondisi peringatan dan batas aktivitas.
- Membaca ulasan dari pengunjung dengan kebutuhan serupa.

**Hambatan:**
- Ketidakjelasan tarif dan pungutan tambahan.
- Informasi fasilitas tidak selalu diperbarui.
- Kesulitan menilai keamanan lokasi hanya dari foto.

**Fitur prioritas:** transparansi biaya, filter ramah keluarga, ulasan keluarga, informasi akses/fasilitas, dan peringatan.

## 4.3 Persona C — Budi Santoso: Admin Dinas/Pokdarwis

**Profil:** 42 tahun, pengelola kawasan atau petugas pengelola data destinasi.

**Kebutuhan:**
- Memperbarui data destinasi dan tarif.
- Melampirkan dasar hukum atau dokumen rujukan.
- Memastikan foto mengikuti pedoman.
- Memeriksa laporan tarif dan ulasan.
- Mengetahui data yang belum diverifikasi atau telah kedaluwarsa.
- Melihat siapa yang mengubah data dan kapan perubahan terjadi.

**Hambatan:**
- Pembaruan data tersebar pada beberapa kanal.
- Bukti tarif dan dokumen regulasi tidak terorganisasi.
- Sulit mengetahui data yang sudah lama tidak diperiksa.

**Fitur prioritas:** dashboard admin, inventaris, drawer multi-tab, audit tarif, moderasi, pratinjau, dan audit log.

## 4.4 Peran dan Hak Akses

| Peran | Hak akses utama | Batasan |
|---|---|---|
| Pengunjung | Melihat katalog, detail, peta, tarif, peringatan, dan rekomendasi | Tidak dapat mengubah data resmi |
| Pengguna terdaftar | Fitur pengunjung, mengelola profil, favorit lintas perangkat, ulasan/laporan jika diaktifkan | Konten kontribusi dapat dimoderasi |
| Kontributor komunitas | Mengirim observasi, logbook, foto, ulasan, dan laporan | Tidak dapat menerbitkan data destinasi |
| Editor Pokdarwis | Mengusulkan/memperbarui data destinasi dan media sesuai wilayah | Perubahan dapat membutuhkan persetujuan |
| Verifikator tarif | Memeriksa nominal, bukti, dasar hukum, dan status verifikasi | Tidak otomatis mengubah kebijakan resmi |
| Moderator | Meninjau ulasan, foto, dan aduan | Tidak mengubah parameter teknis maritim |
| Admin daerah | Mengelola data dan pengguna sesuai wilayah kewenangan | Akses dibatasi berdasarkan wilayah |
| Superadmin | Mengelola konfigurasi global, peran, dan audit | Aksi kritis harus tercatat dan dibatasi |

**Catatan:** model peran final harus disesuaikan dengan struktur organisasi mitra. Nama jabatan pada tabel adalah rancangan akses produk, bukan penetapan kewenangan hukum.

---

# 5. Kebutuhan Fungsional

Prioritas menggunakan MoSCoW:
- **Must:** wajib untuk rilis awal.
- **Should:** penting, tetapi dapat menyusul jika ada kendala.
- **Could:** nilai tambah.
- **Won't (release ini):** tidak termasuk rilis awal.

## 5.1 Modul Eksplorasi Katalog

### FR-EXP-01 — Beranda
**Prioritas:** Must

Sistem menampilkan:
- Header navigasi dan identitas BeachFinder.
- Hero pencarian destinasi.
- Pilihan pencarian berdasarkan nama, wilayah, dan preferensi.
- Highlight destinasi pilihan.
- Ringkasan data nasional yang bersumber dari database aktual.
- Bagian keselamatan dan transparansi.
- CTA menuju katalog, rekomendasi, atau peta.
- Footer berisi informasi, bantuan, kebijakan, dan kontak.

**Aturan:**
- Statistik tidak boleh di-hardcode sebagai data produksi.
- Jika dataset belum lengkap, tampilkan jumlah aktual dan label “data terdaftar”.
- Hero tidak boleh menghalangi fungsi pencarian pada mobile.

**Kriteria penerimaan:**
- Pengguna dapat memulai pencarian dari beranda.
- CTA mengarah ke halaman yang benar.
- Tata letak tetap terbaca pada viewport mobile dan desktop.

### FR-EXP-02 — Katalog Jelajahi Pantai
**Prioritas:** Must

Sistem menampilkan daftar pantai dalam grid/list yang dapat difilter.

Filter yang direncanakan:
- Provinsi/kabupaten.
- Rentang biaya.
- Rating.
- Jenis pasir/karakter pantai.
- Fasilitas.
- Kategori aktivitas.
- Status informasi tarif.
- Kondisi maritim jika data tersedia.

Pengurutan:
- Relevansi.
- Rating tertinggi.
- Biaya terendah.
- Nama A–Z.
- Terbaru diperbarui.

**Aturan:**
- Filter yang dipilih harus terlihat.
- Pengguna dapat menghapus satu filter atau seluruh filter.
- Jumlah hasil mengikuti hasil query.
- Paginasi atau infinite scroll harus konsisten dan tidak menggandakan data.
- Klaim 348+ destinasi dan 39 halaman adalah target/angka pada sumber; implementasi harus menghitung jumlah aktual berdasarkan dataset dan ukuran halaman.

**Kriteria penerimaan:**
- Kombinasi filter menghasilkan daftar yang sesuai.
- Empty state memberikan cara menghapus filter atau kembali menjelajah.
- Pengguna dapat membuka detail dari setiap kartu.

### FR-EXP-03 — Kartu Pantai
**Prioritas:** Must

Kartu minimal menampilkan:
- Foto utama.
- Nama pantai.
- Kabupaten/provinsi.
- Rating dan jumlah ulasan bila tersedia.
- Harga tiket atau status “belum terverifikasi”.
- Satu hingga tiga atribut utama.
- Tombol favorit.
- Aksi menuju detail.

Foto harus memiliki alt text. Kartu tidak boleh menampilkan rating, tarif, atau fasilitas yang tidak memiliki sumber data.

### FR-EXP-04 — Pencarian Multi-Kriteria
**Prioritas:** Must

Sistem mendukung pencarian nama pantai, provinsi, kabupaten/kota, dan atribut yang diindeks.

**Aturan:**
- Mendukung pencarian parsial dan normalisasi huruf besar/kecil.
- Hasil kosong menampilkan saran memperluas kata kunci.
- Jika pencarian membutuhkan server, tampilkan loading dan error state.
- Debounce dapat digunakan untuk mengurangi request berulang.

## 5.2 Modul Detail Pantai dan Transparansi Biaya

### FR-DET-01 — Halaman Detail Pantai
**Prioritas:** Must

Struktur halaman:
1. Breadcrumb dan identitas lokasi.
2. Galeri foto.
3. Nama, wilayah, rating, dan kategori.
4. Ringkasan destinasi.
5. Informasi tarif.
6. Data maritim dan keselamatan.
7. Fasilitas.
8. Aksesibilitas dan petunjuk lokasi.
9. Peta/koordinat.
10. Ulasan komunitas.
11. Sumber data, tanggal pembaruan, dan status verifikasi.
12. CTA favorit, bagikan, rute, atau laporkan informasi.

### FR-DET-02 — Rincian Tarif
**Prioritas:** Must

Minimal kategori tarif:
- Tiket masuk umum per orang.
- Parkir motor (R2).
- Parkir mobil (R4).
- Sewa fasilitas primer seperti gazebo atau fasilitas lain jika tersedia.

Setiap item tarif memiliki:
- Nama komponen.
- Nominal.
- Satuan/periode.
- Pihak pengelola atau kategori kepemilikan: `Resmi Pemda (Perda)`, `BUMDes/Desa Adat`, atau `Usaha Warga Lokal Terdaftar`.
- Dasar informasi/dokumen.
- Tanggal mulai berlaku jika tersedia.
- Tanggal terakhir diverifikasi.
- Status verifikasi.
- Catatan atau pengecualian.

**Aturan:**
- Nominal kosong tidak boleh diubah menjadi Rp0.
- Tarif yang belum memiliki bukti harus diberi label “Belum terverifikasi”.
- Tarif lama tidak boleh ditampilkan seolah-olah masih berlaku.
- Pengguna harus dapat membedakan tarif resmi, tarif pengelola lokal, dan biaya yang belum dikonfirmasi.
- Contoh nomor Perda dalam dokumen sumber adalah ilustrasi; nomor dan isi regulasi wajib diverifikasi sebelum digunakan.

### FR-DET-03 — Data Freshness Tarif
**Prioritas:** Must

Aturan indikator awal dari PRD:
- Hijau: verifikasi kurang dari 30 hari.
- Kuning: verifikasi 31–90 hari.
- Merah: lebih dari 90 hari dan membutuhkan audit.

**Aturan implementasi tambahan:**
- Batas hari dihitung dari tanggal verifikasi terakhir terhadap tanggal sistem.
- Data tanpa tanggal verifikasi memiliki status “Belum diverifikasi”.
- Zona waktu dan aturan tanggal harus konsisten.
- Warna selalu disertai teks status.
- Perubahan status tidak menghapus histori verifikasi.

### FR-DET-04 — Pelaporan Ketidaksesuaian Tarif
**Prioritas:** Must

Form laporan mencakup:
- Pantai/lokasi terkait.
- Jenis tarif.
- Nominal yang tercantum di BeachFinder (jika ada).
- Nominal yang diminta di lapangan.
- Lokasi loket/titik pembayaran.
- Tanggal dan waktu kejadian.
- Deskripsi.
- Bukti foto karcis atau dokumen, opsional sesuai kebijakan.
- Kontak pelapor jika diperlukan untuk tindak lanjut.

Alur status:
`Dikirim` → `Menunggu Tinjauan` → `Dalam Pemeriksaan` → `Ditindaklanjuti` / `Ditolak` / `Ditutup`.

**Perlindungan:**
- Jangan mempublikasikan identitas pelapor.
- Hindari menampilkan tuduhan sebagai fakta sebelum pemeriksaan.
- Moderasi bukti yang memuat data pribadi.
- Sediakan mekanisme pelaporan penyalahgunaan.

**Kriteria penerimaan:**
- Form memvalidasi field wajib.
- Pelapor menerima nomor referensi.
- Admin dapat melihat dan mengubah status sesuai hak akses.
- Riwayat tindakan tersimpan.

## 5.3 Modul Telemetri Maritim dan Keselamatan

### FR-MAR-01 — Panel Kondisi Maritim
**Prioritas:** Must untuk UI; integrasi data Should/bergantung akses sumber.

Parameter yang direncanakan:
- Tinggi gelombang (meter).
- Periode gelombang/swell (detik), bila tersedia.
- Arah gelombang.
- Arah dan kecepatan angin (satuan sumber, misalnya knot atau m/s).
- Kondisi pasang-surut.
- Waktu observasi/pembaruan.
- Sumber/stasiun data.
- Status kualitas atau ketersediaan data.

**Aturan:**
- Jangan menggabungkan data dari waktu atau stasiun berbeda tanpa penjelasan.
- Tampilkan “Data tidak tersedia” apabila sumber tidak mengirim data.
- Tampilkan timestamp lokal Indonesia yang relevan dan zona waktunya.
- Bedakan observasi, prakiraan, dan simulasi.
- Jangan menyebut data live apabila pembaruannya tidak realtime.

### FR-MAR-02 — Peringatan Gelombang
**Prioritas:** Should, menjadi Must jika kanal data dan prosedur operasional telah disepakati.

Rentang pada PRD sumber:
- 0,5–1,25 m: Tenang/Rendah, label Hijau.
- 1,25–2,5 m: Sedang, label Kuning.
- 2,5–4,0 m: Tinggi, label Oranye.
- Di atas 4,0 m: Sangat Tinggi/Ekstrem, label Merah.

**PENTING:** rentang tersebut adalah aturan klasifikasi produk yang tertulis dalam PRD sumber, bukan pernyataan bahwa itu merupakan standar resmi BMKG atau jaminan keamanan berenang. Sebelum dipakai pada produksi, parameter, ambang, istilah, dan rekomendasi aktivitas harus divalidasi bersama sumber maritim/otoritas keselamatan yang kompeten. Gelombang bukan satu-satunya faktor risiko; arus, pasang, topografi, cuaca, dan kondisi lokal juga berpengaruh.

Setiap alert menampilkan:
- Tingkat peringatan dan judul.
- Lokasi/wilayah terdampak.
- Parameter pemicu.
- Waktu diterbitkan dan berlaku.
- Sumber data.
- Instruksi dari otoritas jika tersedia.
- Keterangan bahwa pengguna harus mengikuti petugas dan rambu setempat.
- Alternatif lokasi hanya jika data alternatif memadai.

### FR-MAR-03 — Pasang Surut
**Prioritas:** Should

Menampilkan:
- Waktu pasang tertinggi.
- Waktu surut terendah.
- Tinggi pasang jika sumber menyediakan.
- Grafik harian.
- Sumber, lokasi referensi, dan waktu pembaruan.

Jangan menampilkan angka prediksi pasang-surut tanpa sumber dan metode yang jelas.

### FR-MAR-04 — Pusat Peringatan
**Prioritas:** Should

Halaman pusat peringatan berisi:
- Daftar alert aktif dan arsip.
- Peta wilayah terdampak.
- Filter provinsi/status/tingkat.
- Detail alert.
- Rekomendasi tindakan yang bersumber dari otoritas.
- Alternatif destinasi jika tersedia dan tidak sedang berada dalam kondisi peringatan.

Simulasi push notification hanya boleh diberi label “Simulasi Demo”.

## 5.4 Modul Rekomendasi Berbasis Aturan

### FR-REC-01 — Preferensi Pengguna
**Prioritas:** Must

Pilihan persona/preferensi:
- Surfing.
- Ramah keluarga/anak.
- Backpacker/budget.
- Fotografi.
- Glamping/rekreasi alam.

Input tambahan dapat mencakup:
- Provinsi/wilayah.
- Batas anggaran.
- Fasilitas wajib.
- Tingkat pengalaman.
- Preferensi kondisi air/ombak.
- Jenis perjalanan.

### FR-REC-02 — Mesin Pencocokan
**Prioritas:** Must

Formula dasar:

`Score = (W_ombak × S_ombak) + (W_biaya × S_biaya) + (W_fasilitas × S_fasilitas) + (W_akses × S_akses)`

Bobot awal dari PRD sumber:

| Persona | Ombak | Biaya | Fasilitas | Akses | Catatan |
|---|---:|---:|---:|---:|---|
| Surfing | 0,50 | 0,15 | 0,15 | 0,20 | Total 1,00 |
| Wisata keluarga | 0,10 | 0,30 | 0,40 | 0,20 | Total 1,00; aspek keamanan/ketenangan air perlu dimodelkan eksplisit |
| Backpacker/budget | — | 0,50 | — | 0,25 | Keindahan 0,25; perlu perluasan dimensi formula |

**Keputusan desain algoritma:**
- Mesin harus mengakomodasi dimensi tambahan seperti keamanan, keindahan, fasilitas sanitasi, dan kualitas data.
- Setiap bobot harus berjumlah 1,00 untuk satu profil.
- Skor setiap dimensi dinormalisasi pada skala yang sama (misalnya 0–100).
- Nilai yang tidak tersedia tidak boleh otomatis dianggap 0 atau 100.
- Sistem harus menunjukkan alasan rekomendasi, bukan hanya persentase.
- Hasil rekomendasi bukan jaminan keselamatan atau kualitas destinasi.
- Bobot dapat dikonfigurasi dan memiliki versi agar hasil dapat diaudit.

### FR-REC-03 — Perbandingan Pantai
**Prioritas:** Should

Pengguna dapat memilih dua atau lebih pantai untuk dibandingkan berdasarkan:
- Estimasi biaya.
- Fasilitas.
- Akses.
- Rating/ulasan.
- Karakteristik pantai.
- Informasi maritim yang tersedia.
- Kelengkapan dan kesegaran data.

Perbandingan harus menandai field yang tidak tersedia agar tidak menimbulkan kesan setara padahal datanya berbeda.

## 5.5 Modul Peta Interaktif GIS

### FR-MAP-01 — Peta Destinasi
**Prioritas:** Should

Peta menampilkan marker pantai dengan:
- Nama dan kategori.
- Status ringkas.
- Aksi membuka detail.
- Cluster marker bila jumlah titik padat.
- Pencarian area jika provider mendukung.

### FR-MAP-02 — Layer dan POI
**Prioritas:** Could/Should sesuai kesiapan sumber

Layer yang direncanakan:
- Peta dasar.
- Citra satelit.
- Batimetri jika data berlisensi/tersedia.
- Titik loket.
- Pos penjaga pantai/lifeguard.
- Gazebo/fasilitas.
- Spot surfing.
- Area peringatan.

POI hanya boleh dipublikasikan jika sumber, koordinat, dan statusnya dapat dipertanggungjawabkan.

### FR-MAP-03 — Responsif Mobile
**Prioritas:** Must untuk peta yang dirilis di mobile

- Peta dapat menggunakan layar penuh.
- Floating search bar tidak menutup kontrol utama.
- Detail titik dibuka melalui bottom sheet.
- Bottom sheet memiliki state collapsed/expanded.
- Pengguna dapat menutup sheet untuk kembali melihat peta.
- Kontrol peta memiliki ukuran sentuh yang cukup.
- Penggunaan lokasi perangkat memerlukan izin eksplisit.

## 5.6 Modul Favorit

### FR-FAV-01 — Simpan Favorit
**Prioritas:** Must

- Pengunjung dapat menyimpan pantai tanpa login paksa.
- Pada browser, data dapat disimpan secara lokal.
- Pengguna dapat menghapus favorit.
- Tombol menunjukkan state aktif/tidak aktif.
- Toast hanya muncul setelah state berhasil diperbarui.

### FR-FAV-02 — Sinkronisasi Lintas Perangkat
**Prioritas:** Could

Sinkronisasi akun hanya tersedia setelah autentikasi dan backend siap. Jangan menyebut favorit anonim sebagai “cloud sync”.

### FR-FAV-03 — Empty State
**Prioritas:** Must

Jika belum ada favorit, tampilkan penjelasan singkat, CTA jelajahi pantai, dan contoh cara menyimpan.

## 5.7 Modul Komunitas, Profil, dan Ulasan

### FR-COM-01 — Profil Penjelajah
**Prioritas:** Could/Should

Informasi yang direncanakan:
- Nama tampilan dan foto profil.
- Bio.
- Lokasi umum (opsional).
- Lencana verifikasi.
- Logbook aktivitas.
- Perlengkapan/quiver (opsional).
- Lisensi/sertifikasi jika dapat diverifikasi.
- Ulasan dan kontribusi.

Data sensitif dan lokasi presisi tidak boleh ditampilkan tanpa persetujuan. Lencana harus menjelaskan pihak penerbit dan cakupan verifikasi.

### FR-COM-02 — Logbook dan Observasi
**Prioritas:** Could

Pengguna dapat mengirim:
- Destinasi.
- Waktu observasi.
- Kondisi yang diamati.
- Deskripsi.
- Foto opsional.
- Lokasi/GPS opsional dengan izin.
- Tingkat keyakinan atau status verifikasi.

Observasi komunitas tidak menggantikan peringatan resmi.

### FR-COM-03 — Ulasan
**Prioritas:** Should

- Pengguna dapat mengirim rating dan teks.
- Kategori ulasan dapat mencakup keluarga, peselancar, akses, fasilitas, dan biaya.
- Ulasan dapat dilaporkan.
- Moderasi mencegah spam, ujaran kebencian, doxxing, dan tuduhan yang tidak berdasar.
- Status ulasan: menunggu moderasi, tayang, ditolak, atau disembunyikan.
- Label “terverifikasi GPS” hanya diberikan jika proses verifikasi benar-benar dilakukan dan pengguna menyetujui penggunaan lokasi.

## 5.8 Modul Admin Back-Office

### FR-ADM-01 — Dashboard Ringkasan
**Prioritas:** Must

KPI yang dapat ditampilkan:
- Total destinasi terdaftar.
- Destinasi terpublikasi.
- Data belum lengkap.
- Tarif perlu audit.
- Laporan masuk.
- Ulasan menunggu moderasi.
- Pembaruan terbaru.

Setiap KPI harus berasal dari data aktual dan dapat diarahkan ke daftar terkait.

### FR-ADM-02 — Kelola Data Pantai
**Prioritas:** Must

Admin dapat:
- Melihat daftar destinasi.
- Mencari berdasarkan nama/ID/wilayah.
- Memfilter status data, publikasi, dan tarif.
- Membuka detail.
- Menambah data.
- Mengedit data sesuai hak akses.
- Mengarsipkan atau menonaktifkan record.
- Melihat status kelengkapan.
- Mengekspor laporan sesuai izin.

Penghapusan permanen harus dibatasi dan dicatat. Utamakan soft delete/arsip untuk menjaga histori.

### FR-ADM-03 — Drawer Form Multi-Tab
**Prioritas:** Must

Tab formulir:
1. Informasi Utama & Lokasi.
2. Harga Tiket & Status.
3. Fasilitas & Karakteristik.
4. Foto & Media.

**Tab 1 — Informasi Utama & Lokasi**
- Nama pantai.
- Slug/ID.
- Provinsi.
- Kabupaten/kota.
- Kecamatan/desa bila tersedia.
- Deskripsi.
- Koordinat lintang/bujur.
- Akses dan jenis jalan.
- Kategori/karakteristik.
- Status publikasi.

**Tab 2 — Harga Tiket & Status**
- Tiket umum.
- Parkir R2.
- Parkir R4.
- Biaya fasilitas.
- Jenis pengelola.
- Dasar hukum/dokumen.
- Tanggal berlaku.
- Tanggal verifikasi.
- Status audit.
- Catatan.

**Tab 3 — Fasilitas & Karakteristik**
- Toilet.
- Air bilas/air tawar.
- Mushola.
- Area parkir.
- Gazebo.
- Penjaga pantai.
- Warung/UMKM.
- Akses kendaraan.
- Karakter pasir/ombak/aktivitas.
- Status ketersediaan dan catatan verifikasi.

**Tab 4 — Foto & Media**
- Foto sampul.
- Foto tambahan.
- Caption/alt text.
- Sumber foto dan lisensi.
- Metadata waktu/lokasi bila sah.
- Status pemeriksaan SOP.
- Pengaturan urutan.

**Aturan formulir:**
- Data yang sudah diisi tidak hilang saat berpindah tab.
- Validasi dilakukan pada field dan saat submit.
- Field wajib ditandai.
- Kesalahan ditampilkan dekat field terkait.
- Ada ringkasan kelengkapan.
- Draft dapat disimpan jika backend mendukung.
- Tombol terbitkan hanya aktif jika persyaratan publikasi terpenuhi.
- Perubahan tarif dan regulasi harus masuk audit log.

### FR-ADM-04 — SOP Foto dan Media
**Prioritas:** Must untuk unggah media

Ketentuan UI dari skill:
- Format JPG, PNG, WEBP.
- Maksimum 5 MB per foto.
- Rasio lanskap 16:9 direkomendasikan.
- Foto sampul direkomendasikan minimal 1920 × 1080 px.
- Foto harus jelas, relevan, dan tidak melanggar hak cipta.
- Hindari watermark berlebihan dan materi promosi yang mengganggu.

**Catatan:** batas teknis harus disesuaikan dengan kapasitas server/storage. Foto yang lolos pemeriksaan teknis belum tentu lolos pemeriksaan hak cipta atau kelayakan editorial.

### FR-ADM-05 — Validasi Tarif dan Audit Kedaluwarsa
**Prioritas:** Must

- Daftar tarif dapat difilter berdasarkan umur verifikasi.
- Admin melihat dasar hukum dan bukti pendukung.
- Admin dapat menandai valid, perlu revisi, atau tidak dapat diverifikasi.
- Sistem menyimpan tanggal, pengguna, alasan, dan versi perubahan.
- Sistem mengingatkan tarif yang melewati 90 hari sesuai aturan awal.
- Sistem tidak mengubah nominal secara otomatis.

### FR-ADM-06 — Moderasi Ulasan dan Aduan
**Prioritas:** Should

Admin dapat:
- Melihat antrean.
- Membuka bukti.
- Menyetujui/menolak/menyembunyikan.
- Memberi alasan.
- Mengubah status aduan.
- Mencatat tindak lanjut.
- Melihat histori.

### FR-ADM-07 — Pratinjau dan Penerbitan
**Prioritas:** Must

Alur:
`Draft` → `Pemeriksaan` → `Siap Diterbitkan` → `Terbit` → `Diarsipkan`.

Sebelum terbit, sistem memeriksa:
- Field identitas wajib.
- Koordinat valid jika lokasi dipetakan.
- Foto sampul tersedia jika diwajibkan.
- Tarif memiliki status yang jelas.
- Sumber dan tanggal verifikasi diisi untuk data yang memerlukannya.
- Tidak ada error validasi kritis.

Setelah penerbitan, tampilkan konfirmasi hanya jika server berhasil menyimpan status. Sediakan URL publik dan aksi pratinjau.

### FR-ADM-08 — Audit Log
**Prioritas:** Must

Catat:
- Pengguna yang melakukan tindakan.
- Waktu.
- Entitas dan ID.
- Jenis tindakan.
- Nilai sebelum/sesudah untuk field kritis.
- Alasan perubahan jika diwajibkan.
- Hasil tindakan.

Log tidak boleh dapat diubah oleh pengguna biasa. Akses ekspor log dibatasi.

---

# 6. Alur Pengguna Utama

## 6.1 Alur Menemukan Pantai

1. Pengguna membuka beranda.
2. Pengguna memasukkan nama/wilayah atau memilih preferensi.
3. Sistem menampilkan hasil.
4. Pengguna menerapkan filter dan sorting.
5. Pengguna membuka kartu destinasi.
6. Pengguna memeriksa tarif, fasilitas, akses, kondisi maritim, foto, dan ulasan.
7. Pengguna menyimpan favorit, membagikan, atau membuka rute.

**Hasil yang diharapkan:** pengguna dapat membuat keputusan awal tanpa harus berpindah ke banyak sumber untuk informasi dasar.

## 6.2 Alur Memeriksa Tarif

1. Pengguna membuka detail pantai.
2. Sistem menampilkan komponen tarif.
3. Pengguna memeriksa kategori pengelola dan dasar informasi.
4. Sistem menampilkan tanggal verifikasi dan status freshness.
5. Jika terjadi ketidaksesuaian, pengguna membuka form laporan.
6. Pengguna mengisi nominal, lokasi, waktu, dan bukti opsional.
7. Sistem memberikan nomor laporan.
8. Admin memeriksa dan memperbarui status.

## 6.3 Alur Menggunakan Rekomendasi

1. Pengguna memilih persona/preferensi.
2. Pengguna mengisi wilayah, anggaran, atau fasilitas penting.
3. Sistem mengambil destinasi yang memenuhi batas minimum.
4. Mesin menghitung skor berdasarkan bobot aktif.
5. Sistem menampilkan rekomendasi dan alasan pencocokan.
6. Pengguna membandingkan destinasi.
7. Pengguna membuka detail atau menyimpan favorit.

## 6.4 Alur Peringatan Maritim

1. Sumber data mengirim pembaruan atau petugas memasukkan informasi terverifikasi.
2. Sistem memvalidasi format, lokasi, timestamp, dan sumber.
3. Mesin aturan menentukan status berdasarkan konfigurasi yang disetujui.
4. Sistem membuat alert dan menyimpan histori.
5. Alert muncul pada pusat peringatan dan halaman destinasi terkait.
6. Pengguna membaca instruksi dan sumber.
7. Sistem menampilkan alternatif hanya jika tersedia dan memenuhi aturan penyaringan.

## 6.5 Alur Admin Menerbitkan Pantai

1. Admin login.
2. Admin membuka Kelola Data Pantai.
3. Admin memilih Tambah Pantai.
4. Admin mengisi tab informasi utama dan lokasi.
5. Admin mengisi rincian biaya dan dasar informasi.
6. Admin mengisi fasilitas dan karakteristik.
7. Admin mengunggah foto dan metadata.
8. Sistem memvalidasi field wajib.
9. Admin menyimpan draft atau mengirim untuk pemeriksaan.
10. Verifikator memeriksa data.
11. Admin yang berwenang menerbitkan.
12. Sistem mencatat audit log dan menampilkan konfirmasi.
13. Halaman publik menampilkan versi terbaru.

---

# 7. Arsitektur Informasi dan Inventaris Layar

Dokumen PRD sumber menyebut “18 layar”, tetapi daftar bernomor yang diberikan berisi **19 entri layar**: 10 desktop publik, 4 mobile, dan 5 admin. Dokumen ini mempertahankan seluruh 19 entri dan menandai jumlah final untuk dikonfirmasi.

## 7.1 Portal Publik — Desktop

| ID | Layar | Kebutuhan utama |
|---|---|---|
| SCR-01 | Beranda BeachFinder | Hero pencarian, highlight destinasi, statistik aktual, pilar keselamatan |
| SCR-02 | Jelajahi Pantai | Grid katalog, filter, sorting, paginasi |
| SCR-03 | Detail Pantai Tanjung Setia | Galeri, tarif, dasar hukum, maritim, fasilitas, ulasan |
| SCR-04 | Pratinjau Publik — Live | Banner status publikasi, data terbaru, panel transparansi biaya |
| SCR-05 | Rekomendasi Pantai | Selector preferensi, hasil skor, perbandingan |
| SCR-06 | Pantai Favorit — Berisi | Daftar tersimpan, estimasi biaya, status maritim |
| SCR-07 | Pantai Favorit — Kosong | Empty state dan CTA jelajah |
| SCR-08 | Pusat Peringatan BMKG | Daftar alert, peta bahaya, alternatif |
| SCR-09 | Peta GIS dan Ulasan | Split view peta dan panel ulasan |
| SCR-10 | Profil Dimas Pratama | Profil, logbook, quiver, lisensi, kontribusi |

## 7.2 Pengalaman Mobile

| ID | Layar | Kebutuhan utama |
|---|---|---|
| SCR-11 | Detail Pantai — Mobile | Galeri 16:9, informasi bertumpuk, CTA rute sticky |
| SCR-12 | Peta GIS Full Screen | Kanvas peta, floating search, layer dan POI |
| SCR-13 | Peta Mobile — Bottom Sheet | Detail lokasi dengan tab maritim, tarif, fasilitas, ulasan |
| SCR-14 | Mobile Alert | Dialog/peringatan jelas, tindakan dan alternatif |

## 7.3 Admin Back-Office

| ID | Layar | Kebutuhan utama |
|---|---|---|
| SCR-15 | Kelola Data Pantai | Tabel inventaris, filter audit, aksi verifikasi, ekspor |
| SCR-16 | Form Tambah/Edit | Drawer multi-tab untuk informasi, biaya, fasilitas, media |
| SCR-17 | Tab Foto — Kosong | Slot upload dan panduan SOP |
| SCR-18 | Tab Foto — Terisi | Thumbnail, status pemeriksaan, tombol terbitkan |
| SCR-19 | Notifikasi Penerbitan | Konfirmasi, salin URL, pratinjau |

**Referensi desain eksternal yang diberikan:** `web application/stitch/projects/15697151788032589852/screens/ec4bedf266de472fbc345848307a10aa`. Referensi tersebut diperlakukan sebagai sumber desain yang perlu dicocokkan secara visual saat implementasi; isi layar tidak diasumsikan lebih detail daripada spesifikasi yang tertulis di dokumen ini.

---

# 8. Design System — Coastal Discovery Terpadu

Bagian ini menggabungkan spesifikasi visual PRD v2.0 dengan aturan komponen pada `SKILL.md`.

## 8.1 Prinsip Visual

- Modern, bersih, editorial, dan berorientasi eksplorasi.
- Nuansa pesisir melalui foto, biru laut, dan elemen peta.
- Tidak terlalu ramai; hindari dekorasi yang tidak membantu tugas pengguna.
- Informasi penting mudah dipindai.
- Foto destinasi menjadi daya tarik, tetapi informasi tarif dan keselamatan tetap menonjol.
- Status selalu disertai teks, bukan warna saja.
- Konsisten antara halaman publik, mobile, dan dashboard admin.

## 8.2 Warna

PRD v2.0 menetapkan warna brand `#0284c7`, sedangkan `SKILL.md` sebelumnya memakai `#006194` sebagai primary. Agar tidak terjadi dua warna utama yang bersaing, rekomendasi konsolidasi:

| Token terpadu | Nilai | Peran |
|---|---|---|
| Brand primary | `#0284c7` | Aksi utama, link, elemen aktif |
| Primary deep / legacy primary | `#006194` | Hover/pressed, elemen yang membutuhkan biru lebih gelap; mempertahankan kompatibilitas desain lama |
| Primary container | `#007BB9` | Latar elemen primer sekunder |
| Secondary / deep navy | `#0f172a` | Teks utama kuat, navigasi gelap, fondasi kepercayaan |
| Cyan accent | `#06b6d4` | Aksen data laut/laguna |
| Background | `#F8F9FF` | Latar halaman |
| Surface white | `#FFFFFF` | Card dan panel |
| Surface low | `#EFF4FF` | Panel/filter/input |
| Surface container | `#E5EEFF` | Area sekunder |
| Text primary | `#0B1C30` | Teks utama |
| Text secondary | `#3F4850` | Teks pendukung |
| Border | `#BFC7D2` | Garis pemisah halus |
| Success | `#10b981` | Terverifikasi/berhasil |
| Warning | `#f59e0b` | Perlu perhatian |
| Danger | `#ef4444` | Kondisi kritis/error |
| Error legacy | `#BA1A1A` | Error teks jika diperlukan untuk kontras |

**Aturan:** `#0284c7` menjadi warna brand utama pada desain baru. `#006194` tidak dihapus, tetapi diposisikan sebagai warna primer gelap/kompatibilitas. Warna semantik tidak boleh digunakan hanya sebagai dekorasi.

## 8.3 Tipografi

Font utama: **Plus Jakarta Sans**.

| Peran | Ukuran | Line height | Weight |
|---|---:|---:|---:|
| Display desktop | 56 px | 64 px | 800 |
| Display mobile | 36 px | 44 px | 800 |
| Headline large | 36 px | 44 px | 700 |
| Headline mobile | 28 px | 36 px | 700 |
| Headline medium | 24 px | 32 px | 700 |
| Headline small | 20 px | 28 px | 600 |
| Title large | 18 px | 26 px | 600 |
| Title medium | 16 px | 24 px | 600 |
| Body large | 16 px | 26 px | 400 |
| Body medium | 14 px | 22 px | 400 |
| Body small | 12 px | 18 px | 400 |
| Label large | 14 px | 20 px | 600 |
| Label medium | 12 px | 16 px | 600 |
| Label small | 11 px | 14 px | 700 |

Judul menggunakan bobot tebal dan tracking sedikit rapat. Angka tarif, koordinat, dan metrik memakai bobot yang jelas serta format numerik konsisten.

## 8.4 Spasi dan Layout

Skala:
- XS: 4 px.
- SM: 8 px.
- MD: 16 px.
- LG: 24 px.
- XL: 40 px.
- Gutter: 24 px.
- Margin bagian: 32 px.

Lebar konten publik desktop maksimal sekitar 1280 px. Layout admin menggunakan sidebar referensi sekitar 288 px pada desktop. Pada mobile, sidebar menjadi drawer.

## 8.5 Radius, Border, dan Shadow

- Tombol/input: 8–12 px.
- Card/panel: 12–16 px.
- CTA besar: 24–32 px.
- Bottom sheet mobile: hingga 24 px pada sudut atas.
- Border tipis menggunakan warna outline-variant.
- Shadow lembut: `0 10px 30px -5px rgba(2, 132, 199, 0.08)`.
- Hindari shadow berat pada semua elemen.

## 8.6 Ikon dan Media

- Ikon: Material Symbols Outlined.
- Ikon harus konsisten dalam satu sistem.
- Gunakan ikon sesuai makna: `waves`, `water`, `beach_access`, `landscape`, `map`, `location_on`, `star`, `payments`, `verified`, `photo_library`, `cloud_upload`, `rate_review`, `notifications`, `search`, `tune`, dan `edit_note`.
- Foto pantai menggunakan crop konsisten dan alt text deskriptif.
- Foto tidak boleh dipakai tanpa hak penggunaan yang sesuai.

## 8.7 Pola Komponen Publik

### Header
Logo BeachFinder, navigasi Beranda/Jelajahi/Rekomendasi/Favorit/Peringatan, status data bila relevan, akun, dan menu mobile.

### Hero
Headline singkat, deskripsi, pencarian utama, CTA, dan foto/visual destinasi yang tidak mengganggu pencarian.

### Destination Card
Foto, nama, wilayah, rating bila tersedia, harga/status, atribut utama, tombol favorit, dan tautan detail.

### Filter
Search field, chip aktif, dropdown/checkbox, tombol reset, dan jumlah hasil.

### Tarif Card
Nominal, satuan, pihak pengelola, dasar informasi, freshness status, serta tautan/bukti jika publik.

### Alert Banner
Tingkat alert, lokasi, parameter, timestamp, sumber, dan instruksi. Jangan hanya mengandalkan warna.

### Map Bottom Sheet
Nama lokasi, ringkasan, tab informasi, tombol tutup/expand, dan CTA.

## 8.8 Pola Komponen Admin

### Sidebar dan Header
Sidebar desktop, navigasi terkelompok, item aktif, breadcrumb, notifikasi, profil admin, dan drawer navigation untuk mobile.

### KPI Cards
Label, ikon, angka, deskripsi, dan tautan menuju data terkait.

### Data Table
Header kontras lembut, hover, status badge, sorting, pagination, dan horizontal scroll pada layar kecil.

### Drawer Form
Header, tab/step, konten scroll, validasi inline, ringkasan kelengkapan, dan footer aksi tetap.

### Media Uploader
State kosong/terisi, progress, error, thumbnail, metadata, dan aksi ganti/hapus.

### Toast/Modal
Toast untuk feedback ringan; modal untuk konfirmasi atau peringatan; inline validation untuk kesalahan field.

## 8.9 State Wajib

Setiap komponen interaktif perlu mempertimbangkan:
- Default.
- Hover.
- Focus.
- Active/selected.
- Disabled.
- Loading.
- Empty.
- Error.
- Success.
- Offline atau data stale jika relevan.

## 8.10 Responsivitas

**Mobile (sekitar 390 px sebagai acuan):**
- Satu kolom.
- Navigasi desktop diganti menu.
- Filter ditumpuk atau dibuka melalui drawer.
- Tombol utama mudah dijangkau.
- Peta layar penuh dan bottom sheet.
- Tabel admin dapat discroll horizontal.
- Drawer form hampir memenuhi layar.

**Tablet:**
- Dua kolom bila ruang cukup.
- Panel peta/detail disusun ulang sesuai orientasi.
- Hindari teks dan kontrol terlalu rapat.

**Desktop (1440 px sebagai acuan):**
- Grid katalog.
- Sidebar admin.
- Split-view peta dan panel.
- Tabel dengan kolom penting.
- Konten dibatasi agar tidak terlalu melebar.

## 8.11 Aksesibilitas

- Gunakan HTML semantik.
- Semua input memiliki label.
- Ikon-only button memiliki accessible name.
- Fokus keyboard terlihat.
- Kontras teks memadai.
- Status tidak dibedakan berdasarkan warna saja.
- Foto memiliki alt text.
- Dialog mengelola fokus dan dapat ditutup dengan keyboard.
- Area sentuh nyaman.
- Hormati `prefers-reduced-motion`.

---

# 9. Model Data Konseptual

Model berikut adalah rancangan kebutuhan data, bukan klaim bahwa database sudah tersedia.

## 9.1 Entitas Beach

| Field | Tipe konseptual | Keterangan |
|---|---|---|
| beach_id | UUID/string | ID unik |
| name | string | Nama pantai |
| slug | string | URL ramah pengguna |
| province | string | Provinsi |
| regency | string | Kabupaten/kota |
| district | string/null | Kecamatan |
| village | string/null | Desa/kelurahan |
| description | text | Deskripsi |
| latitude | decimal | Lintang |
| longitude | decimal | Bujur |
| access_description | text | Deskripsi akses |
| road_surface | enum/string | Aspal, makadam, tanah, campuran, tidak diketahui |
| vehicle_access | array | Jenis kendaraan |
| beach_type | array | Karakteristik pantai |
| facilities | relation/array | Relasi fasilitas |
| cover_media_id | ID/null | Foto sampul |
| publication_status | enum | Draft, review, published, archived |
| completeness_score | number | Skor kelengkapan |
| created_at / updated_at | datetime | Waktu pembuatan/perubahan |
| created_by / updated_by | ID | Pengguna pengubah |

## 9.2 Entitas Tariff

| Field | Tipe konseptual | Keterangan |
|---|---|---|
| tariff_id | UUID/string | ID tarif |
| beach_id | relation | Pantai terkait |
| tariff_type | enum | Entrance, parking_r2, parking_r4, facility, other |
| amount | decimal/null | Nominal |
| currency | string | IDR |
| unit | string | Per orang, per kendaraan, per jam, per hari, dll. |
| owner_type | enum | Pemda, BUMDes/desa adat, usaha lokal terdaftar, belum diketahui |
| legal_basis | text/null | Dasar hukum/rujukan |
| document_uri | string/null | Lokasi dokumen |
| effective_from / effective_until | date/null | Masa berlaku |
| verified_at | datetime/null | Waktu verifikasi |
| verification_status | enum | Unverified, verified, needs_review, expired |
| verified_by | ID/null | Verifikator |
| notes | text/null | Catatan |

## 9.3 Entitas MarineObservation

- observation_id.
- beach_id atau station_id.
- source_name.
- source_reference.
- observed_at.
- received_at.
- wave_height_m.
- wave_period_s.
- wave_direction.
- wind_speed.
- wind_unit.
- wind_direction.
- tide_height_m (jika tersedia).
- tide_phase.
- data_type: observation/forecast/demo.
- quality_status.
- raw_payload_reference.

## 9.4 Entitas Alert

- alert_id.
- source.
- title.
- description.
- severity.
- affected_area.
- affected_beach_ids.
- trigger_parameter.
- trigger_value.
- issued_at.
- starts_at.
- expires_at.
- official_instruction.
- status: active/expired/cancelled.
- created_at.

## 9.5 Entitas Review

- review_id.
- beach_id.
- user_id.
- rating.
- review_text.
- category.
- visit_date (opsional).
- verification_type.
- moderation_status.
- created_at.
- moderated_by.
- moderated_at.

## 9.6 Entitas Complaint

- complaint_id.
- beach_id.
- tariff_id (opsional).
- reporter_id (opsional).
- reported_amount.
- displayed_amount.
- incident_location.
- incident_at.
- description.
- evidence_media_id.
- status.
- assigned_to.
- resolution_note.
- created_at / updated_at.

## 9.7 Entitas Media

- media_id.
- beach_id.
- file_uri.
- file_type.
- file_size.
- width/height.
- alt_text.
- caption.
- source/credit.
- license.
- upload_status.
- review_status.
- uploaded_by.
- created_at.

## 9.8 Entitas AuditLog

- log_id.
- actor_id.
- entity_type.
- entity_id.
- action.
- before_value.
- after_value.
- reason.
- timestamp.
- request_reference.

---

# 10. Aturan Bisnis dan Validasi

## 10.1 Validasi Data Pantai

- Nama pantai wajib diisi.
- Wilayah administratif wajib dipilih dari referensi yang konsisten.
- Koordinat harus berada dalam rentang lintang -90 sampai 90 dan bujur -180 sampai 180.
- Koordinat yang tidak diketahui tidak boleh diisi dengan titik perkiraan tanpa label.
- Slug harus unik.
- Data yang belum lengkap dapat disimpan sebagai draft.
- Data publik wajib memenuhi field publikasi yang ditentukan.

## 10.2 Validasi Tarif

- Tarif harus memiliki jenis, nominal atau status belum diketahui, satuan, pihak pengelola, dan tanggal verifikasi/status.
- Nominal negatif ditolak.
- Tarif gratis harus dinyatakan eksplisit sebagai Rp0 dan memiliki sumber/konfirmasi.
- Dasar hukum tidak boleh direkayasa.
- Masa berlaku tarif harus diperiksa.
- Perubahan tarif membuat versi baru atau histori, bukan menimpa tanpa jejak.

## 10.3 Validasi Media

- Periksa ekstensi dan MIME type.
- Terapkan batas ukuran file.
- Hindari file yang rusak.
- Simpan metadata lisensi/sumber.
- Alt text wajib untuk foto yang dipublikasikan.
- Status upload, scanning, review, dan publikasi harus dibedakan.

## 10.4 Validasi Data Maritim

- Validasi sumber, timestamp, lokasi/stasiun, unit, dan rentang nilai.
- Simpan payload sumber atau referensinya untuk audit.
- Data yang melewati batas umur tampil sebagai stale.
- Jangan menginterpolasi data yang hilang tanpa penjelasan.
- Alert hanya dibuat dari aturan yang telah disetujui.
- Perubahan konfigurasi ambang harus memiliki versi dan audit log.

## 10.5 Freshness Umum

Status freshness tarif menggunakan ambang 30/90 hari sesuai PRD sumber. Untuk data maritim, interval stale harus ditentukan berdasarkan SLA dan karakteristik feed, bukan otomatis memakai ambang tarif.

---

# 11. Kebutuhan Non-Fungsional

## 11.1 Performa
- Halaman utama dan katalog harus memprioritaskan konten inti.
- Gambar menggunakan ukuran responsif dan kompresi.
- Paginasi/filter tidak boleh memuat seluruh dataset sekaligus jika tidak diperlukan.
- Target performa teknis perlu diukur pada perangkat dan jaringan representatif.
- Loading state ditampilkan untuk operasi yang membutuhkan waktu.

## 11.2 Keamanan
- Autentikasi aman untuk admin.
- Role-based access control.
- Validasi server-side untuk seluruh input penting.
- Proteksi CSRF/XSS/SQL injection sesuai stack.
- Rate limiting untuk login, ulasan, dan laporan.
- File upload diperiksa sebelum dipublikasikan.
- Rahasia API tidak boleh ditanam pada frontend publik.
- Audit log untuk perubahan kritis.
- Backup dan prosedur pemulihan data.

## 11.3 Privasi
- Minta izin sebelum mengakses GPS.
- Jangan menampilkan koordinat rumah atau lokasi personal pengguna.
- Data pelapor tarif dibatasi kepada petugas yang berwenang.
- Jelaskan tujuan pengumpulan foto, lokasi, dan profil.
- Sediakan mekanisme penghapusan/penonaktifan akun sesuai kebijakan.
- Tetapkan masa retensi untuk bukti aduan dan log.

## 11.4 Ketersediaan dan Ketahanan
- Aplikasi harus menangani kegagalan API pihak ketiga.
- Halaman katalog dasar tetap dapat digunakan ketika feed maritim gagal.
- Data eksternal menampilkan timestamp dan status.
- Sediakan fallback untuk peta jika provider tidak tersedia.
- Backup database dan media secara berkala.

## 11.5 Skalabilitas
- Struktur data mendukung pertumbuhan jumlah destinasi.
- Pencarian dan filter menggunakan indeks yang sesuai.
- Media disimpan pada object storage/CDN jika diperlukan.
- Data maritim diproses secara terpisah dari transaksi katalog.

## 11.6 Kompatibilitas
- Mendukung browser modern pada desktop dan mobile.
- Desain responsif dengan breakpoint yang konsisten.
- Tidak bergantung pada hover untuk fungsi penting.
- Interaksi utama dapat digunakan melalui keyboard dan layar sentuh.

## 11.7 Observabilitas
- Catat error aplikasi dan integrasi.
- Pantau waktu respons API.
- Pantau kegagalan upload dan sinkronisasi.
- Pantau keterlambatan feed maritim.
- Jangan menyimpan data pribadi secara berlebihan di log.

---

# 12. Integrasi Eksternal

| Integrasi | Kegunaan | Status kebutuhan | Catatan |
|---|---|---|---|
| BMKG / sumber maritim resmi | Data gelombang, angin, peringatan | Perlu konfirmasi akses dan format | Jangan mengasumsikan API tersedia |
| Penyedia peta | Peta, geocoding, rute, marker | Perlu pemilihan provider | Perhatikan lisensi, atribusi, kuota, dan biaya |
| Google Maps/penyedia rating | Rating atau navigasi | Opsional dan tunduk ketentuan provider | Jangan scraping atau menyalin data tanpa izin |
| Object storage | Foto dan bukti laporan | Dibutuhkan untuk produksi | Perlu kebijakan retensi dan akses |
| Email/notification service | Notifikasi admin/pengguna | Should | Pilih provider dan template |
| Analytics | KPI dan perilaku pengguna | Should | Terapkan privasi dan minimisasi data |
| QRIS/e-retribusi | Pembayaran tiket | Roadmap fase 2 | Perlu kerja sama resmi dan rekonsiliasi |
| Webcam/IoT | Streaming dan telemetri | Roadmap fase 3 | Perlu infrastruktur dan persetujuan lokasi |
| Geofencing | Alert berbasis radius | Roadmap fase 4 | Memerlukan izin lokasi dan desain privasi |

---

# 13. Analitik Produk dan Event Tracking

Event awal yang disarankan:
- `home_viewed`
- `search_submitted`
- `filter_applied`
- `filter_cleared`
- `beach_card_opened`
- `beach_detail_viewed`
- `tariff_section_viewed`
- `tariff_report_started`
- `tariff_report_submitted`
- `recommendation_started`
- `recommendation_result_viewed`
- `beach_compared`
- `favorite_added`
- `favorite_removed`
- `map_opened`
- `alert_viewed`
- `review_submitted`
- `admin_beach_created`
- `admin_beach_updated`
- `tariff_verified`
- `beach_published`

Setiap event perlu memiliki:
- Timestamp.
- Anonymous/session ID atau user ID sesuai kebijakan.
- Beach ID jika relevan.
- Sumber halaman.
- Device category.
- Status berhasil/gagal.

Jangan mengirim teks laporan, bukti foto, atau informasi pribadi ke analytics umum.

---

# 14. Acceptance Criteria Tingkat Produk

Produk dapat dinyatakan siap untuk demo rilis awal jika:

1. Pengguna dapat mencari pantai dan membuka detailnya.
2. Katalog mendukung filter dan sorting yang dijanjikan.
3. Data tarif menampilkan nominal/satuan/status/sumber/tanggal verifikasi atau label belum tersedia.
4. Form aduan dapat dikirim dan muncul di antrean admin pada lingkungan yang terhubung.
5. Informasi maritim menunjukkan sumber dan waktu pembaruan; data demo diberi label DEMO.
6. Rekomendasi menghasilkan skor konsisten dengan bobot dan menjelaskan alasan.
7. Favorit dapat ditambahkan/dihapus dan state tetap konsisten.
8. Peta menampilkan marker yang berasal dari koordinat valid.
9. Admin dapat membuat dan mengedit destinasi.
10. Form multi-tab mempertahankan data saat tab berpindah.
11. Validasi field wajib dan unggah media berfungsi.
12. Admin dapat memeriksa tarif dan mencatat hasil verifikasi.
13. Penerbitan menghasilkan halaman publik hanya setelah proses berhasil.
14. Audit log mencatat perubahan penting.
15. Semua layar utama dapat digunakan pada mobile dan desktop.
16. Tidak ada tautan/tombol penting yang tidak berfungsi.
17. Tidak ada data simulasi yang disajikan sebagai data resmi/live.
18. Status aksesibilitas dasar, fokus keyboard, label form, dan alt text telah diperiksa.

---

# 15. Rencana Pengujian

## 15.1 Functional Testing
- Pencarian nama dan wilayah.
- Kombinasi filter.
- Sorting dan paginasi.
- Buka detail dan navigasi kembali.
- Tambah/hapus favorit.
- Perhitungan rekomendasi.
- Perbandingan destinasi.
- Pengiriman laporan.
- Pembuatan dan pengeditan data pantai.
- Validasi tarif.
- Upload dan penghapusan media.
- Penerbitan dan pengarsipan.
- Hak akses berdasarkan peran.

## 15.2 UI/UX Testing
- Konsistensi warna, tipografi, radius, dan spasi.
- Keterbacaan kartu dan tabel.
- Navigasi desktop/mobile.
- Drawer dan bottom sheet.
- Empty/loading/error/success state.
- Keterjangkauan tombol pada layar kecil.
- Perilaku ketika teks panjang atau data kosong.

## 15.3 Data Testing
- Koordinat invalid.
- Tarif kosong, nol, negatif, dan kedaluwarsa.
- Dokumen dasar hukum tidak tersedia.
- Data maritim stale atau tidak lengkap.
- Duplikasi pantai.
- Media dengan format/ukuran tidak sesuai.
- Data provinsi/kabupaten tidak konsisten.

## 15.4 Security and Privacy Testing
- Akses halaman admin tanpa login.
- Akses lintas wilayah tanpa izin.
- Percobaan unggah file berbahaya.
- Input XSS/SQL injection.
- Rate limiting.
- Akses bukti laporan.
- Persetujuan GPS dan penarikan izin.

## 15.5 UAT
UAT melibatkan perwakilan:
- Wisatawan keluarga.
- Peselancar/komunitas.
- Admin pengelola destinasi.
- Verifikator tarif.
- Moderator.

UAT menilai apakah pengguna dapat menyelesaikan tugas utama tanpa bantuan, apakah informasi dipahami, dan apakah status data dipercaya.

---

# 16. Roadmap Produk

## Fase 1 — Fondasi dan Public Beta
- Katalog destinasi.
- Detail pantai.
- Transparansi tarif.
- Favorit.
- Rekomendasi berbasis aturan.
- Dashboard dan pengelolaan data.
- Form multi-tab.
- Moderasi dasar.
- Peta dasar.
- Penyajian maritim sesuai ketersediaan data dan persetujuan integrasi.

## Fase 2 — Monetisasi dan E-Retribusi Resmi
- Integrasi QRIS/payment gateway resmi.
- Tiket prabayar.
- Bukti pembayaran.
- Rekonsiliasi transaksi.
- Dashboard transaksi bagi mitra.
- Mekanisme refund dan penanganan kegagalan pembayaran.

## Fase 3 — IoT dan Live Beach Camera
- Kamera pesisir dengan izin pengelola.
- Streaming live.
- Status perangkat.
- Penyimpanan snapshot jika diizinkan.
- Pemantauan privasi dan area yang tidak boleh direkam.
- Telemetri perangkat.

## Fase 4 — Peringatan Geofencing
- Opt-in lokasi.
- Radius geofence yang dapat dikonfigurasi.
- Notifikasi saat alert berlaku.
- Kontrol frekuensi dan quiet hours.
- Pengaturan privasi dan penonaktifan lokasi.
- Audit pemicu notifikasi.

---

# 17. Risiko, Dependensi, dan Mitigasi

| Risiko/dependensi | Dampak | Mitigasi |
|---|---|---|
| Data tarif tidak lengkap/tidak resmi | Informasi menyesatkan | Label status, bukti, tanggal verifikasi, proses audit |
| Perda atau dokumen tidak valid | Risiko hukum/reputasi | Verifikasi dokumen oleh pihak berwenang; jangan mengarang nomor regulasi |
| Akses data maritim terbatas | Panel tidak dapat live | Mode data tidak tersedia/demo; kerja sama dan validasi sumber |
| Salah interpretasi ambang gelombang | Risiko keselamatan | Validasi pakar/otoritas, disclaimer, tampilkan instruksi resmi |
| Koordinat pantai tidak akurat | Rute/marker salah | Validasi geospasial dan mekanisme koreksi |
| Foto melanggar hak cipta | Risiko hukum | Metadata sumber/lisensi dan moderasi |
| Ulasan palsu/fitnah | Risiko reputasi | Moderasi, pelaporan, jejak audit |
| Data pengguna/GPS bocor | Risiko privasi | Minimasi data, izin eksplisit, kontrol akses |
| Integrasi pihak ketiga gagal | Fitur terganggu | Fallback dan status integrasi |
| Dataset ganda/tidak konsisten | Hasil pencarian buruk | Deduplication, master data, audit impor |
| Perbedaan desain antara referensi | UI tidak konsisten | Design token terpadu dan review visual |
| Jadwal rilis pada dokumen lama | Perencanaan tidak akurat | Tetapkan ulang timeline dan milestone |

---

# 18. Keputusan Desain dan Klarifikasi yang Masih Dibutuhkan

Bagian ini sengaja dipertahankan sebagai daftar keputusan terbuka agar implementasi tidak mengarang detail yang belum dipastikan.

1. **Jumlah layar:** daftar berisi 19 entri walaupun ringkasan menyebut 18. Konfirmasi apakah ada dua state yang dihitung sebagai satu layar.
2. **Warna utama:** PRD v2.0 menggunakan `#0284c7`, sedangkan skill menggunakan `#006194`. Dokumen ini merekomendasikan `#0284c7` sebagai brand primary dan `#006194` sebagai primary deep/legacy.
3. **Data BMKG:** pastikan sumber, API/feed, lisensi, interval pembaruan, dan parameter yang benar-benar tersedia.
4. **Ambang keselamatan:** validasi rentang gelombang dan rekomendasi aktivitas dengan pihak kompeten sebelum rilis produksi.
5. **Bobot rekomendasi:** profil keluarga dan backpacker memerlukan dimensi eksplisit tambahan agar formula dan bobot lengkap.
6. **Dataset nasional:** pastikan jumlah record, sumber, deduplikasi, dan status validasi 348+ pantai.
7. **Rating pihak ketiga:** tentukan sumber yang diizinkan dan aturan atribusi.
8. **Akun pengguna:** putuskan apakah profil komunitas wajib login atau sebagian fitur dapat digunakan anonim.
9. **Verifikasi GPS:** tetapkan metode, izin, akurasi minimum, dan masa penyimpanan.
10. **Peran admin:** tentukan struktur wilayah, persetujuan, dan kewenangan final.
11. **Foto:** tentukan batas jumlah foto, storage, lisensi, dan kebijakan moderasi.
12. **Peta:** pilih provider, skema biaya, kuota, dan lisensi layer.
13. **Aduan:** tetapkan SLA penanganan, eskalasi, dan mekanisme komunikasi hasil.
14. **Jadwal:** target Q2 2026 pada dokumen sumber perlu diperbarui dengan jadwal implementasi aktual.

---

# 19. Glossary

| Istilah | Penjelasan |
|---|---|
| BeachFinder | Platform eksplorasi dan pengelolaan informasi pantai |
| Pokdarwis | Kelompok Sadar Wisata |
| Perda | Peraturan Daerah |
| R2 | Kategori parkir kendaraan roda dua |
| R4 | Kategori parkir kendaraan roda empat |
| Freshness | Kesegaran/kebaruan data berdasarkan waktu verifikasi atau pembaruan |
| Swell | Gelombang laut yang merambat dari area pembangkitnya |
| Groundswell | Swell dengan periode relatif panjang yang umumnya terbentuk jauh dari lokasi |
| Rip current | Arus kuat yang mengalir menjauhi pantai |
| High tide | Kondisi pasang tinggi |
| Low tide | Kondisi surut rendah |
| GIS | Geographic Information System |
| POI | Point of Interest atau titik lokasi penting |
| UAT | User Acceptance Testing |
| RBAC | Role-Based Access Control |
| Audit log | Catatan aktivitas dan perubahan sistem |

---

# 20. Instruksi Implementasi untuk Tim Desain dan Pengembangan

1. Gunakan PRD ini sebagai sumber kebutuhan produk dan `SKILL.md` sebagai pedoman visual/komponen.
2. Jangan membuat fitur terlihat aktif jika backend, API, atau sumber datanya belum tersedia.
3. Pisahkan data contoh/demo dari data produksi.
4. Gunakan token warna, tipografi, radius, spasi, ikon, dan pola komponen secara konsisten.
5. Pertahankan semua informasi penting: sumber data, status verifikasi, tanggal pembaruan, satuan tarif, dan batasan keselamatan.
6. Implementasikan semua state UI yang relevan.
7. Setiap aksi harus memiliki perilaku, validasi, dan feedback yang jelas.
8. Prioritaskan pengalaman mobile untuk pencarian, detail, alert, dan peta.
9. Pastikan hak akses admin ditegakkan di backend, bukan hanya dengan menyembunyikan menu.
10. Dokumentasikan keputusan yang belum tersedia dan jangan mengisi kekosongan dengan data faktual rekaan.

## 20.1 Definition of Done

Sebuah fitur dinyatakan selesai jika:
- Kebutuhan dan acceptance criteria terpenuhi.
- Desain sesuai Design System.
- Tampilan mobile dan desktop telah diuji.
- Loading, empty, error, success, dan disabled state tersedia sesuai kebutuhan.
- Validasi client dan server berjalan.
- Aksesibilitas dasar diperiksa.
- Hak akses dan keamanan diuji.
- Event analitik yang disepakati tersedia.
- Dokumentasi dan audit trail diperbarui.
- Tidak ada klaim integrasi atau data live yang belum terbukti.

---

**Akhir Dokumen — PRD BeachFinder Indonesia v2.1**
