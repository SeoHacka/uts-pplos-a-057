# UTS PPLoS – Sistem Kepegawaian & Absensi
**Nama:** Raden Mas Said Baariq
**NIM:** 2410511057
**Kelas:** A

---

## 📌 Deskripsi Singkat
Sistem Kepegawaian & Absensi berbasis arsitektur service-oriented.  
Fitur utama:
- Manajemen pegawai (CRUD).
- Absensi (clock-in / clock-out).
- Pengajuan cuti dengan approval.
- Rekap kehadiran bulanan.
- Autentikasi JWT + GitHub OAuth.

---

## 🏗️ Arsitektur
- **Auth Service** → JWT + GitHub OAuth.  
- **Employee Service (PHP MVC)** → Laravel/CodeIgniter + MySQL (≥4 tabel).  
- **Attendance Service (Node.js)** → Clock-in/out, laporan bulanan.  
- **API Gateway (Node.js)** → Routing, JWT validation, rate limiting.  

Diagram arsitektur: lihat `docs/arsitektur.png`.

---

## 🚀 Cara Menjalankan
1. Clone repo:
   ```bash
   git clone https://github.com/<SeoHacka>/uts-pplos-a-057.git
   cd uts-pplos-a-057
2. Jalankan dengan Docker Compose:
   '''bash
   docker-compose up --build
4. Akses API melalui Gateway (port 3000).
