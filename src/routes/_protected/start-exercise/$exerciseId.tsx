import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { api } from '../../../lib/treaty'

export const Route = createFileRoute('/_protected/start-exercise/$exerciseId')({
    component: RouteComponent,
})

// --- Config ---
const REP_DURATION_SEC = 3
const READY_COUNTDOWN_SEC = 3

type Phase = 'idle' | 'ready' | 'rep' | 'rest' | 'done' | 'paused'

type Exercise = {
    id: string
    name: string
    sets: number
    repetitions: number
    rests: number
    exerciseVariations: { id: string; name: string; level: string | null }[]
}

function RouteComponent() {
    const { exerciseId } = Route.useParams()

    // CSR sederhana via Eden Treaty (Elysia) - fetch di client, bukan via createServerFn/loader SSR
    const [exercise, setExercise] = useState<Exercise | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // workout state - harus di atas early return (Rules of Hooks)
    const [selectedVariation, setSelectedVariation] = useState<string | null>(null)
    const [phase, setPhase] = useState<Phase>('idle')
    const [prevPhase, setPrevPhase] = useState<Phase>('idle')
    const [currentSet, setCurrentSet] = useState(1)
    const [currentRep, setCurrentRep] = useState(1)
    const [timeLeft, setTimeLeft] = useState(0)
    const intervalRef = useRef<number | null>(null)

    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError(null)
            ; (async () => {
                try {
                    // Eden Treaty: GET /api/exercise/:exerciseId
                    const res: any = await (api as any).exercise({ exerciseId }).get()
                    if (res.error) throw new Error(res.error.message ?? JSON.stringify(res.error))
                    const data = res.data?.data ?? res.data
                    if (!data) throw new Error('Exercise not found')
                    if (!cancelled) {
                        setExercise(data)
                        setSelectedVariation(data.exerciseVariations?.[0]?.id ?? null)
                    }
                } catch (e: any) {
                    if (!cancelled) setError(e.message ?? 'Gagal fetch')
                } finally {
                    if (!cancelled) setLoading(false)
                }
            })()
        return () => {
            cancelled = true
        }
    }, [exerciseId])

    const isRunning = phase === 'ready' || phase === 'rep' || phase === 'rest'
    const totalSets = exercise?.sets ?? 0
    const totalReps = exercise?.repetitions ?? 0
    const restBetweenSetsSec = exercise?.rests ?? 0
    const progressTotal = totalSets * totalReps || 1
    const progressDone = (currentSet - 1) * totalReps + (phase === 'done' ? totalReps : currentRep - 1) + (phase === 'rep' ? 1 : 0)
    const progressPct = !exercise || phase === 'idle' ? 0 : phase === 'done' ? 100 : Math.round((progressDone / progressTotal) * 100)

    const clearTick = () => {
        if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    useEffect(() => {
        if (!isRunning) return
        let wakeLock: WakeLockSentinel | null = null
        // @ts-ignore
        if ('wakeLock' in navigator) navigator.wakeLock?.request('screen').then((l) => (wakeLock = l)).catch(() => { })
        return () => {
            wakeLock?.release().catch(() => { })
        }
    }, [isRunning])

    const beep = () => {
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
            const o = ctx.createOscillator()
            const g = ctx.createGain()
            o.connect(g)
            g.connect(ctx.destination)
            o.frequency.value = 880
            g.gain.value = 0.15
            o.start()
            g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2)
            setTimeout(() => ctx.close(), 250)
        } catch { }
    }

    useEffect(() => {
        if (phase === 'idle' || phase === 'done' || phase === 'paused') {
            clearTick()
            return
        }
        intervalRef.current = window.setInterval(() => {
            setTimeLeft((prev) => {
                if (prev > 1) return prev - 1
                queueMicrotask(() => {
                    if (phase === 'ready') {
                        beep()
                        setPhase('rep')
                        setCurrentSet(1)
                        setCurrentRep(1)
                        setTimeLeft(REP_DURATION_SEC)
                    } else if (phase === 'rep') {
                        if (currentRep < totalReps) {
                            beep()
                            setCurrentRep((r) => r + 1)
                            setTimeLeft(REP_DURATION_SEC)
                        } else {
                            if (currentSet < totalSets) {
                                beep()
                                setPhase('rest')
                                setTimeLeft(restBetweenSetsSec)
                            } else {
                                beep()
                                setPhase('done')
                                setTimeLeft(0)
                            }
                        }
                    } else if (phase === 'rest') {
                        beep()
                        setCurrentSet((s) => s + 1)
                        setCurrentRep(1)
                        setPhase('rep')
                        setTimeLeft(REP_DURATION_SEC)
                    }
                })
                return 0
            })
        }, 1000)
        return clearTick
    }, [phase, currentRep, currentSet, totalReps, totalSets, restBetweenSetsSec])

    const start = () => {
        if (!exercise) return
        setCurrentSet(1)
        setCurrentRep(1)
        setPhase('ready')
        setTimeLeft(READY_COUNTDOWN_SEC)
    }
    const pause = () => {
        if (!isRunning) return
        setPrevPhase(phase)
        setPhase('paused')
    }
    const resume = () => setPhase(prevPhase)
    const reset = () => {
        clearTick()
        setPhase('idle')
        setCurrentSet(1)
        setCurrentRep(1)
        setTimeLeft(0)
    }
    useEffect(() => clearTick, [])

    if (loading) return <div style={{ padding: 24 }}>Loading latihan...</div>
    if (error) return <div style={{ padding: 24, color: 'red' }}>Error: {error}</div>
    if (!exercise) return <div style={{ padding: 24 }}>Exercise tidak ditemukan</div>

    return (
        <div style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700 }}>Latihan sekarang: {exercise.name}</h1>
            <p style={{ opacity: 0.7 }}>
                {totalSets} sets × {totalReps} reps • Rest {restBetweenSetsSec}s antar set • Tempo {REP_DURATION_SEC}s / rep
            </p>

            {phase === 'idle' && exercise.exerciseVariations.length > 0 && (
                <div style={{ marginTop: 16, border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
                    <p style={{ fontWeight: 600 }}>Pilih variasi:</p>
                    {exercise.exerciseVariations.map((v) => (
                        <label key={v.id} style={{ display: 'flex', gap: 8, marginTop: 8, cursor: 'pointer' }}>
                            <input type="radio" name="variation" checked={selectedVariation === v.id} onChange={() => setSelectedVariation(v.id)} />
                            <span>{v.name} — {v.level}</span>
                        </label>
                    ))}
                </div>
            )}

            <div style={{ marginTop: 20 }}>
                <div style={{ height: 8, background: '#eee', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progressPct}%`, background: phase === 'done' ? '#16a34a' : '#111', transition: 'width 0.3s' }} />
                </div>
                <p style={{ fontSize: 12, opacity: 0.6, marginTop: 6 }}>{progressPct}% • Set {currentSet}/{totalSets} • Rep {currentRep}/{totalReps}</p>
            </div>

            <div style={{ marginTop: 24, border: '2px solid #111', borderRadius: 16, padding: 24, textAlign: 'center' }}>
                {phase === 'idle' && <><p style={{ fontSize: 48 }}>🏋️</p><p>Siap memulai?</p></>}
                {phase === 'ready' && <><p style={{ fontSize: 14, opacity: 0.6 }}>BERSIAP</p><p style={{ fontSize: 72, fontWeight: 800 }}>{timeLeft}</p><p>Set {currentSet} akan dimulai</p></>}
                {phase === 'rep' && <><p style={{ fontSize: 14, opacity: 0.6 }}>REP {currentRep}/{totalReps} • SET {currentSet}/{totalSets}</p><p style={{ fontSize: 72, fontWeight: 800 }}>{timeLeft}</p><p>Gerakan {REP_DURATION_SEC}s</p></>}
                {phase === 'rest' && <><p style={{ fontSize: 14, opacity: 0.6 }}>ISTIRAHAT</p><p style={{ fontSize: 72, fontWeight: 800 }}>{timeLeft}s</p><p>Set {currentSet} selesai • Lanjut Set {currentSet + 1}</p></>}
                {phase === 'paused' && <><p style={{ fontSize: 48 }}>⏸️</p><p>Jeda — {timeLeft}s tersisa</p></>}
                {phase === 'done' && <><p style={{ fontSize: 48 }}>✅</p><p style={{ fontSize: 20, fontWeight: 700 }}>Selesai!</p><p>{totalSets * totalReps} reps tuntas</p></>}
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                {phase === 'idle' && <button onClick={start} style={btnPrimary}>Mulai Latihan</button>}
                {phase === 'done' && <button onClick={reset} style={btnPrimary}>Ulangi</button>}
                {isRunning && <><button onClick={pause} style={btnSec}>Pause</button><button onClick={reset} style={btnGhost}>Batal</button></>}
                {phase === 'paused' && <><button onClick={resume} style={btnPrimary}>Lanjutkan</button><button onClick={reset} style={btnGhost}>Reset</button></>}
            </div>

            <p style={{ marginTop: 16, fontSize: 12, opacity: 0.5 }}>
                CSR via Eden Treaty: fetch ke /api/exercise/:id di client (useEffect). Alur: Ready {READY_COUNTDOWN_SEC}s → [Rep {REP_DURATION_SEC}s × {totalReps}] → Rest {restBetweenSetsSec}s → ulang set → Done.
            </p>
        </div>
    )
}

const btnPrimary: React.CSSProperties = { flex: 1, padding: '12px 16px', background: '#111', color: '#fff', borderRadius: 10, border: 'none', fontWeight: 700, cursor: 'pointer' }
const btnSec: React.CSSProperties = { flex: 1, padding: '12px 16px', background: '#fff', color: '#111', borderRadius: 10, border: '1px solid #111', fontWeight: 700, cursor: 'pointer' }
const btnGhost: React.CSSProperties = { padding: '12px 16px', background: '#f5f5f5', color: '#111', borderRadius: 10, border: 'none', cursor: 'pointer' }
