"use strict";
(() => {
    wajibLogin();
    const totalStok = dataBahanAjar.reduce((n, item) => n + item.stok, 0);
    const lokasi = Object.keys(kelompokkan((item) => item.kodeLokasi));
    ambilEl("rekapJudul").textContent = String(dataBahanAjar.length);
    ambilEl("rekapStok").textContent = angka(totalStok);
    ambilEl("rekapRata").textContent = dataBahanAjar.length
        ? angka(Math.round(totalStok / dataBahanAjar.length))
        : "0";
    ambilEl("rekapLokasi").textContent = String(lokasi.length);
    const perJenis = kelompokkan((item) => item.jenisBarang);
    ambilEl("tabelJenis").innerHTML = Object.keys(perJenis)
        .map((jenis) => "<tr><td>" +
        escapeHtml(jenis) +
        "</td>" +
        "<td>" +
        perJenis[jenis].judul +
        "</td>" +
        '<td class="num">' +
        angka(perJenis[jenis].stok) +
        "</td></tr>")
        .join("");
    const perStatus = kelompokkan((item) => kategoriStok(item.stok).label);
    ambilEl("tabelStatus").innerHTML = Object.keys(KELAS_STATUS)
        .map((label) => {
        const r = perStatus[label] || { judul: 0, stok: 0 };
        return ("<tr><td>" +
            badge(label, KELAS_STATUS[label]) +
            "</td>" +
            "<td>" +
            r.judul +
            "</td>" +
            '<td class="num">' +
            angka(r.stok) +
            "</td></tr>");
    })
        .join("");
})();
