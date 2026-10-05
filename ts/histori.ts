(() => {
  wajibLogin();

  const tabelHistori = ambilEl("tabelHistori");
  const inputCariHistori = ambilEl<HTMLInputElement>("cariHistori");

  const transaksi = Object.keys(dataTracking)
    .map((nomor) => ({ nomor: nomor, data: dataTracking[nomor] }))
    .sort((a, b) => b.data.tanggalKirim.localeCompare(a.data.tanggalKirim));

  function renderHistori(): void {
    const kata = inputCariHistori.value.trim().toLowerCase();

    const hasil = transaksi.filter((t) =>
      [t.nomor, t.data.nama, t.data.ekspedisi, t.data.paket].some(
        (v) => v.toLowerCase().indexOf(kata) !== -1,
      ),
    );

    if (hasil.length === 0) {
      tabelHistori.innerHTML =
        '<tr><td colspan="8" class="empty">Transaksi tidak ditemukan.</td></tr>';
      return;
    }

    tabelHistori.innerHTML = hasil
      .map((t, i) => {
        const tahap = tahapPengiriman(t.data);
        return (
          "<tr>" +
          "<td>" +
          (i + 1) +
          "</td>" +
          "<td>" +
          escapeHtml(t.data.tanggalKirim) +
          "</td>" +
          '<td><a href="tracking.html?do=' +
          encodeURIComponent(t.nomor) +
          '">' +
          escapeHtml(t.nomor) +
          "</a></td>" +
          "<td>" +
          escapeHtml(t.data.nama) +
          "</td>" +
          "<td>" +
          escapeHtml(t.data.paket) +
          "</td>" +
          "<td>" +
          escapeHtml(t.data.ekspedisi) +
          "</td>" +
          '<td class="num">' +
          escapeHtml(t.data.total) +
          "</td>" +
          "<td>" +
          badge(LABEL_TAHAP[tahap], KELAS_TAHAP[tahap]) +
          "</td>" +
          "</tr>"
        );
      })
      .join("");
  }

  inputCariHistori.addEventListener("input", renderHistori);
  renderHistori();
})();
