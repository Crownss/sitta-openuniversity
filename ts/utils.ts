// Ambil elemen berdasarkan id; error jelas jika id tidak ada di HTML
function ambilEl<T extends HTMLElement = HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) {
    throw new Error('Elemen dengan id "' + id + '" tidak ditemukan');
  }
  return el as T;
}

// Mencegah teks data disisipkan sebagai HTML
function escapeHtml(teks: unknown): string {
  const div = document.createElement("div");
  div.textContent = teks == null ? "" : String(teks);
  return div.innerHTML;
}

// Kategori stok dipakai di halaman Informasi Bahan Ajar dan Rekap
function kategoriStok(stok: number): KategoriStok {
  if (stok >= 300) return { label: "Aman", kelas: "badge-success" };
  if (stok >= 200) return { label: "Menipis", kelas: "badge-warning" };
  return { label: "Kritis", kelas: "badge-danger" };
}

function badge(label: string, kelas: string): string {
  return '<span class="badge ' + kelas + '">' + escapeHtml(label) + "</span>";
}

function tahapPengiriman(data: Tracking): Tahap {
  const terakhir = data.perjalanan[data.perjalanan.length - 1];
  if (terakhir && terakhir.keterangan.toLowerCase().indexOf("selesai") === 0)
    return 3;
  if (data.status.toLowerCase().indexOf("perjalanan") !== -1) return 2;
  return 1;
}

function footerLogin(): void {
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

interface Ringkasan {
  judul: number;
  stok: number;
}

function angka(n: number): string {
  return n.toLocaleString("id-ID");
}

// bahan ajar berdasarkan fungsi kunci, hitung judul & total stok
function kelompokkan(
  fnKunci: (item: BahanAjar) => string,
): Record<string, Ringkasan> {
  const hasil: Record<string, Ringkasan> = {};
  dataBahanAjar.forEach((item) => {
    const kunci = fnKunci(item);
    if (!hasil[kunci]) hasil[kunci] = { judul: 0, stok: 0 };
    hasil[kunci].judul++;
    hasil[kunci].stok += item.stok;
  });
  return hasil;
}

function statusStok(stok: number): string {
  const k = kategoriStok(stok);
  return badge(k.label, k.kelas);
}

// kumpulan constanta global

const KELAS_STATUS: Record<string, string> = {
  Aman: "badge-success",
  Menipis: "badge-warning",
  Kritis: "badge-danger",
};
// cadangan jika file gambar tidak ditemukan
const COVER_DEFAULT = "assets/logo_sitta.svg";
const LABEL_TAHAP = ["", "Dikirim", "Dalam Perjalanan", "Selesai"];
const KELAS_TAHAP = ["", "badge-info", "badge-warning", "badge-success"];
