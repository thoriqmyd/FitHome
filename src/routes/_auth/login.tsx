import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '../../lib/auth-client'

export const Route = createFileRoute('/_auth/login')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!email || !password) {
            setError('Email dan password wajib diisi.')
            return
        }

        // Cara 1 (Client SDK - direkomendasikan untuk TanStack Start):
        // Dokumentasi Better Auth menganjurkan menggunakan authClient bukan auth.api di client.
        // auth.api.signInEmail hanya untuk server-side (createServerFn / API route).
        // Contoh server-side:
        //   await auth.api.signInEmail({ body: { email, password }, headers: ... })
        // Contoh client-side (yang kita pakai di sini):
        await authClient.signIn.email(
            {
                email,
                password,
                callbackURL: '/dashboard',
                rememberMe: true,
            },
            {
                onRequest: () => {
                    setIsLoading(true)
                },
                onSuccess: () => {
                    setIsLoading(false)
                    navigate({ to: '/dashboard' })
                },
                onError: (ctx) => {
                    setIsLoading(false)
                    setError(ctx.error.message || 'Gagal login. Periksa email & password.')
                },
            },
        )
    }

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Masuk ke HomeFit</h1>
                    <p style={styles.subtitle}>Silakan login dengan email dan password Anda</p>
                </div>

                <form onSubmit={handleSignIn} style={styles.form}>
                    {error && <div style={styles.error}>{error}</div>}

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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label htmlFor="password" style={styles.label}>
                                Password
                            </label>
                        </div>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" disabled={isLoading} style={{ ...styles.button, opacity: isLoading ? 0.7 : 1 }}>
                        {isLoading ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Belum punya akun?{' '}
                    <Link to="/register" style={styles.link}>
                        Daftar di sini
                    </Link>
                </p>

                <div style={styles.divider}>
                    <span style={styles.dividerText}>atau</span>
                </div>

                <p style={{ ...styles.footerText, fontSize: 12, color: '#6b7280' }}>
                    Server-side alternative:{' '}
                    <code style={styles.code}>auth.api.signInEmail(&#123; body: &#123; email, password &#125; &#125;)</code>
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
        maxWidth: 420,
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
    divider: {
        marginTop: 18,
        borderTop: '1px solid #e2e8f0',
        position: 'relative' as const,
        textAlign: 'center' as const,
        height: 0,
    },
    dividerText: {
        position: 'relative' as const,
        top: -9,
        background: '#fff',
        padding: '0 10px',
        fontSize: 11,
        color: '#94a3b8',
        textTransform: 'uppercase' as const,
        letterSpacing: 1,
    },
    code: { background: '#f1f5f9', padding: '2px 6px', borderRadius: 6, fontSize: 11 },
}
