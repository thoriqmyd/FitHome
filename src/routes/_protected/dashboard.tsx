import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <Link to='/profile'>Go Profile</Link>
            <br />
            <Link to='/latihan'>Mulai Latihan</Link>
        </>
    )
}
