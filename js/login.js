"use strict";
(() => {
    // Jika sudah login, langsung ke dashboard
    if (ambilSesi()) {
        window.location.href = "dashboard.html";
    }
    const formLogin = ambilEl("loginForm");
    const alertLogin = ambilEl("loginAlert");
    function tampilkanError(pesan) {
        alertLogin.textContent = pesan;
        alertLogin.classList.add("show");
    }
    formLogin.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = ambilEl("email").value.trim().toLowerCase();
        const password = ambilEl("password").value;
        if (email === "" || password === "") {
            tampilkanError("Email dan password wajib diisi.");
            return;
        }
        // Cek ke dataPengguna di ts/data.ts
        const user = dataPengguna.find((p) => p.email.toLowerCase() === email && p.password === password);
        if (!user) {
            tampilkanError("Email atau password yang Anda masukkan salah.");
            return;
        }
        simpanSesi(user);
        window.location.href = "dashboard.html";
    });
})();
