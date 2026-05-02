# UTS Pengembangan Perangkat Lunak Berbasis Layanan (A)
**Nama:** Raden Mas Said Baariq
**NIM:** 2210511057 (Studi Kasus 7: Kepegawaian & Absensi)

---

## 🔗 Link Penting
- **Demo Video (YouTube):** https://youtu.be/FcybzOmB-tA
- **Repository:** https://github.com/SeoHacka/uts-pplos-a-057

---

## 🏗️ Arsitektur Sistem
Sistem ini menggunakan **Service-Oriented Architecture (SOA)** yang terdiri dari:
1. **API Gateway (Node.js):** Port 3000 - Entry point tunggal untuk konsolidasi service.
2. **Auth Service (Node.js):** Port 4000 - Menangani JWT Login & OAuth GitHub.
3. **Employee Service (Laravel 11):** Port 8000 - CRUD Pegawai dengan Pagination & Filtering.
4. **Attendance Service (Node.js):** Port 5000 - Pencatatan kehadiran real-time.

## 🛠️ Cara Menjalankan Project
1. Clone repository ini.
2. Jalankan `npm install` di folder gateway, auth, dan attendance.
3. Jalankan `composer install` & `php artisan migrate` di folder employee-service.
4. Jalankan masing-masing service di terminal terpisah.

## 📂 Dokumentasi
- Screenshot Postman tersedia di folder `/postman`.
- Diagram arsitektur tersedia di folder `/docs`.