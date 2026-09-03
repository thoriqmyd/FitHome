import { createServerFn } from '@tanstack/react-start'
import { db } from '../db'

export const getExercise = createServerFn({ method: 'GET' })
  .validator((data: { exerciseId: string }) => data)
  .handler(async ({ data }) => {
    const result = await db.query.exercise.findFirst({
      where: { id: data.exerciseId },
      with: {
        exerciseVariations: true,
      },
    })
    return result
  })

export const getExercises = createServerFn({ method: 'GET' }).handler(async () => {
  const latihan = await db.query.exercise.findMany()
  return { latihan }
})
