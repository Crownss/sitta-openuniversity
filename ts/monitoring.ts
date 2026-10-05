(() => {
  wajibLogin();
  const jumlah = [0, 0, 0, 0];

  const baris = Object.keys(dataTracking).map((nomor) => {
    const data = dataTracking[nomor];
    const tahap = tahapPengiriman(data);
    const terakhir = data.perjalanan[data.perjalanan.length - 1];
    const persen = Math.round((tahap / 3) * 100);
    jumlah[tahap]++;

    return (
      "<tr>" +
      '<td><a href="tracking.html?do=' +
      encodeURIComponent(nomor) +
      '">' +
      escapeHtml(nomor) +
      "</a></td>" +
      "<td>" +
      escapeHtml(data.nama) +
      "</td>" +
      "<td>" +
      escapeHtml(data.ekspedisi) +
      "</td>" +
      "<td>" +
      escapeHtml(data.tanggalKirim) +
      "</td>" +
      "<td>" +
      '<div class="progress"><div class="progress-bar" style="width:' +
      persen +
      '%"></div></div>' +
      badge(LABEL_TAHAP[tahap], KELAS_TAHAP[tahap]) +
      "</td>" +
      "<td>" +
      (terakhir
        ? '<p class="time">' +
          escapeHtml(terakhir.waktu) +
          "</p>" +
          escapeHtml(terakhir.keterangan)
        : "-") +
      "</td>" +
      "</tr>"
    );
  });

  ambilEl("tabelMonitoring").innerHTML =
    baris.join("") ||
    '<tr><td colspan="6" class="empty">Belum ada data DO.</td></tr>';

  ambilEl("jmlTotal").textContent = String(baris.length);
  ambilEl("jmlDikirim").textContent = String(jumlah[1]);
  ambilEl("jmlPerjalanan").textContent = String(jumlah[2]);
  ambilEl("jmlSelesai").textContent = String(jumlah[3]);
})();
