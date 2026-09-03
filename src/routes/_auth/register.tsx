import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '../../lib/auth-client'

export const Route = createFileRoute('/_auth/register')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!name || !email || !password) {
            setError('Nama, email, dan password wajib diisi.')
            return
        }
        if (password.length < 8) {
            setError('Password minimal 8 karakter.')
            return
        }
        if (password !== confirmPassword) {
            setError('Konfirmasi password tidak cocok.')
            return
        }

        // Client SDK (direkomendasikan TanStack Start):
        // await authClient.signUp.email({ email, password, name, callbackURL: "/dashboard" })
        //
        // Server-side equivalent sesuai dokumentasi yang Anda berikan:
        // await auth.api.signUpEmail({ body: { email, password, name } })
        await authClient.signUp.email(
            {
                email,
                password,
                name,
                callbackURL: '/dashboard',
            },
            {
                onRequest: () => setIsLoading(true),
                onSuccess: () => {
                    setIsLoading(false)
                    navigate({ to: '/dashboard' })
                },
                onError: (ctx) => {
                    setIsLoading(false)
                    setError(ctx.error.message || 'Gagal mendaftar. Coba lagi.')
                },
            },
        )
    }

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Daftar Akun HomeFit</h1>
                    <p style={styles.subtitle}>Buat akun baru untuk mulai menggunakan HomeFit</p>
                </div>

                <form onSubmit={handleSignUp} style={styles.form}>
                    {error && <div style={styles.error}>{error}</div>}

                    <div style={styles.field}>
                        <label htmlFor="name" style={styles.label}>
                            Nama Lengkap
                        </label>
                        <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.field}>
                        <label htmlFor="email" style={styles.label}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="user@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.field}>
                        <label htmlFor="password" style={styles.label}>
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Minimal 8 karakter"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                        <span style={styles.hint}>Minimal 8 karakter</span>
                    </div>

                    <div style={styles.field}>
                        <label htmlFor="confirmPassword" style={styles.label}>
                            Konfirmasi Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Ulangi password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" disabled={isLoading} style={{ ...styles.button, opacity: isLoading ? 0.7 : 1 }}>
                        {isLoading ? 'Memproses...' : 'Daftar'}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Sudah punya akun?{' '}
                    <Link to="/login" style={styles.link}>
                        Masuk di sini
                    </Link>
                </p>

                <p style={{ ...styles.footerText, fontSize: 12, color: '#6b7280', marginTop: 8 }}>
                    Mendaftar berarti Anda menyetujui Syarat & Ketentuan HomeFit.
                </p>
            </div>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        padding: '24px',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    },
    card: {
        width: '100%',
        maxWidth: 440,
        background: '#fff',
        borderRadius: 16,
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        padding: 28,
    },
    header: { marginBottom: 20, textAlign: 'center' as const },
    title: { fontSize: 22, fontWeight: 700, margin: 0, color: '#0f172a' },
    subtitle: { fontSize: 13, color: '#64748b', marginTop: 6 },
    form: { display: 'flex', flexDirection: 'column' as const, gap: 14 },
    field: { display: 'flex', flexDirection: 'column' as const, gap: 6 },
    label: { fontSize: 13, fontWeight: 600, color: '#334155' },
    input: {
        padding: '10px 12px',
        borderRadius: 10,
        border: '1px solid #cbd5e1',
        fontSize: 14,
        outline: 'none',
        background: '#fff',
        color: '#0f172a',
    },
    hint: { fontSize: 11, color: '#94a3b8' },
    button: {
        marginTop: 6,
        padding: '11px 14px',
        borderRadius: 10,
        border: 'none',
        background: '#0f172a',
        color: '#fff',
        fontWeight: 600,
        fontSize: 14,
        cursor: 'pointer',
    },
    error: {
        background: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#b91c1c',
        padding: '10px 12px',
        borderRadius: 10,
        fontSize: 13,
    },
    footerText: { marginTop: 16, textAlign: 'center' as const, fontSize: 13, color: '#475569' },
    link: { color: '#0f172a', fontWeight: 600, textDecoration: 'underline' },
}
