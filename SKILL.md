---
name: beachfinder-ui-design
description: Panduan desain UI/UX BeachFinder berdasarkan implementasi HTML, Tailwind CSS, dan komponen antarmuka yang diberikan. Gunakan saat membuat, memperbaiki, atau mengembangkan halaman publik, dashboard admin, formulir destinasi, peta, galeri foto, dan komponen data BeachFinder.
---

# BeachFinder UI Design Skill

## 1. Tujuan dan karakter desain

Buat antarmuka BeachFinder sebagai platform eksplorasi pantai Indonesia sekaligus sistem pengelolaan data pesisir. Desain harus terasa:

- **Bersih dan modern:** tata letak rapi, ruang kosong cukup, hierarki informasi jelas.
- **Bernuansa pesisir:** identitas visual biru laut, ikon gelombang, pantai, peta, dan eksplorasi.
- **Terpercaya:** status verifikasi, sumber data, waktu pembaruan, dan informasi harga ditampilkan secara transparan.
- **Mudah dipindai:** angka penting, rating, harga, label status, dan aksi utama mudah ditemukan.
- **Responsif:** pengalaman tetap nyaman pada desktop, tablet, dan ponsel.

Jangan mengubahnya menjadi desain tropis yang terlalu ramai. Gunakan aksen visual secukupnya dan utamakan keterbacaan.

## 2. Teknologi dan pendekatan implementasi

Kode referensi menggunakan:
- HTML semantik.
- Tailwind CSS melalui CDN dengan konfigurasi tema khusus.
- Font **Plus Jakarta Sans**.
- **Material Symbols Outlined** untuk ikon.
- JavaScript untuk interaksi antarmuka seperti filter, tab, bookmark, modal, notifikasi, peta, dan unggah media.

Jika diminta menghasilkan kode, prioritaskan struktur HTML yang jelas, kelas Tailwind yang konsisten dengan token desain di bawah, serta JavaScript yang terpisah dan mudah dipahami. Jangan mengklaim fungsi backend, sinkronisasi data, GPS, atau API benar-benar berjalan jika kode hanya menampilkan simulasi frontend.

## 3. Sistem warna

Gunakan palet biru laut dan permukaan biru sangat muda sebagai dasar. Pertahankan kontras teks yang baik.

| Token | Nilai | Penggunaan |
|---|---|---|
| `primary` | `#006194` | Tombol utama, tautan aktif, ikon utama |
| `primary-container` | `#007BB9` | Hover atau aksen primer |
| `on-primary` | `#FFFFFF` | Teks di atas warna primer |
| `background` | `#F8F9FF` | Latar utama halaman |
| `surface` | `#F8F9FF` | Permukaan dasar |
| `surface-container-lowest` | `#FFFFFF` | Card dan panel utama |
| `surface-container-low` | `#EFF4FF` | Latar input, filter, panel lembut |
| `surface-container` | `#E5EEFF` | Panel sekunder dan kontrol |
| `surface-container-high` | `#DCE9FF` | Permukaan dengan penekanan lebih tinggi |
| `surface-container-highest` | `#D3E4FE` | Badge dan elemen penekanan |
| `on-surface` | `#0B1C30` | Teks utama |
| `on-surface-variant` | `#3F4850` | Teks sekunder |
| `outline` | `#707881` | Teks/garis dengan penekanan rendah |
| `outline-variant` | `#BFC7D2` | Border lembut |
| `secondary` | `#49607E` | Aksen sekunder |
| `secondary-container` | `#C4DCFF` | Badge dan kontrol sekunder |
| `tertiary` | `#825100` | Aksen harga/perhatian |
| `tertiary-fixed` | `#FFDBB8` | Latar status perhatian |
| `error` | `#BA1A1A` | Kesalahan dan peringatan kritis |
| `error-container` | `#FFDAD6` | Latar pesan error |

Aturan penggunaan:
1. Biru `primary` menjadi warna aksi utama, bukan warna untuk semua elemen.
2. Gunakan putih untuk card di atas latar biru pucat.
3. Gunakan warna tertiary untuk status yang perlu diperhatikan, misalnya harga yang harus dikonfirmasi.
4. Gunakan merah hanya untuk error atau peringatan penting.
5. Hindari menambahkan banyak warna aksen baru tanpa kebutuhan fungsional.
6. Jangan hanya mengandalkan warna untuk membedakan status; sertakan teks atau ikon.

## 4. Tipografi

Gunakan **Plus Jakarta Sans** untuk seluruh antarmuka.

| Peran | Ukuran | Line height | Weight |
|---|---:|---:|---:|
| Display | 56 px | 64 px | 800 |
| Display mobile | 36 px | 44 px | 800 |
| Headline large | 36 px | 44 px | 700 |
| Headline large mobile | 28 px | 36 px | 700 |
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

Pedoman:
- Judul halaman harus jelas dan tidak terlalu panjang.
- Label tabel dan metadata dapat menggunakan huruf kapital dengan tracking ringan.
- Angka KPI dan harga diberi bobot tebal agar cepat dipindai.
- Teks penjelas menggunakan warna sekunder, tetapi tetap terbaca.
- Jangan menggunakan terlalu banyak ukuran font dalam satu komponen.

## 5. Spasi, radius, border, dan elevasi

Gunakan skala spasi yang konsisten:
- `space-xs`: 4 px.
- `space-sm`: 8 px.
- `space-md`: 16 px.
- `space-lg`: 24 px.
- `space-xl`: 40 px.
- `gutter`: 24 px.
- `margin`: 32 px.

Aturan komponen:
- Input dan tombol: radius sekitar 8–12 px.
- Card dan panel: radius 12 px.
- Kartu besar/CTA publik: boleh menggunakan radius 2xl–3xl.
- Gunakan border `outline-variant` tipis pada elemen yang perlu batas.
- Gunakan shadow lembut untuk card, header, dan modal; hindari bayangan berat pada semua elemen.
- Gunakan jarak antarbagian untuk memisahkan kelompok informasi, bukan menambahkan banyak garis.

## 6. Ikon dan elemen visual

Gunakan **Material Symbols Outlined**. Pilih ikon sesuai makna, misalnya:
- `waves`, `water`: identitas laut.
- `beach_access`, `landscape`: destinasi pantai.
- `map`, `location_on`, `pin_drop`: lokasi dan peta.
- `star`, `hotel_class`: rating.
- `price_check`, `payments`, `price_change`: tiket dan harga.
- `verified`, `check_circle`: verifikasi.
- `photo_library`, `photo_camera`, `cloud_upload`: foto dan media.
- `rate_review`: ulasan.
- `notifications`: notifikasi.
- `search`, `tune`: pencarian dan filter.
- `edit_note`, `more_vert`: aksi data.

Jangan mencampur banyak gaya ikon. Gunakan ukuran ikon yang proporsional dengan teks dan kontrolnya.

## 7. Pola layout utama

### 7.1 Area publik

Gunakan header horizontal dengan:
- Logo BeachFinder dan identitas “Nusantara Coast”/“Indonesia”.
- Navigasi utama seperti Beranda, Jelajahi, Rekomendasi, Favorit, Telemetri & Peringatan BMKG, dan Admin Data jika sesuai hak akses.
- Indikator status telemetri bila relevan.
- Informasi akun pengguna.
- Tombol menu pada layar kecil.

Konten publik dapat menggunakan:
- Container terpusat dengan lebar maksimum sekitar 1280 px.
- Hero atau banner utama yang kuat tetapi tidak berlebihan.
- Kolom pencarian pantai dan filter wilayah/kategori.
- Chip rekomendasi wilayah.
- Grid kartu destinasi.
- Peta atau panel lokasi untuk informasi geografis.
- Bagian kepercayaan yang menampilkan statistik dan status kurasi.
- CTA eksplorasi dan footer berisi tautan bantuan/legal.

### 7.2 Dashboard admin

Gunakan pola dashboard dengan:
- Sidebar tetap di desktop, lebar referensi sekitar 288 px.
- Logo dan label “Admin Portal”.
- Kelompok navigasi: Dashboard Ringkasan, Kelola Data Pantai, Validasi & Harga, Moderasi Ulasan, Fasilitas & Wilayah, Pengaturan Log.
- Item aktif menggunakan latar `primary`, teks putih, radius besar, dan shadow ringan.
- Area kerja di kanan sidebar.
- Header atas yang tetap terlihat, berisi breadcrumb/konteks halaman, notifikasi, dan profil administrator.
- Konten utama menggunakan padding konsisten dan latar `background`.

Pada layar kecil, sidebar harus berubah menjadi drawer/menu yang dapat dibuka, bukan memaksa lebar desktop.

### 7.3 Header halaman dan breadcrumb

Di bagian awal halaman:
1. Tampilkan breadcrumb yang menunjukkan lokasi halaman.
2. Tampilkan judul halaman.
3. Tambahkan deskripsi singkat tentang tujuan halaman.
4. Letakkan status versi/sinkronisasi sebagai badge jika relevan.
5. Tempatkan aksi utama di sisi kanan pada desktop dan susun ulang secara vertikal pada mobile.

## 8. Komponen inti dan aturan desainnya

### 8.1 KPI cards

Gunakan grid kartu ringkasan untuk metrik utama. Contoh kategori:
- Total pantai terdata.
- GPS dan ulasan valid.
- Rating unggulan.
- Harga tiket yang perlu dikonfirmasi.
- Jumlah provinsi atau sumber dataset.

Setiap kartu memiliki:
- Label kecil.
- Ikon dalam kotak latar lembut.
- Angka utama berukuran besar.
- Keterangan singkat atau badge pembanding.

Gunakan 1–5 kolom sesuai lebar layar. Jangan memadatkan kartu hingga angka dan label sulit dibaca.

### 8.2 Search dan filter

- Search field memiliki ikon pencarian di sisi kiri.
- Placeholder menjelaskan data yang bisa dicari, misalnya nama pantai, kota, kabupaten, atau ID.
- Filter dapat mencakup wilayah/provinsi, status data, status harga, visibilitas, kategori, dan rating sesuai konteks.
- Filter cepat menggunakan chip atau segmented tabs.
- Kondisi aktif harus terlihat jelas.
- Sediakan cara menghapus filter dan tampilkan jumlah hasil jika fungsi tersebut tersedia.
- Pada mobile, filter dapat ditumpuk atau dibuka melalui panel khusus.

### 8.3 Tabel data admin

Tabel digunakan untuk data yang membutuhkan pembandingan dan pengelolaan. Contoh kolom:
- Identitas pantai dan wilayah.
- Rating dan ulasan.
- Koordinat GPS.
- Fitur/fasilitas dominan.
- Tarif dan status.
- Pembaruan dan sumber data.
- Kelengkapan.
- Aksi.

Pedoman:
- Header tabel menggunakan latar `surface-container-low`.
- Isi tabel menggunakan teks utama dan metadata sekunder.
- Baris memiliki hover lembut.
- Harga dan angka penting dibuat tegas.
- Rating dapat disertai ikon bintang.
- Status menggunakan badge yang konsisten.
- Aksi berupa ikon dengan tooltip atau label aksesibel.
- Bungkus tabel dengan area `overflow-x-auto` pada layar sempit; jangan memotong isi penting.

### 8.4 Badge status

Gunakan badge berbentuk pill dengan teks ringkas. Contoh:
- Terverifikasi / Lengkap: nuansa biru primer.
- Perlu konfirmasi / pembaruan: nuansa tertiary.
- Nonaktif / Draft: warna netral.
- Urgent / Error: merah.
- Live Sync: biru primer dengan indikator titik bila diperlukan.

Badge harus menyebut status secara tekstual dan tidak hanya berupa titik warna.

### 8.5 Formulir tambah/edit pantai

Gunakan drawer atau modal lebar yang memiliki:
- Header dengan judul, deskripsi singkat, status, dan tombol tutup.
- Navigasi tab/step yang jelas.
- Area konten yang dapat discroll.
- Footer aksi yang mudah ditemukan.

Kelompok tab yang tampak pada kode:
1. Informasi Utama & Lokasi.
2. Harga Tiket & Status.
3. Fasilitas & Karakteristik.
4. Foto & Media.

Prinsip formulir:
- Kelompokkan field berdasarkan topik.
- Label berada di atas input.
- Tampilkan petunjuk format di dekat field.
- Tandai field wajib dengan jelas.
- Berikan validasi dekat field terkait.
- Pertahankan data yang telah diisi saat berpindah tab.
- Berikan ringkasan kelengkapan dan status publikasi.
- Bedakan status draft, perlu pemeriksaan, dan siap diterbitkan.

### 8.6 Foto dan media

Area media perlu mendukung tampilan kosong dan tampilan terisi.

Tampilan kosong:
- Slot foto sampul utama/hero diberi label wajib.
- Slot foto tambahan diberi label sesuai jenis atau urutan.
- Gunakan kotak bergaris putus-putus dengan ikon upload.
- Tampilkan rasio dan resolusi yang direkomendasikan.
- Berikan tombol tambah foto.

Tampilan terisi:
- Tampilkan thumbnail foto.
- Tampilkan jumlah foto yang telah diunggah dan kuota tersisa.
- Sertakan status verifikasi atau kesiapan publikasi.
- Sediakan aksi untuk mengganti, menghapus, atau mengatur foto utama bila memang didukung.
- Tampilkan format yang diterima dan batas ukuran file.

Ketentuan yang tampak dalam kode:
- Format JPG, PNG, dan WEBP.
- Maksimum 5 MB per foto.
- Rasio lanskap 16:9 direkomendasikan.
- Foto orisinal; hindari foto buram, watermark berlebihan, atau materi komersial agresif.
- Foto sampul direkomendasikan minimal 1920 × 1080 px.

Jangan menyatakan file sudah terunggah atau diverifikasi sebelum ada hasil proses yang nyata.

### 8.7 Peta dan lokasi

Untuk informasi lokasi:
- Tampilkan peta/preview lokasi dalam panel yang memiliki radius lembut.
- Sertakan nama wilayah atau zona.
- Tampilkan koordinat lintang dan bujur dalam format yang mudah dibaca.
- Tampilkan akurasi GPS atau status pemetaan hanya jika datanya tersedia.
- Gunakan marker/POI dengan ikon yang sesuai.
- Jika marker dapat dipilih, tampilkan detail POI dalam popover/modal yang ringkas.
- Sediakan aksi navigasi atau buka peta bila tautannya tersedia.

### 8.8 Notifikasi dan feedback

Gunakan:
- Toast untuk hasil tindakan seperti berhasil menyimpan atau menerbitkan.
- Modal untuk tindakan yang membutuhkan perhatian atau konfirmasi.
- Inline validation untuk kesalahan input.
- Badge untuk status yang menetap.
- Banner merah hanya untuk peringatan kritis.

Notifikasi harus menyebut tindakan dan hasil secara jelas. Sediakan tombol tutup jika sesuai. Jangan menampilkan pesan “berhasil” untuk tindakan yang belum benar-benar berhasil.

### 8.9 Kartu destinasi publik

Kartu pantai dapat memuat:
- Foto destinasi dengan crop konsisten.
- Nama pantai.
- Kabupaten/provinsi.
- Rating dan jumlah ulasan jika tersedia.
- Harga tiket atau keterangan gratis/perlu konfirmasi.
- Label kategori/fitur.
- Tombol favorit atau detail.

Gunakan foto sebagai daya tarik utama, tetapi jangan menumpuk terlalu banyak badge di atas gambar. Pertahankan judul dan metadata tetap terbaca.

### 8.10 Favorit, ulasan, dan interaksi

- Tombol bookmark/favorit harus memiliki state aktif dan tidak aktif yang mudah dibedakan.
- Filter ulasan menggunakan chip kategori.
- Sorting dapat menggunakan dropdown.
- Tombol bagikan dapat menggunakan Web Share API jika tersedia dan fallback yang jelas.
- Modal ulasan harus memiliki label field, tombol batal, dan tombol kirim.
- Berikan feedback visual setelah tindakan berhasil.

## 9. Responsivitas

Gunakan pendekatan mobile-first.

- **Mobile:** satu kolom; navigasi desktop disembunyikan dan diganti menu; filter ditumpuk; tombol aksi dibuat mudah disentuh; tabel dapat discroll horizontal; modal/drawer menggunakan hampir seluruh lebar layar.
- **Tablet:** gunakan dua kolom untuk kartu atau filter jika cukup ruang; pertahankan jarak yang nyaman.
- **Desktop:** gunakan sidebar admin, header tetap, grid KPI, dan layout dua kolom bila sesuai.
- **Layar sangat lebar:** batasi lebar konten agar baris teks tidak terlalu panjang.

Breakpoint Tailwind yang dapat dipakai mengikuti pola kode: `sm`, `md`, `lg`, `xl`. Jangan mengandalkan breakpoint saja; pastikan komponen benar-benar menyesuaikan susunan dan lebar.

## 10. Interaksi dan state

Semua elemen yang tampak interaktif harus memiliki perilaku yang jelas:
- Navigasi aktif.
- Filter dan pencarian memperbarui daftar.
- Tab mengganti panel konten.
- Tombol tambah membuka form.
- Modal dapat ditutup.
- Tombol favorit mengubah state.
- Sorting mengurutkan hasil.
- Tombol upload membuka pemilih file.
- Toast muncul setelah hasil tindakan.
- Peta dan POI merespons pilihan pengguna jika interaksi tersebut disediakan.

Pastikan:
1. Tombol memiliki `type` yang sesuai.
2. Form memiliki label yang terhubung ke input.
3. Elemen interaktif dapat digunakan dengan keyboard.
4. Fokus terlihat.
5. Status loading, kosong, error, dan sukses dipikirkan.
6. Jangan membuat kontrol dekoratif yang terlihat dapat diklik tetapi tidak melakukan apa-apa.
7. Jangan membuat klaim sinkronisasi realtime, data BMKG, atau integrasi eksternal tanpa integrasi sungguhan.

## 11. Aksesibilitas dan kualitas

- Gunakan elemen HTML semantik (`header`, `nav`, `main`, `section`, `aside`, `footer`, `table`, `form`).
- Berikan `aria-label` untuk kontrol ikon tanpa teks.
- Gunakan `alt` deskriptif untuk foto destinasi.
- Pastikan kontras teks dan latar memadai.
- Jangan menggunakan warna sebagai satu-satunya penanda status.
- Berikan label dan pesan validasi yang jelas.
- Gunakan ukuran area klik yang nyaman untuk sentuhan.
- Hindari animasi berlebihan; animasi hanya membantu memahami perubahan state.
- Hormati preferensi `prefers-reduced-motion`.

## 12. Gaya penulisan antarmuka

Gunakan bahasa Indonesia yang ringkas, ramah, dan informatif. Contoh label:
- “Kelola Data Pantai”
- “Validasi & Harga”
- “Tambah Pantai Baru”
- “Perlu Konfirmasi”
- “Data Belum Lengkap”
- “Siap Diterbitkan”
- “Cari nama pantai, kota, kabupaten, atau ID”

Hindari istilah teknis yang tidak perlu bagi pengguna umum. Untuk admin, istilah teknis seperti koordinat GPS, sinkronisasi dataset, dan validasi CSV boleh digunakan bila relevan.

## 13. Aturan konsistensi saat membuat halaman baru

Sebelum membuat halaman:
1. Tentukan apakah halaman untuk pengguna publik atau administrator.
2. Tentukan satu tujuan utama halaman.
3. Pilih pola layout yang sesuai dari bagian 7.
4. Gunakan token warna, tipografi, spasi, radius, dan ikon dari skill ini.
5. Susun informasi dari yang paling penting ke detail.
6. Tentukan state normal, hover, active, disabled, loading, empty, error, dan success yang relevan.
7. Pastikan desain responsif dan aksesibel.
8. Pastikan semua aksi memiliki fungsi yang benar.

Saat merevisi:
- Pertahankan identitas BeachFinder dan pola komponen yang sudah ada.
- Jangan mengganti seluruh palet atau tipografi tanpa alasan.
- Jangan menghapus informasi penting seperti status verifikasi, sumber, harga, koordinat, atau pembaruan data.
- Perbaiki hierarki, jarak, keterbacaan, dan konsistensi tanpa membuat halaman semakin ramai.

## 14. Checklist hasil akhir

- [ ] Identitas visual BeachFinder konsisten.
- [ ] Font Plus Jakarta Sans digunakan.
- [ ] Warna mengikuti palet biru dan surface yang ditentukan.
- [ ] Hierarki judul, angka, label, dan isi jelas.
- [ ] Spasi dan radius konsisten.
- [ ] Komponen sesuai konteks publik/admin.
- [ ] Status dan badge memiliki label teks.
- [ ] Pencarian, filter, tab, tombol, dan modal berfungsi.
- [ ] Form memiliki label dan validasi.
- [ ] Foto memiliki rasio/crop dan alt text yang sesuai.
- [ ] Layout nyaman pada mobile, tablet, dan desktop.
- [ ] Tidak ada klaim data/API/sinkronisasi yang belum diimplementasikan.
- [ ] Tidak ada tombol atau kontrol yang hanya menjadi hiasan.

## 15. Instruksi singkat untuk AI

Saat menerima tugas desain BeachFinder, bertindaklah sebagai UI/UX designer sekaligus frontend engineer. Ikuti sistem desain dalam file ini sebagai acuan utama. Hasilkan antarmuka yang bersih, modern, responsif, mudah digunakan, dan konsisten dengan identitas BeachFinder. Gunakan komponen yang sesuai dengan konteks halaman, pertahankan informasi penting, dan pastikan setiap interaksi yang ditampilkan benar-benar memiliki perilaku yang jelas. Jika detail belum tersedia, gunakan placeholder yang eksplisit daripada mengarang data faktual.
