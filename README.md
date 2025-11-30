Deskripsi Aplikasi
Web Himpunan Mahasiswa Informatika (HIMIN) adalah aplikasi web yang dirancang untuk memfasilitasi komunikasi, informasi dan kegiatan mahasiswa informatika. Aplikasi ini menyajikan portal berita yang dinamis dan terkini, sehingga mahasiswa bisa mengakses berbagai informasi penting seperti event, artikel perkembangan teknologi dan lainnya dengan cepat dan fleksibel. Selain itu aplikasi ini juga memudahkan orgnasasi dalam mengelola anggotanya.

Tujuan
Menyediakan informasi terkini tentang HIMIN
Memudahkan pengelolaan anggota dan kegiatan bagi para pengurus himpunan

Teknologi yang digunakan 
 Back End :
•	Node js
•	Express js
•	Passport.js
  Front End :
•	HTML5, CSS3, dan Javascript
•	EJS (Template engine untuk render tampilan)
  Database :
•	MYSQL
  Tools & library pendukung :
•	Bycrpt 
•	Express-session 
•	Multer
•	Mysql2
•	Passport-local

Instalasi dan Setup 

Sebelum memulai proses instalasi, pastikan perangkat Anda terhubung ke jaringan internet dan Node.js sudah terpasang.
1.	Clone Repository
git clone https://github.com/Fauzank216/organisasi-app
cd organisasi-app
Instal Dependencies:
npm install di folder organisasi-app/
2.	Setup Environment (.env)
Buat file .env di root project lalu isi konfigurasi berikut :
PORT=3000
DB_USER=root
DB_PASSWORD=
DB_NAME=nama_database
SESSION_SECRET=secret_key
3.	Setup database 
1.	Buka phpMyAdmin atau MYSQL Client
2.	Buat Database baru dengan nama : 
organisasi
3.	Import file sql :
schema.sql
     5. Menjalakan Aplikasi 
          Jalankan server diterminal, dengan mengetikan : 
	node app.js
          Lalu buka di browser 
	http://localhost:3000/page/guest
