import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

const TABS = [
  { id: 'tab-program', label: 'Program Workout', icon: 'fa-list-check' },
  { id: 'tab-latihan', label: 'Latihan Harian', icon: 'fa-calendar-day' },
  { id: 'tab-video', label: 'Video Workout', icon: 'fa-video' },
  { id: 'tab-progress', label: 'Tracking Progress', icon: 'fa-chart-line' },
  { id: 'tab-nutrisi', label: 'Nutrisi', icon: 'fa-apple-whole' },
  { id: 'tab-komunitas', label: 'Komunitas', icon: 'fa-comments' },
  { id: 'tab-fitur', label: 'Fitur Pendukung', icon: 'fa-clock' },
  { id: 'tab-profil', label: 'Akun Profil', icon: 'fa-user' },
] as const

function RouteComponent() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('tab-program')
  const [authOpen, setAuthOpen] = useState(false)
  const [premiumOpen, setPremiumOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [authEmail, setAuthEmail] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // close mobile on resize >768? optional
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAuthOpen(false)
        setPremiumOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div
      className="bg-[var(--bg-dark)] text-[var(--text-light)] leading-[1.6] overflow-x-hidden antialiased"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-[1000] border-b border-[var(--card-border)] bg-[rgba(15,17,21,0.95)] backdrop-blur-[8px]">
        <div className="max-w-[1200px] mx-auto px-5 py-[15px] flex justify-between items-center">
          <a href="#" className="flex items-center gap-2.5 text-[24px] md:text-[24px] text-[20px] font-extrabold text-[var(--text-light)] uppercase tracking-[1px] no-underline max-[420px]:text-[20px]">
            <i className="fa-solid fa-dumbbell text-[var(--accent-yellow)]" />
            Fit<span className="text-[var(--accent-yellow)]">Home</span>
          </a>

          {/* desktop nav + mobile drawer */}
          <ul
            id="navLinks"
            className={`${
              mobileOpen ? 'max-h-[400px]' : 'max-h-0 md:max-h-none'
            } md:static fixed top-[66px] left-0 right-0 bg-[var(--bg-dark)] md:bg-transparent border-b md:border-0 border-[var(--card-border)] flex flex-col md:flex-row list-none md:gap-[25px] gap-0 overflow-hidden transition-[max-height] duration-300 md:overflow-visible md:max-h-none`}
          >
            <li className="w-full md:w-auto border-b md:border-0 border-[var(--card-border)]">
              <a onClick={() => { scrollTo('hero'); setMobileOpen(false) }} className="block md:inline px-5 py-4 md:p-0 text-[var(--text-muted)] hover:text-[var(--accent-yellow)] text-[15px] md:text-[14px] font-medium transition-colors cursor-pointer">Beranda</a>
            </li>
            <li className="w-full md:w-auto border-b md:border-0 border-[var(--card-border)]">
              <a onClick={() => { scrollTo('programs'); setMobileOpen(false) }} className="block md:inline px-5 py-4 md:p-0 text-[var(--text-muted)] hover:text-[var(--accent-yellow)] text-[15px] md:text-[14px] font-medium transition-colors cursor-pointer">Program</a>
            </li>
            <li className="w-full md:w-auto border-b md:border-0 border-[var(--card-border)]">
              <a onClick={() => { scrollTo('dashboard-section'); setMobileOpen(false) }} className="block md:inline px-5 py-4 md:p-0 text-[var(--text-muted)] hover:text-[var(--accent-yellow)] text-[15px] md:text-[14px] font-medium transition-colors cursor-pointer">Dashboard</a>
            </li>
            <li className="w-full md:w-auto border-b-0">
              <a onClick={() => { scrollTo('about'); setMobileOpen(false) }} className="block md:inline px-5 py-4 md:p-0 text-[var(--text-muted)] hover:text-[var(--accent-yellow)] text-[15px] md:text-[14px] font-medium transition-colors cursor-pointer">Tentang Us</a>
            </li>
          </ul>

          <div className="flex items-center gap-2.5 md:gap-[15px]">
            <Link to="/login" className="bg-transparent text-[var(--text-light)] border border-[var(--card-border)] px-3.5 md:px-5 py-2 md:py-2.5 rounded text-[12px] md:text-[13px] font-semibold hover:border-[var(--accent-yellow)] hover:text-[var(--accent-yellow)] transition-colors">
              Login
            </Link>
            <button onClick={() => setPremiumOpen(true)} className="bg-[var(--accent-yellow)] text-black px-3.5 md:px-[22px] py-2 md:py-2.5 rounded font-bold text-[12px] md:text-[13px] uppercase hover:bg-[var(--accent-yellow-hover)] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">
              Gabung Premium
            </button>
            <button
              id="hamburgerBtn"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              className="md:hidden flex bg-transparent border border-[var(--card-border)] text-[var(--text-light)] w-10 h-10 rounded items-center justify-center text-[18px] cursor-pointer"
            >
              <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="min-h-screen md:min-h-screen max-[768px]:min-h-0 flex items-center pt-[100px] md:pt-[120px] pb-10 md:pb-[60px] px-5 max-w-[1200px] mx-auto flex-col lg:flex-row gap-8 lg:gap-0 text-center lg:text-left">
        <div className="flex-1 max-w-full lg:max-w-[600px] z-10">
          <div className="text-[var(--accent-yellow)] font-bold tracking-[2px] uppercase text-[14px] mb-2.5">Bentuk Kekuatan. Bangun Kepercayaan Diri.</div>
          <h1 className="text-[28px] md:text-[34px] lg:text-[54px] leading-[1.1] font-extrabold uppercase mb-5">
            JADI VERSI <span className="text-[var(--accent-yellow)] block">TERBAIKMU</span>
          </h1>
          <p className="text-[var(--text-muted)] text-[15px] mb-[30px] max-w-[480px] mx-auto lg:mx-0">
            Bergabunglah dengan komunitas yang mendorong, mendukung, dan membantu Anda menjadi versi terkuat dari diri Anda sendiri dari rumah.
          </p>
          <div className="flex gap-[15px] items-center flex-wrap justify-center lg:justify-start max-[420px]:flex-col max-[420px]:items-stretch">
            <Link to="/register" className="bg-[var(--accent-yellow)] text-black px-[22px] py-2.5 rounded font-bold text-[13px] uppercase hover:bg-[var(--accent-yellow-hover)] hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2">
              Mulai Sekarang <i className="fa-solid fa-arrow-right" />
            </Link>
            <a onClick={() => showToast('Memutar video pengenalan...')} className="flex items-center justify-center lg:justify-start gap-2.5 text-[var(--text-light)] font-semibold text-[14px] cursor-pointer">
              <i className="fa-solid fa-play w-10 h-10 rounded-full bg-[rgba(255,193,7,0.2)] text-[var(--accent-yellow)] flex items-center justify-center" />
              Tonton Video
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center lg:justify-end mt-7 lg:mt-0">
          <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80" alt="Fitness Model" className="max-w-[85%] lg:max-w-full h-auto rounded-xl grayscale-[20%] contrast-[110%]" />
        </div>
      </section>

      {/* FEATURES STRIP */}
      <div className="bg-[var(--card-bg)] border-y border-[var(--card-border)] py-[30px] px-5 mb-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[25px] md:gap-[25px] max-[768px]:gap-5">
          {[
            { icon: 'fa-dumbbell', title: 'Peralatan Modern', desc: 'Panduan latihan dengan atau tanpa alat rumah tangga.' },
            { icon: 'fa-user-ninja', title: 'Pelatih Ahli', desc: 'Instruktur tersertifikasi membimbing setiap langkah Anda.' },
            { icon: 'fa-clipboard-list', title: 'Rencana Personal', desc: 'Program workout & diet yang disesuaikan dengan target.' },
            { icon: 'fa-users', title: 'Komunitas Suportif', desc: 'Lingkungan positif yang membuat Anda tetap termotivasi.' },
          ].map((f) => (
            <div key={f.title} className="flex gap-[15px] items-start">
              <div className="bg-[rgba(255,193,7,0.1)] text-[var(--accent-yellow)] w-12 h-12 rounded-lg flex items-center justify-center text-[20px] shrink-0">
                <i className={`fa-solid ${f.icon}`} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold uppercase mb-1">{f.title}</h4>
                <p className="text-xs text-[var(--text-muted)]">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROGRAM */}
      <section id="programs" className="max-w-[1200px] mx-auto mb-[100px] px-5">
        <div className="text-center mb-[50px]">
          <div className="text-[var(--accent-yellow)] text-xs font-bold tracking-[2px] uppercase">Program Kami</div>
          <h2 className="text-[24px] md:text-[32px] font-extrabold uppercase mt-[5px]">LATIHAN. FOKUS. CAPAI.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=500&q=80', icon: 'fa-dumbbell', title: 'Strength Training', desc: 'Bentuk otot tanpa lemak dan tingkatkan kekuatan tubuh secara keseluruhan.' },
            { img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80', icon: 'fa-fire', title: 'Weight Loss', desc: 'Program pembakaran lemak efektif untuk hidup yang lebih sehat.' },
            { img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80', icon: 'fa-bolt', title: 'Functional Training', desc: 'Tingkatkan mobilitas, daya tahan, dan performa aktivitas harian.' },
            { img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80', icon: 'fa-spa', title: 'Yoga & Wellness', desc: 'Seimbangkan tubuh dan pikiran Anda dengan yoga dan peregangan.' },
          ].map((p) => (
            <div key={p.title} className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg overflow-hidden hover:border-[var(--accent-yellow)] hover:-translate-y-1 transition-all">
              <img src={p.img} className="h-[180px] w-full object-cover" alt={p.title} />
              <div className="p-5">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <i className={`fa-solid ${p.icon} text-[var(--accent-yellow)]`} />
                  <h3 className="text-[15px] font-bold uppercase">{p.title}</h3>
                </div>
                <p className="text-xs text-[var(--text-muted)] mb-[15px]">{p.desc}</p>
                <a onClick={() => { showToast(`Program ${p.title} dipilih!`); scrollTo('dashboard-section') }} className="text-[var(--accent-yellow)] no-underline text-xs font-bold uppercase inline-flex items-center gap-1.5 cursor-pointer">
                  Pelajari Lebih Lanjut <i className="fa-solid fa-arrow-right" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DASHBOARD WORKSPACE */}
      <section id="dashboard-section" className="max-w-[1200px] mx-auto mb-[100px] px-5">
        <div className="text-center mb-[50px]">
          <div className="text-[var(--accent-yellow)] text-xs font-bold tracking-[2px] uppercase">Fitur Aplikasi</div>
          <h2 className="text-[24px] md:text-[32px] font-extrabold uppercase mt-[5px]">DASHBOARD USER & FITUR SISTEM</h2>
        </div>

        <div id="dashboardApp" className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl p-[15px] md:p-[30px]">
          <div className="flex justify-between items-center border-b border-[var(--card-border)] pb-5 mb-[30px] flex-col md:flex-row gap-[15px] md:items-center items-start">
            <div>
              <h3 className="text-xl font-bold">Halo, FitHome User!</h3>
              <p className="text-[13px] text-[var(--text-muted)]">Status Akun: Free Tier</p>
            </div>
            <div className="bg-[rgba(255,193,7,0.15)] text-[var(--accent-yellow)] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase whitespace-nowrap">FREE MEMBER</div>
          </div>

          <div className="flex gap-2.5 overflow-x-auto border-b border-[var(--card-border)] pb-[15px] mb-[25px] touch-pan-x scrollbar-thin">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`shrink-0 whitespace-nowrap flex items-center gap-2 px-[18px] py-2.5 rounded-md text-[13px] font-semibold border transition-colors ${
                  activeTab === t.id ? 'bg-[var(--accent-yellow)] text-black border-[var(--accent-yellow)]' : 'bg-transparent border-[var(--card-border)] text-[var(--text-muted)] hover:bg-[var(--accent-yellow)] hover:text-black hover:border-[var(--accent-yellow)]'
                }`}
              >
                <i className={`fa-solid ${t.icon}`} /> {t.label}
              </button>
            ))}
          </div>

          {/* tab-program */}
          {activeTab === 'tab-program' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-[var(--bg-dark)] border border-[var(--card-border)] rounded-lg p-5">
                <h4 className="text-base mb-[15px] text-[var(--accent-yellow)] flex items-center gap-2">1. Pilih Tujuan</h4>
                <div className="mb-[15px]">
                  <select className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] p-2.5 rounded text-white text-[13px] focus:outline-none focus:border-[var(--accent-yellow)]">
                    <option>Muscle Gain (Tambah Otot)</option>
                    <option>Fat Loss (Bakar Lemak)</option>
                    <option>Strength (Kekuatan)</option>
                    <option>Endurance (Daya Tahan)</option>
                  </select>
                </div>
              </div>
              <div className="bg-[var(--bg-dark)] border border-[var(--card-border)] rounded-lg p-5">
                <h4 className="text-base mb-[15px] text-[var(--accent-yellow)] flex items-center gap-2">2. Pilih Level</h4>
                <div className="mb-[15px]">
                  <select className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] p-2.5 rounded text-white text-[13px] focus:outline-none focus:border-[var(--accent-yellow)]">
                    <option>Beginner (Pemula)</option>
                    <option>Intermediate (Menengah)</option>
                    <option>Advanced (Mahir)</option>
                  </select>
                </div>
              </div>
              <div className="bg-[var(--bg-dark)] border border-[var(--card-border)] rounded-lg p-5">
                <h4 className="text-base mb-[15px] text-[var(--accent-yellow)] flex items-center gap-2">3. Lihat Program & Jadwal</h4>
                <p className="text-[13px] text-[var(--text-muted)] mb-2.5">Rekomendasi: 4 Hari / Minggu (Full Body & Cardio)</p>
                <Link to="/latihan" className="bg-[var(--accent-yellow)] text-black px-[18px] py-2.5 rounded font-bold text-[13px] uppercase inline-flex hover:bg-[var(--accent-yellow-hover)] transition-colors">Mulai Program</Link>
              </div>
            </div>
          )}

          {activeTab === 'tab-latihan' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[var(--bg-dark)] border border-[var(--card-border)] rounded-lg p-5">
                <h4 className="text-base mb-[15px] text-[var(--accent-yellow)] flex items-center gap-2">Rencana Hari Ini</h4>
                <p className="text-[13px]"><strong>Sesi:</strong> Push-Up & Core Training</p>
                <ul className="text-xs text-[var(--text-muted)] my-2.5 ml-5 list-disc">
                  <li>Push-Up: 3 Set x 12 Reps</li>
                  <li>Plank: 3 Set x 45 Detik</li>
                  <li>Bodyweight Squat: 4 Set x 15 Reps</li>
                </ul>
                <Link to="/latihan" className="bg-[var(--accent-yellow)] text-black px-[18px] py-2.5 rounded font-bold text-[13px] uppercase inline-flex hover:bg-[var(--accent-yellow-hover)] transition-colors">Selesai Latihan</Link>
              </div>
            </div>
          )}

          {activeTab === 'tab-video' && (
            <div className="grid grid-cols-1 gap-5">
              <div className="bg-[var(--bg-dark)] border border-[var(--card-border)] rounded-lg p-5">
                <h4 className="text-base mb-[15px] text-[var(--accent-yellow)] flex items-center gap-2">Kategori & Panduan Teknik</h4>
                <p className="text-xs text-[var(--text-muted)] mb-2.5">Video tutorial gerakan dasar dengan posture alignment yang tepat.</p>
                <button onClick={() => showToast('Video disimpan ke Favorit!')} className="bg-transparent text-[var(--text-light)] border border-[var(--card-border)] px-5 py-2.5 rounded font-semibold text-[13px] hover:border-[var(--accent-yellow)] hover:text-[var(--accent-yellow)] transition-colors">
                  <i className="fa-solid fa-bookmark mr-2" /> Simpan ke Favorit
                </button>
              </div>
            </div>
          )}

          {activeTab === 'tab-progress' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[var(--bg-dark)] border border-[var(--card-border)] rounded-lg p-5">
                <h4 className="text-base mb-[15px] text-[var(--accent-yellow)]">Berat Badan & Measurement</h4>
                <div className="mb-[15px]">
                  <label className="block text-xs text-[var(--text-muted)] mb-1.5">Catat Berat Badan (kg):</label>
                  <input defaultValue={70} type="number" className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] p-2.5 rounded text-white text-[13px] focus:outline-none focus:border-[var(--accent-yellow)]" />
                </div>
                <button onClick={() => showToast('Progress Berhasil Dicatat!')} className="bg-[var(--accent-yellow)] text-black px-[18px] py-2.5 rounded font-bold text-[13px] uppercase hover:bg-[var(--accent-yellow-hover)] transition-colors">Catat Hasil</button>
              </div>
              <div className="bg-[var(--bg-dark)] border border-[var(--card-border)] rounded-lg p-5">
                <h4 className="text-base mb-[15px] text-[var(--accent-yellow)]">Grafik Progress</h4>
                <p className="text-xs text-[var(--text-muted)]">Target Bulanan: 75% Tercapai</p>
                <div className="bg-[var(--card-border)] h-2.5 rounded-full overflow-hidden my-2.5">
                  <div className="bg-[var(--accent-yellow)] h-full w-[65%]" />
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">Riwayat: 12 Sesi latihan bulan ini</p>
              </div>
            </div>
          )}

          {activeTab === 'tab-nutrisi' && (
            <div className="grid gap-5">
              <div className="bg-[var(--bg-dark)] border border-[var(--card-border)] rounded-lg p-5">
                <h4 className="text-base mb-[15px] text-[var(--accent-yellow)]">Kalkulator Kalori & Pola Makan</h4>
                <div className="mb-[15px]">
                  <label className="block text-xs text-[var(--text-muted)] mb-1.5">Asupan Kalori Harian (kcal):</label>
                  <input defaultValue={2100} type="number" className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] p-2.5 rounded text-white text-[13px] focus:outline-none focus:border-[var(--accent-yellow)]" />
                </div>
                <button onClick={() => showToast('Catatan Asupan Disimpan!')} className="bg-[var(--accent-yellow)] text-black px-[18px] py-2.5 rounded font-bold text-[13px] uppercase hover:bg-[var(--accent-yellow-hover)] transition-colors">Simpan Asupan</button>
              </div>
            </div>
          )}

          {activeTab === 'tab-komunitas' && (
            <div className="grid gap-5">
              <div className="bg-[var(--bg-dark)] border border-[var(--card-border)] rounded-lg p-5">
                <h4 className="text-base mb-[15px] text-[var(--accent-yellow)]">Forum & Tantangan (Challenge)</h4>
                <p className="text-xs text-[var(--text-muted)] mb-2.5">Ikuti 30-Day Pushup Challenge bersama member lain!</p>
                <button onClick={() => showToast('Progress berhasil dibagikan ke Forum!')} className="bg-transparent text-[var(--text-light)] border border-[var(--card-border)] px-5 py-2.5 rounded font-semibold text-[13px] hover:border-[var(--accent-yellow)] hover:text-[var(--accent-yellow)] transition-colors">
                  <i className="fa-solid fa-share-nodes mr-2" /> Bagikan Progress
                </button>
              </div>
            </div>
          )}

          {activeTab === 'tab-fitur' && (
            <div className="grid gap-5">
              <div className="bg-[var(--bg-dark)] border border-[var(--card-border)] rounded-lg p-5">
                <h4 className="text-base mb-[15px] text-[var(--accent-yellow)]">Timer & Stopwatch</h4>
                <h2 className="text-[var(--accent-yellow)] text-[28px] my-2.5 font-bold">00:45</h2>
                <button onClick={() => showToast('Timer Dimulai!')} className="bg-[var(--accent-yellow)] text-black px-[18px] py-2.5 rounded font-bold text-[13px] uppercase hover:bg-[var(--accent-yellow-hover)] transition-colors">Start Rest Timer</button>
              </div>
            </div>
          )}

          {activeTab === 'tab-profil' && (
            <div className="grid gap-5">
              <div className="bg-[var(--bg-dark)] border border-[var(--card-border)] rounded-lg p-5">
                <h4 className="text-base mb-[15px] text-[var(--accent-yellow)]">Pengaturan Akun</h4>
                <p className="text-[13px]">Data Pribadi & Notifikasi</p>
                <br />
                <button onClick={() => showToast('Anda telah Log Out.')} className="bg-transparent text-[#ff4d4d] border border-[#ff4d4d] px-5 py-2.5 rounded font-semibold text-[13px] hover:bg-[#ff4d4d] hover:text-white transition-colors">Log Out (Keluar)</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-[1200px] mx-auto mb-[100px] px-5">
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-5 md:p-6 flex gap-[30px] items-center flex-wrap">
          <div className="flex-1 min-w-[280px]">
            <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80" className="w-full rounded-lg" alt="Gym Community" />
          </div>
          <div className="flex-1 min-w-[280px] text-center md:text-left">
            <div className="text-[var(--accent-yellow)] text-xs font-bold tracking-[2px] uppercase">TENTANG KAMI</div>
            <h2 className="text-[24px] md:text-[32px] font-extrabold uppercase mb-[15px] mt-1">LEBIH DARI SEBUAH GYM, KAMI ADALAH KOMUNITAS.</h2>
            <p className="text-[var(--text-muted)] text-sm mb-5">
              Di FitHome, kami percaya bahwa kebugaran adalah gaya hidup. Misi kami adalah membantu Anda tetap konsisten, menjadi lebih kuat, dan menjalani hidup yang lebih sehat dari mana saja.
            </p>
            <Link to="/register" className="bg-[var(--accent-yellow)] text-black px-[22px] py-2.5 rounded font-bold text-[13px] uppercase inline-flex items-center gap-2 hover:bg-[var(--accent-yellow-hover)] transition-colors">
              Bergabung dengan Komunitas <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#08090b] border-t border-[var(--card-border)] py-10 px-5 text-[13px] text-[var(--text-muted)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] md:gap-[25px]">
          <div>
            <h5 className="text-[var(--text-light)] text-sm mb-[15px] uppercase font-semibold"><i className="fa-solid fa-location-dot mr-2" /> Alamat</h5>
            <p>123 Fitness Street,<br />Coimbatore, Tamil Nadu 641001</p>
          </div>
          <div>
            <h5 className="text-[var(--text-light)] text-sm mb-[15px] uppercase font-semibold"><i className="fa-solid fa-phone mr-2" /> Telepon</h5>
            <p>+91 91596 81276</p>
          </div>
          <div>
            <h5 className="text-[var(--text-light)] text-sm mb-[15px] uppercase font-semibold"><i className="fa-solid fa-envelope mr-2" /> Email</h5>
            <p>hello@fithome.com</p>
          </div>
          <div>
            <h5 className="text-[var(--text-light)] text-sm mb-[15px] uppercase font-semibold"><i className="fa-solid fa-clock mr-2" /> Jam Operasional</h5>
            <p>Sen - Sab: 5:30 AM - 10:00 PM</p>
            <p>Minggu: 6:00 AM - 1:00 PM</p>
          </div>
        </div>
        <div className="text-center mt-10 pt-5 border-t border-[var(--card-border)]">
          <p>&copy; 2026 FitHome. All Rights Reserved. Designed according to UI & Flowchart spec.</p>
        </div>
      </footer>

      {/* MODAL AUTH */}
      {authOpen && (
        <div onClick={() => setAuthOpen(false)} className="fixed inset-0 bg-black/85 flex justify-center items-center z-[2000] p-5">
          <div onClick={(e) => e.stopPropagation()} className="bg-[var(--card-bg)] border border-[var(--card-border)] w-full max-w-[420px] p-[22px] md:p-[30px] rounded-xl relative max-h-[90vh] overflow-y-auto">
            <i onClick={() => setAuthOpen(false)} className="fa-solid fa-xmark absolute top-[15px] right-[15px] text-[var(--text-muted)] cursor-pointer text-lg" />
            <div className="text-xl font-bold mb-5 uppercase text-[var(--accent-yellow)]">Login / Register</div>
            <div className="mb-[15px]">
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Email Address</label>
              <input value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} type="email" placeholder="user@fithome.com" className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] p-2.5 rounded text-white text-[13px] focus:outline-none focus:border-[var(--accent-yellow)]" />
            </div>
            <div className="mb-[15px]">
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] p-2.5 rounded text-white text-[13px] focus:outline-none focus:border-[var(--accent-yellow)]" />
            </div>
            <button
              onClick={() => {
                if (!authEmail) { showToast('Silakan masukkan email Anda.'); return }
                setAuthOpen(false)
                showToast('Login Berhasil! Mengalihkan ke Dashboard...')
                scrollTo('dashboard-section')
              }}
              className="w-full justify-center bg-[var(--accent-yellow)] text-black px-[22px] py-2.5 rounded font-bold text-[13px] uppercase hover:bg-[var(--accent-yellow-hover)] transition-colors inline-flex"
            >
              Masuk ke Dashboard
            </button>
            <p className="text-center text-xs text-[var(--text-muted)] mt-3">
              Sudah punya akun? <Link to="/login" className="text-[var(--accent-yellow)] underline">Login asli</Link>
            </p>
          </div>
        </div>
      )}

      {/* MODAL PREMIUM */}
      {premiumOpen && (
        <div onClick={() => setPremiumOpen(false)} className="fixed inset-0 bg-black/85 flex justify-center items-center z-[2000] p-5">
          <div onClick={(e) => e.stopPropagation()} className="bg-[var(--card-bg)] border border-[var(--card-border)] w-full max-w-[420px] p-[22px] md:p-[30px] rounded-xl relative max-h-[90vh] overflow-y-auto">
            <i onClick={() => setPremiumOpen(false)} className="fa-solid fa-xmark absolute top-[15px] right-[15px] text-[var(--text-muted)] cursor-pointer text-lg" />
            <div className="text-xl font-bold mb-5 uppercase text-[var(--accent-yellow)]">Akses Premium</div>
            <p className="text-[13px] text-[var(--text-muted)] mb-[15px]">Dapatkan Program Eksklusif, Video Premium, Konsultasi Trainer, & Tanpa Iklan.</p>
            <div className="mb-[15px]">
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Pilih Paket</label>
              <select className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] p-2.5 rounded text-white text-[13px] focus:outline-none focus:border-[var(--accent-yellow)]">
                <option>Paket Bulanan - Rp 99.000 / bln</option>
                <option>Paket Tahunan - Rp 799.000 / thn</option>
              </select>
            </div>
            <div className="mb-[15px]">
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Metode Pembayaran</label>
              <select className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] p-2.5 rounded text-white text-[13px] focus:outline-none focus:border-[var(--accent-yellow)]">
                <option>Transfer Bank / QRIS</option>
                <option>Kartu Kredit / Debit</option>
                <option>E-Wallet (Gopay/OVO/Dana)</option>
              </select>
            </div>
            <button
              onClick={() => {
                setPremiumOpen(false)
                showToast('Pembayaran Berhasil! Email Konfirmasi Telah Dikirim.')
              }}
              className="w-full justify-center bg-[var(--accent-yellow)] text-black px-[22px] py-2.5 rounded font-bold text-[13px] uppercase hover:bg-[var(--accent-yellow-hover)] transition-colors inline-flex"
            >
              Konfirmasi Pembayaran
            </button>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 left-5 md:left-auto bg-[var(--accent-yellow)] text-black py-3 px-5 rounded-md font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.3)] z-[3000] text-center">
          {toast}
        </div>
      )}
    </div>
  )
}
