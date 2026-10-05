# SITTA – Sistem Informasi Tiras dan Transaksi Bahan Ajar | Open University

Static web app (HTML + CSS + TypeScript) for managing Universitas Terbuka course materials: login, stock info, DO tracking, and reports. All data is dummy data in `ts/data.ts`; there is no backend.

## Pages

| File | Description |
| --- | --- |
| `index.html` | Login |
| `dashboard.html` | Dashboard with greeting and menu |
| `stok.html` | Informasi Bahan Ajar (stock table with covers) |
| `tracking.html` | Track a DO number (supports `?do=<nomor>`) |
| `monitoring.html` | Laporan: DO progress monitoring |
| `rekap.html` | Laporan: materials summary |
| `histori.html` | Laporan: transaction history |

## Structure

```
ts/      TypeScript source (edit here)
js/      Compiled output loaded by the HTML pages
css/     Shared stylesheet
assets/  Logos and course cover images
```

## Run

Open `index.html` in a browser, or serve the folder:

```sh
bunx serve .
```

Log in with any user listed in `dataPengguna` in `ts/data.ts`.

## Build with `bun` (because i'm using bun, change for your own best runtime)

```sh
bun i --global tsc
bun build   # compile ts/ -> js/
bun watch   # recompile on change
```

Commit the compiled `js/` files, since the pages load them directly.
