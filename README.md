# UTS PPLoS – Sistem Kepegawaian & Absensi
**Nama:** Raden  
**NIM:** 2110511057  
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
   git clone https://github.com/<username>/uts-pplos-a-057.git
   cd uts-pplos-a-057
