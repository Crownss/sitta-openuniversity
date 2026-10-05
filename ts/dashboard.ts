(() => {
  const user = wajibLogin();
  if (!user) return;

  // Sapaan berdasarkan jam lokal perangkat
  function sapaan(jam: number): string {
    if (jam >= 4 && jam < 11) return "Selamat Pagi";
    if (jam >= 11 && jam < 15) return "Selamat Siang";
    if (jam >= 15 && jam < 18) return "Selamat Sore";
    return "Selamat Malam";
  }

  function perbaruiWaktu(nama: string): void {
    const sekarang = new Date();
    const namaDepan = nama.split(" ")[0];

    ambilEl("greeting").textContent =
      sapaan(sekarang.getHours()) + ", " + namaDepan + "!";

    ambilEl("clock").textContent =
      sekarang.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      " | " +
      sekarang.toLocaleTimeString("id-ID");
  }

  ambilEl("userInfo").textContent =
    user.role + " - " + user.lokasi + " (" + user.email + ")";

  perbaruiWaktu(user.nama);
  setInterval(() => perbaruiWaktu(user.nama), 1000);

  const totalStok = dataBahanAjar.reduce(
    (jumlah, item) => jumlah + item.stok,
    0,
  );

  ambilEl("totalJudul").textContent = String(dataBahanAjar.length);
  ambilEl("totalStok").textContent = totalStok.toLocaleString("id-ID");
  ambilEl("totalDO").textContent = String(Object.keys(dataTracking).length);
})();
