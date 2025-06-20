# 📱 Mobil Blog Uygulaması – React Native + PHP + MySQL

Bu proje, kullanıcıların blog gönderileri oluşturabildiği, bu gönderilere görsel ekleyebildiği, yorum yapabildiği ve beğeni bırakabildiği bir sosyal içerik mobil uygulamasıdır. Uygulama, **React Native (Expo Router)** ile geliştirilen bir mobil arayüz, **PHP tabanlı REST API**, ve **MySQL** veritabanı ile entegre şekilde çalışmaktadır.

---

## 🚀 Özellikler

- ✅ Kullanıcı kayıt ve giriş sistemi
- 📝 Post oluşturma ve listeleme
- 🖼️ Resim yükleme ve görsel önizleme
- 💬 Postlara yorum yapma
- ❤️ Beğeni sistemi (Like / Unlike)
- 🔍 Başlığa göre post arama
- 👤 Profil görüntüleme ve güncelleme
- 🖼️ Profil fotoğrafı değiştirme
- ⚙️ Tamamen XAMPP + IP üzerinden çalışan yerel sunucu mimarisi

---

## ⚙️ Kurulum Talimatları

### 1. Gerekli Araçlar

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [XAMPP](https://www.apachefriends.org/index.html)
- Gerçek Android cihaz veya Android Emulator



### 2. XAMPP + Sanal IP Ayarı (VirtualHost)

#### 📂 Projeyi `htdocs` klasörüne at:

C:/xampp/htdocs/blogapi
✏️ httpd-vhosts.conf dosyasını düzenle:
C:/xampp/apache/conf/extra/httpd-vhosts.conf dosyasının sonuna şunu ekle:


<VirtualHost *:80>
    ServerName 10.116.35.35
    DocumentRoot "C:/xampp/htdocs/blogapi"
    <Directory "C:/xampp/htdocs/blogapi">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

Not: 10.116.35.35 → Bilgisayarınızın yerel IP adresidir.
ipconfig komutuyla öğrenebilirsiniz.

🔁 Apache'yi yeniden başlat:
XAMPP kontrol panelinden Apache’yi Stop > Start yapın.

3. Veritabanı Kurulumu (phpMyAdmin)
http://localhost/phpmyadmin adresine gidin

blogapp adında yeni veritabanı oluşturun

database/blogapp.sql dosyasını içe aktarın (Import sekmesi)
