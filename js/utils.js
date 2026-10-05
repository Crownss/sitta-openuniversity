"use strict";
function ambilEl(id) {
    const el = document.getElementById(id);
    if (!el) {
        throw new Error('Elemen dengan id "' + id + '" tidak ditemukan');
    }
    return el;
}
function escapeHtml(teks) {
    const div = document.createElement("div");
    div.textContent = teks == null ? "" : String(teks);
    return div.innerHTML;
}
function kategoriStok(stok) {
    if (stok >= 300)
        return { label: "Aman", kelas: "badge-success" };
    if (stok >= 200)
        return { label: "Menipis", kelas: "badge-warning" };
    return { label: "Kritis", kelas: "badge-danger" };
}
function badge(label, kelas) {
    return '<span class="badge ' + kelas + '">' + escapeHtml(label) + "</span>";
}
function tahapPengiriman(data) {
    const terakhir = data.perjalanan[data.perjalanan.length - 1];
    if (terakhir && terakhir.keterangan.toLowerCase().indexOf("selesai") === 0)
        return 3;
    if (data.status.toLowerCase().indexOf("perjalanan") !== -1)
        return 2;
    return 1;
}
function footerLogin() {
    const login = ambilSesi();
    const sekarang = new Date().getFullYear();
    const val = login
        ? `&copy; ${sekarang} Universitas Terbuka | SITTA`
        : `&copy; ${sekarang} Universitas Terbuka`;
    const footer = document.getElementById("footer");
    if (footer) {
        footer.innerHTML = val;
    }
}
footerLogin();
function angka(n) {
    return n.toLocaleString("id-ID");
}
function kelompokkan(fnKunci) {
    const hasil = {};
    dataBahanAjar.forEach((item) => {
        const kunci = fnKunci(item);
        if (!hasil[kunci])
            hasil[kunci] = { judul: 0, stok: 0 };
        hasil[kunci].judul++;
        hasil[kunci].stok += item.stok;
    });
    return hasil;
}
function statusStok(stok) {
    const k = kategoriStok(stok);
    return badge(k.label, k.kelas);
}
// kumpulan constanta global
const KELAS_STATUS = {
    Aman: "badge-success",
    Menipis: "badge-warning",
    Kritis: "badge-danger",
};
const COVER_DEFAULT = "assets/logo_sitta.svg";
const LABEL_TAHAP = ["", "Dikirim", "Dalam Perjalanan", "Selesai"];
const KELAS_TAHAP = ["", "badge-info", "badge-warning", "badge-success"];
