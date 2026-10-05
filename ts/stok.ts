(() => {
  wajibLogin();

  const tabel = ambilEl("tabelStok");
  const inputCari = ambilEl<HTMLInputElement>("cariStok");
  const pilihUrut = ambilEl<HTMLSelectElement>("urutStok");

  function renderTabel(): void {
    const kata = inputCari.value.trim().toLowerCase();

    const data = dataBahanAjar.filter(
      (item) =>
        item.kodeBarang.toLowerCase().indexOf(kata) !== -1 ||
        item.namaBarang.toLowerCase().indexOf(kata) !== -1 ||
        item.kodeLokasi.toLowerCase().indexOf(kata) !== -1,
    );

    if (pilihUrut.value === "stok-desc") {
      data.sort((a, b) => b.stok - a.stok);
    } else if (pilihUrut.value === "stok-asc") {
      data.sort((a, b) => a.stok - b.stok);
    } else if (pilihUrut.value === "nama-asc") {
      data.sort((a, b) => a.namaBarang.localeCompare(b.namaBarang));
    }

    if (data.length === 0) {
      tabel.innerHTML =
        '<tr><td colspan="9" class="empty">Data bahan ajar tidak ditemukan.</td></tr>';
      return;
    }

    tabel.innerHTML = data
      .map(
        (item, i) =>
          "<tr>" +
          "<td>" +
          (i + 1) +
          "</td>" +
          '<td><a href="' +
          escapeHtml(item.cover) +
          '" target="_blank" title="Lihat cover">' +
          '<img class="cover" src="' +
          escapeHtml(item.cover) +
          '" alt="Cover ' +
          escapeHtml(item.namaBarang) +
          '" onerror="this.onerror=null;this.src=\'' +
          COVER_DEFAULT +
          "'\"></a></td>" +
          "<td>" +
          escapeHtml(item.kodeLokasi) +
          "</td>" +
          "<td>" +
          escapeHtml(item.kodeBarang) +
          "</td>" +
          "<td>" +
          escapeHtml(item.namaBarang) +
          "</td>" +
          "<td>" +
          escapeHtml(item.jenisBarang) +
          "</td>" +
          "<td>" +
          escapeHtml(item.edisi) +
          "</td>" +
          '<td class="num">' +
          item.stok.toLocaleString("id-ID") +
          "</td>" +
          "<td>" +
          statusStok(item.stok) +
          "</td>" +
          "</tr>",
      )
      .join("");
  }

  inputCari.addEventListener("input", renderTabel);
  pilihUrut.addEventListener("change", renderTabel);
  renderTabel();
})();
