import { createFileRoute, Link } from '@tanstack/react-router'
import { getExercises } from '../../lib/exercise.functions'

export const Route = createFileRoute('/_protected/latihan')({
    component: RouteComponent,
    loader: async () => {
        const data = await getExercises()
        return data
    }
})

function RouteComponent() {
    const data = Route.useLoaderData()

    return <>
        <div>Berikut list latihan</div>
        {data.latihan.map((x: any, i: any) => {
            return (
                <div key={i}>
                    <p>nama: {x.name}</p>
                    <p>reps: {x.repetitions}</p>
                    <p>sets: {x.sets}</p>
                    <p>rests: {x.rests} minutes</p>
                    <Link to="/start-exercise/$exerciseId" params={{ exerciseId: x.id }}>Mulai Latihan</Link>
                </div>
            )
        })}
    </>
}
