"use strict";
// sesi login, proteksi halaman, dan logout.
const SESSION_KEY = "sittaUser";
function simpanSesi(user) {
    const dataSesi = {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
        lokasi: user.lokasi,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(dataSesi));
}
function ambilSesi() {
    try {
        return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
    }
    catch (e) {
        return null;
    }
}
// Panggil di halaman yang butuh login; kembali ke index.html jika belum login
function wajibLogin() {
    const user = ambilSesi();
    if (!user) {
        window.location.href = "index.html";
    }
    return user;
}
function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = "index.html";
}
