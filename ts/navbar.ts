interface MenuItem {
  label: string;
  href?: string;
  children?: MenuItem[];
}

const MENU: MenuItem[] = [
  { label: "Informasi Bahan Ajar", href: "stok.html" },
  { label: "Tracking Pengiriman", href: "tracking.html" },
  {
    label: "Laporan",
    children: [
      { label: "Monitoring Progress DO Bahan Ajar", href: "monitoring.html" },
      { label: "Rekap Bahan Ajar", href: "rekap.html" },
    ],
  },
  { label: "Histori Transaksi Bahan Ajar", href: "histori.html" },
];

function renderNavbar(): void {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  const halaman = window.location.pathname.split("/").pop() || "index.html";

  const itemHtml = MENU.map((menu) => {
    if (menu.children) {
      const anakAktif = menu.children.some((c) => c.href === halaman);
      const subMenu = menu.children
        .map(
          (c) =>
            '<li><a href="' +
            c.href +
            '"' +
            (c.href === halaman ? ' class="active"' : "") +
            ">" +
            c.label +
            "</a></li>",
        )
        .join("");

      return (
        '<li class="dropdown">' +
        '<button type="button" class="dropdown-toggle' +
        (anakAktif ? " active" : "") +
        '" aria-expanded="false">' +
        menu.label +
        ' <span class="caret">&#9662;</span>' +
        "</button>" +
        '<ul class="dropdown-menu">' +
        subMenu +
        "</ul>" +
        "</li>"
      );
    }
    return (
      '<li><a href="' +
      menu.href +
      '"' +
      (menu.href === halaman ? ' class="active"' : "") +
      ">" +
      menu.label +
      "</a></li>"
    );
  }).join("");

  nav.innerHTML =
    '<a href="dashboard.html" class="brand"><img src="assets/logo_sitta.svg" alt="Logo SITTA"> SITTA</a>' +
    '<button type="button" class="nav-toggle" aria-label="Buka menu">&#9776;</button>' +
    '<ul class="nav-links">' +
    itemHtml +
    '<li><button type="button" id="btnLogout" class="btn btn-outline">Logout</button></li>' +
    "</ul>";

  // Tombol hamburger (layar kecil)
  nav.querySelector(".nav-toggle")?.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // Buka/tutup dropdown dengan klik
  nav
    .querySelectorAll<HTMLButtonElement>(".dropdown-toggle")
    .forEach((tombol) => {
      tombol.addEventListener("click", (event) => {
        event.stopPropagation();
        const dropdown = tombol.parentElement;
        if (!dropdown) return;
        const terbuka = dropdown.classList.toggle("open");
        tombol.setAttribute("aria-expanded", String(terbuka));
      });
    });

  // Tutup dropdown saat klik di luar
  document.addEventListener("click", () => {
    nav.querySelectorAll(".dropdown.open").forEach((d) => {
      d.classList.remove("open");
      d.querySelector(".dropdown-toggle")?.setAttribute(
        "aria-expanded",
        "false",
      );
    });
  });

  ambilEl("btnLogout").addEventListener("click", logout);
}

renderNavbar();
