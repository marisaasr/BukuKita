
// ==========================================
// BUKUKITA - JAVASCRIPT
// LOGIN, REGISTER, MODAL, DAN SESSION
// ==========================================


// 1. MENGAMBIL DATA PENGGUNA
// Data awal berasal dari file data.js

const akunAwal = Array.isArray(dataPengguna)
    ? dataPengguna
    : [];

let akunTambahan = JSON.parse(
    localStorage.getItem("akunBukuKita")
) || [];

let semuaPengguna = [...akunAwal, ...akunTambahan];


// 2. FUNGSI MENAMPILKAN NOTIFIKASI

function tampilkanPesan(pesan) {
    alert(pesan);
}


// 3. FITUR TAMPIL / SEMBUNYIKAN PASSWORD

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "Sembunyikan";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "Lihat";
        }
    });
}


// 4. FITUR LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email")
            .value.trim().toLowerCase();

        const password = document.getElementById("password")
            .value;

        const pengguna = semuaPengguna.find(function (user) {
            return user.email.toLowerCase() === email &&
                   user.password === password;
        });

        if (pengguna) {
            const sesiPengguna = {
                id: pengguna.id,
                nama: pengguna.nama,
                email: pengguna.email,
                role: pengguna.role
            };

            sessionStorage.setItem(
                "userLogin",
                JSON.stringify(sesiPengguna)
            );

            tampilkanPesan(
                "Login berhasil! Selamat datang, " +
                pengguna.nama + "."
            );

            window.location.href = "dashboard.html";

        } else {
            tampilkanPesan(
                "Email atau password salah. Silakan periksa kembali."
            );
        }
    });
}


// 5. FUNGSI MODAL

const tombolModal = document.querySelectorAll("[data-modal]");

tombolModal.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
        const idModal = tombol.getAttribute("data-modal");
        const modal = document.getElementById(idModal);

        if (modal) {
            modal.classList.add("show");
        }
    });
});


// Menutup modal melalui tombol X

const tombolTutup = document.querySelectorAll(".modal-close");

tombolTutup.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
        const modal = tombol.closest(".modal-backdrop");

        if (modal) {
            modal.classList.remove("show");
        }
    });
});


// Menutup modal jika area luar diklik

document.querySelectorAll(".modal-backdrop").forEach(function (modal) {
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});


// Menutup modal menggunakan tombol Escape

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal-backdrop").forEach(
            function (modal) {
                modal.classList.remove("show");
            }
        );
    }
});


// 6. FITUR REGISTER / DAFTAR AKUN

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nama = document.getElementById("registerName")
            .value.trim();

        const email = document.getElementById("registerEmail")
            .value.trim().toLowerCase();

        const password = document.getElementById("registerPassword")
            .value;

        // Validasi panjang password

        if (password.length < 6) {
            tampilkanPesan(
                "Password minimal harus terdiri dari 6 karakter."
            );
            return;
        }

        // Memeriksa email yang sudah terdaftar

        const emailSudahAda = semuaPengguna.some(function (user) {
            return user.email.toLowerCase() === email;
        });

        if (emailSudahAda) {
            tampilkanPesan(
                "Email sudah terdaftar. Silakan gunakan email lain."
            );
            return;
        }

        // Membuat ID pengguna baru

        const idBaru = semuaPengguna.length > 0
            ? Math.max(...semuaPengguna.map(user => Number(user.id) || 0)) + 1
            : 1;

        // Membuat data pengguna baru

        const penggunaBaru = {
            id: idBaru,
            nama: nama,
            email: email,
            password: password,
            role: "User"
        };

        // Menyimpan akun baru

        akunTambahan.push(penggunaBaru);
        semuaPengguna.push(penggunaBaru);

        localStorage.setItem(
            "akunBukuKita",
            JSON.stringify(akunTambahan)
        );

        tampilkanPesan(
            "Pendaftaran berhasil! Silakan login menggunakan akun baru Anda."
        );

        // Mengisi email pada halaman login

        document.getElementById("email").value = email;

        // Mengosongkan form pendaftaran

        registerForm.reset();

        // Menutup modal pendaftaran

        document.getElementById("registerModal")
            .classList.remove("show");
    });
}


// 7. FITUR LUPA PASSWORD

const forgotForm = document.getElementById("forgotForm");

if (forgotForm) {
    forgotForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("forgotEmail")
            .value.trim().toLowerCase();

        const pengguna = semuaPengguna.find(function (user) {
            return user.email.toLowerCase() === email;
        });

        if (pengguna) {
            tampilkanPesan(
                "Email ditemukan! Fitur pengiriman email reset password " +
                "belum diaktifkan pada versi demonstrasi ini."
            );
        } else {
            tampilkanPesan(
                "Email tidak ditemukan. Periksa kembali email Anda."
            );
        }

        forgotForm.reset();

        document.getElementById("forgotModal")
            .classList.remove("show");
    });
}


// 8. CEK STATUS LOGIN

console.log("BukuKita berhasil dimuat.");
console.log("Jumlah akun tersedia:", semuaPengguna.length);


// ==========================================
// BUKUKITA - DASHBOARD
// ==========================================

// 1. MEMERIKSA SESSION LOGIN

const halamanDashboard = document.getElementById("totalKatalog");

if (halamanDashboard) {
    const sesiLogin = sessionStorage.getItem("userLogin");

    if (!sesiLogin) {
        window.location.href = "index.html";
    } else {
        const penggunaAktif = JSON.parse(sesiLogin);

        // 2. MENAMPILKAN INFORMASI PENGGUNA

        const profileName = document.getElementById("profileName");
        const profileRole = document.getElementById("profileRole");
        const profileAvatar = document.getElementById("profileAvatar");
        const welcomeMessage = document.getElementById("welcomeMessage");

        if (profileName) {
            profileName.textContent = penggunaAktif.nama;
        }

        if (profileRole) {
            profileRole.textContent = penggunaAktif.role;
        }

        if (profileAvatar) {
            profileAvatar.textContent =
                penggunaAktif.nama.charAt(0).toUpperCase();
        }

        if (welcomeMessage) {
            welcomeMessage.textContent =
                "Selamat datang, " + penggunaAktif.nama + "!";
        }

        // 3. MENAMPILKAN TANGGAL

        const currentDate = document.getElementById("currentDate");

        if (currentDate) {
            currentDate.textContent = new Date().toLocaleDateString(
                "id-ID",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );
        }

       // 4. MENGAMBIL DATA KATALOG

let daftarBuku = [];

try {
    const dataTersimpan = localStorage.getItem("bukuKitaKatalog");

    daftarBuku = dataTersimpan
        ? JSON.parse(dataTersimpan)
        : [...dataKatalogBuku];

    if (!Array.isArray(daftarBuku)) {
        daftarBuku = [...dataKatalogBuku];
    }
} catch (error) {
    daftarBuku = [...dataKatalogBuku];
}

const jumlahKatalog = daftarBuku.length;

        const jumlahStok = daftarBuku.reduce(function (total, buku) {
            return total + Number(buku.stok || 0);
        }, 0);

       // 5. MENGAMBIL DATA TRACKING DARI SEMUA SUMBER

let pesananLama = Array.isArray(dataTracking)
    ? dataTracking
    : Object.values(dataTracking || {});

let pesananBaru = [];

try {
    pesananBaru = JSON.parse(
        localStorage.getItem("bukuKitaPesanan") || "[]"
    );

    if (!Array.isArray(pesananBaru)) {
        pesananBaru = [];
    }
} catch (error) {
    pesananBaru = [];
}

// Gabungkan data lama dan checkout baru tanpa DO ganda
const gabunganPesanan = [...pesananLama, ...pesananBaru];

const daftarTracking = gabunganPesanan.filter(function (pesanan, index, array) {
    return array.findIndex(function (item) {
        return String(item.nomorDO) === String(pesanan.nomorDO);
    }) === index;
});

        // 6. MENAMPILKAN STATISTIK

        document.getElementById("totalKatalog").textContent =
            jumlahKatalog.toLocaleString("id-ID");

        document.getElementById("totalStok").textContent =
            jumlahStok.toLocaleString("id-ID");

        document.getElementById("totalPesanan").textContent =
            daftarTracking.length.toLocaleString("id-ID");

        // 7. MENAMPILKAN PESANAN TERBARU

        const tabelTracking = document.getElementById("recentTracking");

        if (tabelTracking) {
            if (daftarTracking.length === 0) {
                tabelTracking.innerHTML = `
                    <tr>
                        <td colspan="4">Belum ada data pesanan.</td>
                    </tr>
                `;
            } else {
                const trackingTerbaru = [...daftarTracking].reverse().slice(0, 5);

                tabelTracking.innerHTML = trackingTerbaru.map(function (pesanan) {
                    let statusClass = "status-badge";

                    if (pesanan.status === "Dikirim") {
                        statusClass += " sent";
                    } else if (
                        pesanan.status === "Selesai" ||
                        pesanan.status === "Diterima"
                    ) {
                        statusClass += " done";
                    }

                    return `
                        <tr>
                            <td><strong>${pesanan.nomorDO || "-"}</strong></td>
                            <td>${pesanan.nama || "-"}</td>
                            <td>${pesanan.ekspedisi || "-"}</td>
                            <td>
                                <span class="${statusClass}">
                                    ${pesanan.status || "-"}
                                </span>
                            </td>
                        </tr>
                    `;
                }).join("");
            }
        }
    }
}


// 8. FITUR LOGOUT

const tombolLogout = document.getElementById("logoutButton");

if (tombolLogout) {
    tombolLogout.addEventListener("click", function () {
        const konfirmasi = confirm(
            "Apakah Anda yakin ingin keluar dari BukuKita?"
        );

        if (konfirmasi) {
            sessionStorage.removeItem("userLogin");
            window.location.href = "index.html";
        }
    });
}


// 9. SIDEBAR RESPONSIVE

const tombolSidebar = document.getElementById("sidebarToggle");
const sidebarDashboard = document.getElementById("sidebar");

if (tombolSidebar && sidebarDashboard) {
    tombolSidebar.addEventListener("click", function () {
        sidebarDashboard.classList.toggle("open");
    });
}


// ==========================================
// BUKUKITA - KATALOG DAN MANAJEMEN STOK
// ==========================================

(function () {

    // 1. CEK LOGIN DAN ROLE PENGGUNA

    const sesi = sessionStorage.getItem("userLogin");

    if (!sesi || !document.getElementById("bookTableBody")) {
        return;
    }

    const penggunaAktif = JSON.parse(sesi);

    const isAdmin =
        String(penggunaAktif.role).toLowerCase() === "admin";
        

    // 2. MENAMPILKAN PROFIL

    document.getElementById("profileName").textContent =
        penggunaAktif.nama;

    document.getElementById("profileRole").textContent =
        penggunaAktif.role;

    document.getElementById("profileAvatar").textContent =
        penggunaAktif.nama.charAt(0).toUpperCase();

    // 3. MENGAMBIL DATA KATALOG

    const dataAwal = Array.isArray(dataKatalogBuku)
        ? dataKatalogBuku
        : [];

    let daftarBuku;

    try {
    const dataTersimpan = localStorage.getItem("bukuKitaKatalog");

    daftarBuku = dataTersimpan
        ? JSON.parse(dataTersimpan)
        : [...dataAwal];

    if (!Array.isArray(daftarBuku)) {
        daftarBuku = [...dataAwal];
    }

// MENAMBAHKAN SAMPUL PADA DATA KATALOG LAMA
daftarBuku.forEach(function (buku) {
    const dataAsli = dataAwal.find(function (item) {
        return item.kodeBarang === buku.kodeBarang;
    });

    if (dataAsli && dataAsli.cover) {
        buku.cover = dataAsli.cover;
    }
});

localStorage.setItem(
    "bukuKitaKatalog",
    JSON.stringify(daftarBuku)
);

    // Perbaiki format harga dari data lama
    daftarBuku.forEach(function (buku) {
        if (typeof buku.harga === "string") {
            buku.harga = Number(
                buku.harga.replace(/[^\d]/g, "")
            );
        }
    });

    localStorage.setItem(
        "bukuKitaKatalog",
        JSON.stringify(daftarBuku)
    );

} catch (error) {
    daftarBuku = [...dataAwal];
}


    // 4. MENGAMBIL ELEMEN HTML

    const tabel = document.getElementById("bookTableBody");
    const pencarian = document.getElementById("searchBook");
    const filterKategori = document.getElementById("filterCategory");

    const modal = document.getElementById("bookModal");
    const form = document.getElementById("bookForm");

    const tombolTambah = document.getElementById("addBookButton");
    const tombolTutup = document.getElementById("closeBookModal");

    const kolomAksi = document.getElementById("actionHeader");
    const judulModal = document.getElementById("bookModalTitle");
    const tombolSimpan = document.getElementById("saveBookButton");

    let kodeBukuDiedit = null;

    // 5. MENGATUR AKSES ADMIN DAN USER

    if (isAdmin) {
        tombolTambah.style.display = "inline-block";
        kolomAksi.style.display = "table-cell";
    }

    // 6. FUNGSI FORMAT RUPIAH

    function formatRupiah(angka) {
        return "Rp " + Number(angka || 0).toLocaleString("id-ID");
    }

    // 7. FUNGSI MENGAMANKAN TEKS HTML

    function escapeHTML(teks) {
        return String(teks ?? "").replace(/[&<>"']/g, function (karakter) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            }[karakter];
        });
    }

    // 8. MENYIMPAN DATA KE LOCAL STORAGE

    function simpanKatalog() {
        localStorage.setItem(
            "bukuKitaKatalog",
            JSON.stringify(daftarBuku)
        );
    }

    // 9. MEMPERBARUI RINGKASAN KATALOG

    function tampilkanRingkasan() {
        const totalStok = daftarBuku.reduce(function (total, buku) {
            return total + Number(buku.stok || 0);
        }, 0);

        const stokMenipis = daftarBuku.filter(function (buku) {
            return Number(buku.stok || 0) <= 20;
        }).length;

        document.getElementById("catalogTotal").textContent =
            daftarBuku.length.toLocaleString("id-ID");

        document.getElementById("catalogStock").textContent =
            totalStok.toLocaleString("id-ID");

        document.getElementById("catalogLowStock").textContent =
            stokMenipis.toLocaleString("id-ID");
    }

    // 10. MENGISI FILTER KATEGORI

    function tampilkanKategori() {
        const kategoriSebelumnya = filterKategori.value;

        const semuaKategori = [
            ...new Set(
                daftarBuku.map(buku => buku.jenisBarang)
                    .filter(Boolean)
            )
        ];

        filterKategori.innerHTML =
            '<option value="">Semua Kategori</option>';

        semuaKategori.forEach(function (kategori) {
            const option = document.createElement("option");
            option.value = kategori;
            option.textContent = kategori;
            filterKategori.appendChild(option);
        });

        if (semuaKategori.includes(kategoriSebelumnya)) {
            filterKategori.value = kategoriSebelumnya;
        }
    }

    // 11. MENAMPILKAN TABEL BUKU

    function tampilkanBuku() {
        const kataKunci = pencarian.value.trim().toLowerCase();
        const kategoriDipilih = filterKategori.value;

        const hasilFilter = daftarBuku.filter(function (buku) {
            const cocokPencarian =
                String(buku.kodeBarang).toLowerCase().includes(kataKunci) ||
                String(buku.namaBarang).toLowerCase().includes(kataKunci);

            const cocokKategori =
                !kategoriDipilih || buku.jenisBarang === kategoriDipilih;

            return cocokPencarian && cocokKategori;
        });

        tabel.innerHTML = "";

        document.getElementById("catalogResultCount").textContent =
            "Menampilkan " + hasilFilter.length + " dari " +
            daftarBuku.length + " buku";

        document.getElementById("catalogEmpty").style.display =
            hasilFilter.length === 0 ? "block" : "none";

        if (hasilFilter.length === 0) {
            return;
        }

        hasilFilter.forEach(function (buku) {
            const stok = Number(buku.stok || 0);

            let kelasStok = "stock-badge";
            let labelStok = stok.toLocaleString("id-ID") + " tersedia";

            if (stok === 0) {
                kelasStok += " empty";
                labelStok = "Habis";
            } else if (stok <= 20) {
                kelasStok += " low";
                labelStok = stok.toLocaleString("id-ID") + " tersisa";
            }

            const cover = buku.cover
                ? `<img class="book-cover" src="${escapeHTML(buku.cover)}" alt="Cover buku">`
                : `<div class="book-cover-placeholder">📖</div>`;

            const aksi = isAdmin
                ? `
                    <td>
                        <div class="book-actions">
                            <button type="button"
                                class="book-action-button edit-book-button"
                                data-edit="${escapeHTML(buku.kodeBarang)}">
                                Edit
                            </button>
                            <button type="button"
                                class="book-action-button delete-book-button"
                                data-delete="${escapeHTML(buku.kodeBarang)}">
                                Hapus
                            </button>
                        </div>
                    </td>
                `
                : "";

            const baris = document.createElement("tr");

            baris.innerHTML = `
                <td>
                    <div class="book-cell">
                        ${cover}
                        <div>
                            <span class="book-name">
                                ${escapeHTML(buku.namaBarang)}
                            </span>
                            <span class="book-code">
                                ${escapeHTML(buku.kodeBarang)}
                            </span>
                        </div>
                    </div>
                </td>

                <td>${escapeHTML(buku.kodeBarang)}</td>

                <td>
                    <span class="category-badge">
                        ${escapeHTML(buku.jenisBarang)}
                    </span>
                </td>

                <td>Edisi ${escapeHTML(buku.edisi)}</td>

                <td>
                    <span class="${kelasStok}">${labelStok}</span>
                </td>

                <td class="book-price">
                    ${formatRupiah(buku.harga)}
                </td>

                ${aksi}
            `;

            tabel.appendChild(baris);

            // Jika gambar cover tidak ditemukan, tampilkan placeholder.
            const gambar = baris.querySelector(".book-cover");

            if (gambar) {
                gambar.addEventListener("error", function () {
                    const placeholder = document.createElement("div");
                    placeholder.className = "book-cover-placeholder";
                    placeholder.textContent = "📖";
                    gambar.replaceWith(placeholder);
                }, { once: true });
            }
        });
    }

    // 12. MEMPERBARUI TAMPILAN

    function perbaruiTampilan() {
        tampilkanRingkasan();
        tampilkanKategori();
        tampilkanBuku();
    }

    // 13. MEMBUKA MODAL TAMBAH BUKU

    function bukaModalTambah() {
        kodeBukuDiedit = null;

        form.reset();

        judulModal.textContent = "Tambah Buku Baru";
        tombolSimpan.textContent = "Simpan Buku";

        modal.classList.add("show");
    }

    if (isAdmin) {
        tombolTambah.addEventListener("click", bukaModalTambah);
    }

    // 14. MENUTUP MODAL

    function tutupModal() {
        modal.classList.remove("show");
        form.reset();
        kodeBukuDiedit = null;
    }

    tombolTutup.addEventListener("click", tutupModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            tutupModal();
        }
    });

    // 15. MENAMBAHKAN DAN MENGEDIT BUKU

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!isAdmin) {
            return;
        }

        const bukuBaru = {
            kodeBarang: document.getElementById("bookCode").value.trim(),
            namaBarang: document.getElementById("bookName").value.trim(),
            jenisBarang: document.getElementById("bookCategory").value.trim(),
            edisi: Number(document.getElementById("bookEdition").value),
            stok: Number(document.getElementById("bookStock").value),
            harga: Number(document.getElementById("bookPrice").value),
            cover: document.getElementById("bookCover").value.trim()
        };

        if (
            !bukuBaru.kodeBarang ||
            !bukuBaru.namaBarang ||
            !bukuBaru.jenisBarang ||
            !Number.isInteger(bukuBaru.edisi) ||
            bukuBaru.edisi < 1 ||
            !Number.isInteger(bukuBaru.stok) ||
            bukuBaru.stok < 0 ||
            !Number.isFinite(bukuBaru.harga) ||
            bukuBaru.harga < 0
        ) {
            alert("Periksa kembali data buku yang dimasukkan.");
            return;
        }

        const kodeDuplikat = daftarBuku.some(function (buku) {
            return buku.kodeBarang.toLowerCase() ===
                bukuBaru.kodeBarang.toLowerCase() &&
                buku.kodeBarang !== kodeBukuDiedit;
        });

        if (kodeDuplikat) {
            alert("Kode buku sudah digunakan. Gunakan kode lain.");
            return;
        }

        if (kodeBukuDiedit !== null) {
            const indeks = daftarBuku.findIndex(function (buku) {
                return buku.kodeBarang === kodeBukuDiedit;
            });

            if (indeks !== -1) {
                daftarBuku[indeks] = bukuBaru;
            }

            alert("Data buku berhasil diperbarui!");
        } else {
            daftarBuku.push(bukuBaru);
            alert("Buku baru berhasil ditambahkan!");
        }

        simpanKatalog();
        perbaruiTampilan();
        tutupModal();
    });

    // 16. TOMBOL EDIT DAN HAPUS

    tabel.addEventListener("click", function (event) {
        if (!isAdmin) {
            return;
        }

        const tombolEdit = event.target.closest("[data-edit]");
        const tombolHapus = event.target.closest("[data-delete]");

        if (tombolEdit) {
            const kode = tombolEdit.dataset.edit;

            const buku = daftarBuku.find(function (item) {
                return item.kodeBarang === kode;
            });

            if (!buku) {
                return;
            }

            kodeBukuDiedit = kode;

            document.getElementById("bookCode").value = buku.kodeBarang;
            document.getElementById("bookName").value = buku.namaBarang;
            document.getElementById("bookCategory").value = buku.jenisBarang;
            document.getElementById("bookEdition").value = buku.edisi;
            document.getElementById("bookStock").value = buku.stok;
            document.getElementById("bookPrice").value = buku.harga;
            document.getElementById("bookCover").value = buku.cover || "";

            judulModal.textContent = "Edit Informasi Buku";
            tombolSimpan.textContent = "Simpan Perubahan";

            modal.classList.add("show");
        }

        if (tombolHapus) {
            const kode = tombolHapus.dataset.delete;

            const konfirmasi = confirm(
                "Apakah Anda yakin ingin menghapus buku " + kode + "?"
            );

            if (!konfirmasi) {
                return;
            }

            daftarBuku = daftarBuku.filter(function (buku) {
                return buku.kodeBarang !== kode;
            });

            simpanKatalog();
            perbaruiTampilan();

            alert("Buku berhasil dihapus.");
        }
    });

    // 17. PENCARIAN DAN FILTER

    pencarian.addEventListener("input", tampilkanBuku);
    filterKategori.addEventListener("change", tampilkanBuku);



    // 18. TAMPILKAN DATA PERTAMA KALI

    perbaruiTampilan();

    console.log("Katalog BukuKita berhasil dimuat.");

})();


// ==========================================
// BUKUKITA - CHECKOUT DAN KERANJANG BELANJA
// ==========================================

(function () {

    // 1. CEK HALAMAN DAN SESSION LOGIN

    const formCheckout = document.getElementById("checkoutForm");

    if (!formCheckout) {
        return;
    }

    const sesi = sessionStorage.getItem("userLogin");

    if (!sesi) {
        window.location.href = "index.html";
        return;
    }

    const penggunaAktif = JSON.parse(sesi);

// ADMIN TIDAK BOLEH MENGAKSES HALAMAN CHECKOUT
if (String(penggunaAktif.role).trim().toLowerCase() === "admin") {
    alert("Akses ditolak! Admin tidak diperbolehkan melakukan checkout.");
    window.location.replace("dashboard.html");
    return;
}

    // 2. MENAMPILKAN PROFIL

    document.getElementById("profileName").textContent =
        penggunaAktif.nama;

    document.getElementById("profileRole").textContent =
        penggunaAktif.role;

    document.getElementById("profileAvatar").textContent =
        penggunaAktif.nama.charAt(0).toUpperCase();

    // 3. MENGAMBIL DATA BUKU

    const dataAwal = Array.isArray(dataKatalogBuku)
        ? dataKatalogBuku
        : [];

    let daftarBuku;

    try {
    const tersimpan = localStorage.getItem("bukuKitaKatalog");

    daftarBuku = tersimpan
        ? JSON.parse(tersimpan)
        : [...dataAwal];

    if (!Array.isArray(daftarBuku)) {
        daftarBuku = [...dataAwal];
    }

    daftarBuku.forEach(function (buku) {
        buku.harga = Number(
            String(buku.harga || 0).replace(/[^\d]/g, "")
        );
    });

    localStorage.setItem(
        "bukuKitaKatalog",
        JSON.stringify(daftarBuku)
    );

} catch (error) {
    daftarBuku = [...dataAwal];
}

    // 4. ELEMEN HTML

    const daftarBukuHTML = document.getElementById("checkoutBookList");
    const pencarianBuku = document.getElementById("checkoutSearch");
    const daftarKeranjangHTML = document.getElementById("cartList");
    const jumlahItemHTML = document.getElementById("cartItemCount");
    const totalHTML = document.getElementById("cartGrandTotal");

    const modalSukses = document.getElementById("orderSuccessModal");
    const tombolTutupSukses = document.getElementById("closeSuccessModal");

    let keranjang = [];

    // 5. FUNGSI FORMAT RUPIAH

    function formatRupiah(angka) {
        return "Rp " + Number(angka || 0).toLocaleString("id-ID");
    }

    // 6. FUNGSI AMANKAN TEKS

    function escapeHTML(teks) {
        return String(teks ?? "").replace(/[&<>"']/g, function (karakter) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            }[karakter];
        });
    }

    // 7. MENAMPILKAN KATALOG UNTUK CHECKOUT

    function tampilkanBuku() {
        const kataKunci = pencarianBuku.value.trim().toLowerCase();

        const hasil = daftarBuku.filter(function (buku) {
            return (
                String(buku.namaBarang).toLowerCase().includes(kataKunci) ||
                String(buku.kodeBarang).toLowerCase().includes(kataKunci)
            );
        });

        if (hasil.length === 0) {
            daftarBukuHTML.innerHTML = `
                <div class="cart-empty">
                    <div>📖</div>
                    <h3>Buku tidak ditemukan</h3>
                    <p>Coba kata kunci lainnya.</p>
                </div>
            `;
            return;
        }

        daftarBukuHTML.innerHTML = hasil.map(function (buku) {
            const stok = Number(buku.stok || 0);

            const gambar = buku.cover
                ? `<img src="${escapeHTML(buku.cover)}" alt="Cover buku">`
                : `<div class="checkout-book-placeholder">📖</div>`;

            return `
                <article class="checkout-book-card">
                    <div class="checkout-book-image">
                        ${gambar}
                    </div>

                    <span class="checkout-book-code">
                        ${escapeHTML(buku.kodeBarang)}
                    </span>

                    <h3>${escapeHTML(buku.namaBarang)}</h3>

                    <span class="checkout-book-category">
                        ${escapeHTML(buku.jenisBarang)}
                    </span>

                    <div class="checkout-book-price">
                        ${formatRupiah(buku.harga)}
                    </div>

                    <p class="checkout-book-stock">
                        Stok tersedia: ${stok.toLocaleString("id-ID")}
                    </p>

                    <button type="button"
                        class="checkout-add-button"
                        data-add="${escapeHTML(buku.kodeBarang)}"
                        ${stok <= 0 ? "disabled" : ""}>
                        ${stok <= 0 ? "Stok Habis" : "+ Tambah ke Keranjang"}
                    </button>
                </article>
            `;
        }).join("");

        // Jika cover tidak ditemukan, ganti dengan ikon buku.
        daftarBukuHTML.querySelectorAll(".checkout-book-image img")
            .forEach(function (gambar) {
                gambar.addEventListener("error", function () {
                    const placeholder = document.createElement("div");
                    placeholder.className = "checkout-book-placeholder";
                    placeholder.textContent = "📖";
                    gambar.replaceWith(placeholder);
                }, { once: true });
            });
    }

    // 8. MENAMBAHKAN BUKU KE KERANJANG

    daftarBukuHTML.addEventListener("click", function (event) {
        const tombol = event.target.closest("[data-add]");

        if (!tombol) {
            return;
        }

        const kode = tombol.dataset.add;

        const buku = daftarBuku.find(function (item) {
            return item.kodeBarang === kode;
        });

        if (!buku) {
            return;
        }

        const stok = Number(buku.stok || 0);

        const itemAda = keranjang.find(function (item) {
            return item.kodeBarang === kode;
        });

        if (stok <= 0) {
            alert("Maaf, stok buku sedang habis.");
            return;
        }

        if (itemAda) {
            if (itemAda.jumlah >= stok) {
                alert("Jumlah pesanan sudah mencapai batas stok.");
                return;
            }

            itemAda.jumlah++;
        } else {
            keranjang.push({
                kodeBarang: buku.kodeBarang,
                namaBarang: buku.namaBarang,
                harga: Number(buku.harga),
                jumlah: 1
            });
        }

        tampilkanKeranjang();
    });

    // 9. MENAMPILKAN KERANJANG

    function tampilkanKeranjang() {
        const totalItem = keranjang.reduce(function (total, item) {
            return total + item.jumlah;
        }, 0);

        const totalHarga = keranjang.reduce(function (total, item) {
            return total + (item.harga * item.jumlah);
        }, 0);

        jumlahItemHTML.textContent =
            totalItem + (totalItem === 1 ? " item" : " item");

        totalHTML.textContent = formatRupiah(totalHarga);

        if (keranjang.length === 0) {
            daftarKeranjangHTML.innerHTML = `
                <div class="cart-empty">
                    <div>🛍️</div>
                    <h3>Keranjang masih kosong</h3>
                    <p>Silakan pilih buku yang ingin kamu pesan.</p>
                </div>
            `;
            return;
        }

        daftarKeranjangHTML.innerHTML = keranjang.map(function (item) {
            return `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <strong>${escapeHTML(item.namaBarang)}</strong>
                        <small>${escapeHTML(item.kodeBarang)}</small>
                        <div class="cart-item-price">
                            ${formatRupiah(item.harga * item.jumlah)}
                        </div>
                    </div>

                    <div class="cart-quantity">
                        <button type="button"
                            data-minus="${escapeHTML(item.kodeBarang)}">−</button>

                        <span>${item.jumlah}</span>

                        <button type="button"
                            data-plus="${escapeHTML(item.kodeBarang)}">+</button>
                    </div>

                    <button type="button"
                        class="cart-remove"
                        data-remove="${escapeHTML(item.kodeBarang)}"
                        title="Hapus item">
                        ×
                    </button>
                </div>
            `;
        }).join("");
    }

    // 10. MENGUBAH JUMLAH DAN MENGHAPUS ITEM

    daftarKeranjangHTML.addEventListener("click", function (event) {
        const tombolTambah = event.target.closest("[data-plus]");
        const tombolKurang = event.target.closest("[data-minus]");
        const tombolHapus = event.target.closest("[data-remove]");

        if (tombolTambah) {
            const item = keranjang.find(
                item => item.kodeBarang === tombolTambah.dataset.plus
            );

            const buku = daftarBuku.find(
                buku => buku.kodeBarang === tombolTambah.dataset.plus
            );

            if (item && buku) {
                if (item.jumlah < Number(buku.stok || 0)) {
                    item.jumlah++;
                } else {
                    alert("Jumlah pesanan tidak boleh melebihi stok.");
                }
            }
        }

        if (tombolKurang) {
            const item = keranjang.find(
                item => item.kodeBarang === tombolKurang.dataset.minus
            );

            if (item) {
                item.jumlah--;

                if (item.jumlah <= 0) {
                    keranjang = keranjang.filter(
                        buku => buku.kodeBarang !== tombolKurang.dataset.minus
                    );
                }
            }
        }

        if (tombolHapus) {
            const kode = tombolHapus.dataset.remove;

            keranjang = keranjang.filter(
                item => item.kodeBarang !== kode
            );
        }

        tampilkanKeranjang();
    });

    // 11. PENCARIAN BUKU

    pencarianBuku.addEventListener("input", tampilkanBuku);

    // 12. MEMBUAT NOMOR DELIVERY ORDER

    function buatNomorDO() {
        let nomor = "";

        try {
            const nomorTerakhir =
                Number(localStorage.getItem("bukuKitaNomorDO") || 20230013);

            nomor = String(nomorTerakhir + 1);

            localStorage.setItem("bukuKitaNomorDO", nomor);
        } catch (error) {
            nomor = String(Date.now()).slice(-8);
        }

        return nomor;
    }

    // 13. MEMPROSES CHECKOUT

formCheckout.addEventListener("submit", function (event) {
    event.preventDefault();

    // PENGAMAN: ADMIN TIDAK BOLEH MEMBUAT PESANAN
    if (String(penggunaAktif.role).trim().toLowerCase() === "admin") {
        alert("Akses ditolak! Admin tidak diperbolehkan melakukan checkout.");
        window.location.replace("dashboard.html");
        return;
    }

    if (keranjang.length === 0) {
            alert("Keranjang masih kosong. Silakan pilih buku terlebih dahulu.");
            return;
        }

        const namaPenerima =
            document.getElementById("receiverName").value.trim();

        const nomorTelepon =
            document.getElementById("receiverPhone").value.trim();

        const alamat =
            document.getElementById("receiverAddress").value.trim();

        const ekspedisi =
            document.getElementById("shippingService").value;

        if (!namaPenerima || !nomorTelepon || !alamat || !ekspedisi) {
            alert("Mohon lengkapi informasi pengiriman.");
            return;
        }

        // Periksa ulang stok sebelum transaksi.
        for (const item of keranjang) {
            const buku = daftarBuku.find(
                buku => buku.kodeBarang === item.kodeBarang
            );

            if (!buku || Number(buku.stok) < item.jumlah) {
                alert(
                    "Stok buku " + item.namaBarang +
                    " tidak mencukupi. Silakan periksa kembali keranjang."
                );
                return;
            }
        }

        const totalPembayaran = keranjang.reduce(function (total, item) {
            return total + item.harga * item.jumlah;
        }, 0);

        const nomorDO = buatNomorDO();

        const tanggalSekarang = new Date();
        const tanggal = tanggalSekarang.toISOString().slice(0, 10);
        const waktu = tanggalSekarang.toISOString().slice(0, 19).replace("T", " ");

        // Simpan detail item pesanan.
        const detailItem = keranjang.map(function (item) {
            return {
                kodeBarang: item.kodeBarang,
                namaBarang: item.namaBarang,
                harga: item.harga,
                jumlah: item.jumlah,
                subtotal: item.harga * item.jumlah
            };
        });

        // Format data agar bisa digunakan halaman tracking.
        const pesananBaru = {
            nomorDO: nomorDO,
            nama: namaPenerima,
            email: penggunaAktif.email,
            telepon: nomorTelepon,
            alamat: alamat,
            status: "Diproses",
            ekspedisi: ekspedisi,
            tanggal: tanggal,
            paket: "-",
            total: totalPembayaran,
            items: detailItem,
            perjalanan: [
                {
                    waktu: waktu,
                    keterangan: "Pesanan berhasil dibuat dan menunggu proses."
                }
            ]
        };

        // Ambil pesanan yang sudah tersimpan.
        let daftarPesanan = [];

        try {
            daftarPesanan = JSON.parse(
                localStorage.getItem("bukuKitaPesanan") || "[]"
            );

            if (!Array.isArray(daftarPesanan)) {
                daftarPesanan = [];
            }
        } catch (error) {
            daftarPesanan = [];
        }

        // Kurangi stok buku.
        keranjang.forEach(function (item) {
            const buku = daftarBuku.find(
                buku => buku.kodeBarang === item.kodeBarang
            );

            buku.stok = Number(buku.stok) - item.jumlah;
        });

        try {
            localStorage.setItem(
                "bukuKitaKatalog",
                JSON.stringify(daftarBuku)
            );

            daftarPesanan.push(pesananBaru);

            localStorage.setItem(
                "bukuKitaPesanan",
                JSON.stringify(daftarPesanan)
            );
        } catch (error) {
            alert("Pesanan gagal disimpan. Periksa penyimpanan browser.");
            return;
        }

        // Tampilkan nomor pesanan.
        document.getElementById("successOrderNumber").textContent =
            "DO " + nomorDO;

        modalSukses.classList.add("show");

        // Kosongkan keranjang setelah pesanan berhasil.
        keranjang = [];

        tampilkanKeranjang();
        tampilkanBuku();

        formCheckout.reset();
    });

    // 14. MENUTUP MODAL SUKSES

    tombolTutupSukses.addEventListener("click", function () {
        modalSukses.classList.remove("show");
    });

    modalSukses.addEventListener("click", function (event) {
        if (event.target === modalSukses) {
            modalSukses.classList.remove("show");
        }
    });

    // 15. LOGOUT

    const tombolLogout = document.getElementById("logoutButton");

    tombolLogout.addEventListener("click", function () {
        if (confirm("Apakah Anda yakin ingin keluar dari BukuKita?")) {
            sessionStorage.removeItem("userLogin");
            window.location.href = "index.html";
        }
    });

    // 16. SIDEBAR RESPONSIVE

    const tombolSidebar = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("sidebar");

    if (tombolSidebar && sidebar) {
        tombolSidebar.addEventListener("click", function () {
            sidebar.classList.toggle("open");
        });
    }

    // 17. TAMPILKAN DATA PERTAMA KALI

    tampilkanBuku();
    tampilkanKeranjang();

    console.log("Checkout BukuKita berhasil dimuat.");

})();

