const firebaseConfig = {
  apiKey: "AIzaSyC1jVtXaNijyE_TG7XOqldq-VQ4RV3wog8",
  authDomain: "web-tik-kelas4.firebaseapp.com",
  projectId: "web-tik-kelas4",
  storageBucket: "web-tik-kelas4.firebasestorage.app",
  messagingSenderId: "422172287452",
  appId: "1:422172287452:web:8041bae170c5470ea0af19"
};

// Jangan lupa ganti juga URL Web App Google Apps Script milikmu di bawah ini:
const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyHenRr7NjwffYFZgmLNbeKejpO2dXPO7tHxWxOvrN2sfImB42EGYJiR1x_zNB8RUBxtg/exec";

// Inisialisasi Firebase (Versi Compat)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Data Awal 6 Bab TIK Kelas 4 (Sesuai Gambar Kurikulum)[cite: 1]
const DEFAULT_BAB = [
  {
    id: "bab1",
    nomor: 1,
    judul: "Komputer & Manajemen File/Folder",
    cp: "Mengenal kembali penggunaan komputer, pengelolaan file dan folder sebagai dasar berkarya digital[cite: 1].",
    ringkasan: "Komputer membantu kita berkarya setiap hari. Agar karya tidak hilang, kita menyimpannya di dalam File dan mengelompokkannya ke dalam Folder seperti laci lemari yang rapi.",
    pdfs: []
  },
  {
    id: "bab2",
    nomor: 2,
    judul: "Dokumen Rapi di Microsoft Word",
    cp: "Menggunakan Microsoft Word untuk membuat dokumen sederhana yang rapi dan komunikatif[cite: 1].",
    ringkasan: "Di Microsoft Word, kita bisa mengatur jenis huruf (Font), perataan Paragraf, serta membuat daftar berurutan dengan Bullet dan Numbering.",
    pdfs: []
  },
  {
    id: "bab3",
    nomor: 3,
    judul: "Memperkaya Dokumen Word",
    cp: "Menggunakan fitur Word untuk memperkaya isi dokumen[cite: 1].",
    ringkasan: "Dokumen akan terlihat lebih menarik jika ditambahkan gambar (Picture), bentuk (Shapes), tulisan hias (WordArt), serta catatan atas dan bawah (Header/Footer).",
    pdfs: []
  },
  {
    id: "bab4",
    nomor: 4,
    judul: "Tabel & Pengumpulan Data",
    cp: "Mengumpulkan dan menyusun informasi ke dalam tabel sederhana menggunakan Microsoft Word[cite: 1].",
    ringkasan: "Tabel terdiri dari baris (mendatar) dan kolom (menurun). Tabel memudahkan kita merapikan data seperti jadwal piket atau daftar nilai teman.",
    pdfs: []
  },
  {
    id: "bab5",
    nomor: 5,
    judul: "Berpikir Komputasional & Algoritma",
    cp: "Menyelesaikan tugas digital secara runtut menggunakan dekomposisi, pengenalan pola, abstraksi, dan algoritma membuat dokumen[cite: 1].",
    ringkasan: "Berpikir komputasional membantu kita memecah masalah besar menjadi langkah-langkah kecil yang urut (Algoritma) saat menyusun dokumen.",
    pdfs: []
  },
  {
    id: "bab6",
    nomor: 6,
    judul: "Mengenal Kecerdasan Artifisial (AI)",
    cp: "Menjelaskan konsep dasar kecerdasan artifisial, manfaat, keterbatasan, serta etika penggunaan AI dalam kehidupan sehari-hari[cite: 1].",
    ringkasan: "Kecerdasan Artifisial (AI) adalah program komputer yang dilatih meniru cara berpikir manusia. Kita harus menggunakannya secara jujur, aman, dan bertanggung jawab.",
    pdfs: []
  }
];

// Data Awal Kisi-Kisi (Sesuai Tabel Lampiran)[cite: 1]
const DEFAULT_KISIKISI = [
  { no: 1, tujuan: "Mengenal kembali penggunaan komputer, pengelolaan file dan folder sebagai dasar berkarya digital[cite: 1].", materi: "Review komputer, manajemen file, folder[cite: 1]", elemen: "LD[cite: 1]" },
  { no: 2, tujuan: "Menggunakan Microsoft Word untuk membuat dokumen sederhana yang rapi dan komunikatif[cite: 1].", materi: "Font, paragraf, bullet, numbering[cite: 1]", elemen: "LD[cite: 1]" },
  { no: 3, tujuan: "Menggunakan fitur Word untuk memperkaya isi dokumen[cite: 1].", materi: "Picture, Shapes, WordArt, Header/Footer[cite: 1]", elemen: "LD[cite: 1]" },
  { no: 4, tujuan: "Mengumpulkan dan menyusun informasi ke dalam tabel sederhana menggunakan Microsoft Word[cite: 1].", materi: "Tabel Word, pengumpulan data[cite: 1]", elemen: "AD + LD[cite: 1]" },
  { no: 5, tujuan: "Menyelesaikan tugas digital secara runtut menggunakan konsep dekomposisi, pengenalan pola, abstraksi, dan algoritma sederhana[cite: 1].", materi: "Berpikir Komputasional[cite: 1]", elemen: "BK[cite: 1]" },
  { no: 6, tujuan: "Menyusun langkah kerja pembuatan dokumen secara logis dan sistematis[cite: 1].", materi: "Algoritma membuat dokumen[cite: 1]", elemen: "AP[cite: 1]" },
  { no: 7, tujuan: "Menjelaskan konsep dasar kecerdasan artifisial, manfaat, keterbatasan, serta etika penggunaan AI dalam kehidupan sehari-hari[cite: 1].", materi: "Konsep AI, Etika AI[cite: 1]", elemen: "LEKA[cite: 1]" }
];
