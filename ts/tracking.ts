(() => {
  wajibLogin();

  const formTracking = ambilEl<HTMLFormElement>("trackingForm");
  const inputDO = ambilEl<HTMLInputElement>("nomorDO");
  const hasil = ambilEl("hasilTracking");

  // daftar nomor DO yang tersedia sebagai petunjuk
  ambilEl("daftarDO").textContent =
    "Nomor DO tersedia: " + Object.keys(dataTracking).join(", ");

  function tampilkanHasil(nomor: string, data: Tracking): void {
    const riwayat = data.perjalanan
      .map(
        (p) =>
          "<li>" +
          '<p class="time">' +
          escapeHtml(p.waktu) +
          "</p>" +
          "<p>" +
          escapeHtml(p.keterangan) +
          "</p>" +
          "</li>",
      )
      .join("");

    hasil.innerHTML =
      '<div class="card">' +
      '<div class="detail-grid">' +
      '<div><p class="label">Nomor DO</p><p class="value">' +
      escapeHtml(nomor) +
      "</p></div>" +
      '<div><p class="label">Nama Penerima</p><p class="value">' +
      escapeHtml(data.nama) +
      "</p></div>" +
      '<div><p class="label">Status</p><p class="value">' +
      badge(data.status, KELAS_TAHAP[tahapPengiriman(data)]) +
      "</p></div>" +
      '<div><p class="label">Ekspedisi</p><p class="value">' +
      escapeHtml(data.ekspedisi) +
      "</p></div>" +
      '<div><p class="label">Tanggal Kirim</p><p class="value">' +
      escapeHtml(data.tanggalKirim) +
      "</p></div>" +
      '<div><p class="label">Kode Paket</p><p class="value">' +
      escapeHtml(data.paket) +
      "</p></div>" +
      '<div><p class="label">Total</p><p class="value">' +
      escapeHtml(data.total) +
      "</p></div>" +
      "</div>" +
      "<h3>Riwayat Perjalanan</h3><br>" +
      '<ul class="timeline">' +
      riwayat +
      "</ul>" +
      "</div>";
  }

  function tampilkanKosong(pesan: string): void {
    hasil.innerHTML = '<div class="card empty">' + escapeHtml(pesan) + "</div>";
  }

  function cariDO(): void {
    const nomor = inputDO.value.trim();

    if (nomor === "") {
      tampilkanKosong("Silakan masukkan nomor DO terlebih dahulu.");
      return;
    }

    const data = dataTracking[nomor];
    if (!data) {
      tampilkanKosong(
        'Data pengiriman dengan nomor DO "' + nomor + '" tidak ditemukan.',
      );
      return;
    }

    tampilkanHasil(nomor, data);
  }

  formTracking.addEventListener("submit", (event) => {
    event.preventDefault();
    cariDO();
  });

  const doDariUrl = new URLSearchParams(window.location.search).get("do");
  if (doDariUrl) {
    inputDO.value = doDariUrl;
    cariDO();
  }
})();
