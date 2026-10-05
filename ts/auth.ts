// Fungsi bersama: sesi login, proteksi halaman, dan logout.
const SESSION_KEY = "sittaUser";

// Data pengguna yang disimpan di sesi (tanpa password)
type SesiPengguna = Omit<Pengguna, "password">;

interface KategoriStok {
  label: string;
  kelas: string;
}

// Tahap pengiriman: 1 = Dikirim, 2 = Dalam Perjalanan, 3 = Selesai
type Tahap = 1 | 2 | 3;

function simpanSesi(user: Pengguna): void {
  // Password tidak ikut disimpan ke sesi
  const dataSesi: SesiPengguna = {
    id: user.id,
    nama: user.nama,
    email: user.email,
    role: user.role,
    lokasi: user.lokasi,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(dataSesi));
}

function ambilSesi(): SesiPengguna | null {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
  } catch (e) {
    return null;
  }
}

// Panggil di halaman yang butuh login; kembali ke index.html jika belum login
function wajibLogin(): SesiPengguna | null {
  const user = ambilSesi();
  if (!user) {
    window.location.href = "index.html";
  }
  return user;
}

function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.href = "index.html";
}
