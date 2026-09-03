import { createFileRoute } from '@tanstack/react-router'
import { useSession } from '../../lib/auth-client'

export const Route = createFileRoute('/_protected/profile')({
    component: RouteComponent,
})

function RouteComponent() {
    const session = useSession()

    if (session.isPending) return <h1>Loading</h1>
    if (session.error) return <h1>error: {session.error.message}</h1>

    return (
        <>
            <h1>nama: {session.data?.user.name}</h1>
            <h1>email: {session.data?.user.email}</h1>
        </>
    )
}
