# Admin Guide - Ceremony Management System

## Overview
System ini memungkinkan Anda mengelola data Tuntunan & Mantram untuk upacara-upacara Hindu secara terstruktur.

## Struktur Data

### Hierarki
```
Ceremony (Upacara)
  └── Section (Bagian, opsional)
       └── Item (Langkah)
            └── Sub-Item (Sub-langkah, opsional)
```

### Contoh Struktur
```
Ceremony: "Purnama Kadasa"
  ├── Section: "Pembukaan"
  │    ├── Item 1: "Ngaturang Canang Sari"
  │    │    ├── Sub-item a: "Di sanggah utama"
  │    │    └── Sub-item b: "Di pelinggih keluarga"
  │    └── Item 2: "Mepandes"
  │         └── Mantram: "Om Swastyastu..."
  │
  └── Section: "Penutup"
       └── Item 1: "Parama Santih"
            └── Mantram: "Om Santih..."
```

## Cara Menggunakan Form

### 1. Membuat Tuntunan Baru
1. Masuk ke `/admin/tuntunan`
2. Klik tombol **"Buat Baru"**
3. Isi informasi dasar:
   - **Judul Upacara**: Nama lengkap upacara (contoh: "Purnama Kadasa")
   - **Slug**: URL-friendly identifier (otomatis dibuat dari judul)
   - **Jadwal**: Kapan upacara dilaksanakan (opsional)
   - **Sarana Banten**: Daftar perlengkapan yang dibutuhkan (opsional)
4. Tambahkan Section (jika diperlukan):
   - Klik **"Tambah Section"**
   - Isi judul section (opsional, contoh: "Pembukaan", "Inti", "Penutup")
5. Tambahkan Item (langkah-langkah):
   - Klik **"Tambah Langkah"**
   - Isi instruksi (wajib)
   - Isi mantram jika ada
6. Tambahkan Sub-Item jika diperlukan:
   - Klik **"Tambah Sub-langkah"**
   - Isi detail instruksi dan mantram
7. Toggle **Published/Draft**:
   - **Draft**: Hanya terlihat di admin
   - **Published**: Terlihat di halaman publik `/tuntunan`
8. Klik **"Simpan"**

### 2. Mengedit Tuntunan
1. Dari halaman `/admin/tuntunan`, klik tombol **"Edit"** pada baris data
2. Ubah data yang diperlukan
3. Klik **"Simpan"**

### 3. Menghapus Tuntunan
1. Dari halaman `/admin/tuntunan`, klik ikon **Trash** pada baris data
2. Konfirmasi penghapusan
3. Data akan terhapus permanen (termasuk semua section, item, dan sub-item)

### 4. Preview
- Klik ikon **Eye** untuk melihat tampilan publik sebelum di-publish

## Tips Best Practices

### Penamaan Slug
- Gunakan huruf kecil
- Pisahkan kata dengan tanda hubung (-)
- Contoh: `purnama-kadasa`, `tilem-kesanga`, `galungan-kuningan`

### Struktur Section
- Gunakan Section hanya jika upacara memiliki tahapan yang jelas
- Section bersifat opsional - bisa langsung ke Item
- Contoh Section yang baik: "Pembukaan", "Inti", "Penutup"

### Menulis Instruksi
- Gunakan kalimat singkat dan jelas
- Hindari instruksi yang terlalu panjang
- Contoh baik: "Ngaturang canang sari ring sanggah utama"
- Contoh kurang baik: "Silakan mengaturkan canang sari dengan hati yang khusyuk di depan sanggah utama sambil..."

### Menulis Mantram
- Tulis dengan format yang rapi
- Gunakan line break (Enter) untuk memisahkan baris
- Contoh:
  ```
  Om Swastyastu
  Om Ang Ah...
  Om Santih Santih Santih Om
  ```

### Sub-Items
- Gunakan Sub-items untuk detail pelaksanaan
- Contoh:
  - Item: "Mepamit ring Sanggah"
    - Sub-item a: "Ring Padmasana"
    - Sub-item b: "Ring Taksu"
    - Sub-item c: "Ring Pelinggih keluarga"

## Troubleshooting

### Slug sudah digunakan
Jika muncul error "slug already exists", ubah slug menjadi unik.

### Data tidak muncul di halaman publik
Pastikan status adalah **Published**, bukan Draft.

### Urutan langkah tidak sesuai
Urutan ditentukan berdasarkan posisi pembuatan. Untuk mengubah urutan, hapus dan buat ulang dengan urutan yang benar.

## Teknologi
- **Frontend**: Next.js 16 + React 19
- **Database**: Supabase (PostgreSQL)
- **UI**: shadcn/ui + Tailwind CSS
