(() => {
  // Jika sudah login, langsung ke dashboard
  if (ambilSesi()) {
    window.location.href = "dashboard.html";
  }

  const formLogin = ambilEl<HTMLFormElement>("loginForm");
  const alertLogin = ambilEl("loginAlert");

  function tampilkanError(pesan: string): void {
    alertLogin.textContent = pesan;
    alertLogin.classList.add("show");
  }

  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = ambilEl<HTMLInputElement>("email").value.trim().toLowerCase();
    const password = ambilEl<HTMLInputElement>("password").value;

    if (email === "" || password === "") {
      tampilkanError("Email dan password wajib diisi.");
      return;
    }

    // Cek ke dataPengguna di ts/data.ts
    const user = dataPengguna.find(
      (p) => p.email.toLowerCase() === email && p.password === password,
    );

    if (!user) {
      tampilkanError("Email atau password yang Anda masukkan salah.");
      return;
    }

    simpanSesi(user);
    window.location.href = "dashboard.html";
  });
})();
