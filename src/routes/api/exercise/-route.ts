import Elysia, { t } from "elysia";
import { db } from "../../../db";

export const exerciseRoute = new Elysia({ prefix: "/exercise" })
    .get("/", { message: "this is exercise's route" }, {
        detail: {
            description: "testing route",
            summary: "test the route"
        }
    })
    .get("/all", async ({ set }) => {
        try {
            const exercises = await db.query.exercise.findMany()
            return {
                data: exercises
            }
        } catch (error) {
            set.status = 500
            return {
                message: "internal server error"
            }
        }
    }, {
        detail: {
            summary: "get all exercises",
        }
    })
    .get("/:exerciseId", async ({ params: { exerciseId }, set }) => {
        try {
            const exercise = await db.query.exercise.findFirst({
                where: {
                    id: exerciseId
                },
                with: {
                    exerciseVariations: true
                }
            })
            return {
                data: exercise
            }
        } catch (error) {
            set.status = 500
            return {
                message: "server internal error"
            }
        }
    }, {
        params: t.Object({
            exerciseId: t.String()
        }),
        detail: {
            summary: "get one exercise with id",
            description: "get the exercise id. if don't know which one, get it from `/all` endpoint"
        }
    })
    .get("/:exerciseId/variants", async ({ params: { exerciseId }, set }) => {
        try {
            const variants = await db.query.exercise.findFirst({
                where: {
                    id: exerciseId
                },
                with: {
                    exerciseVariations: true
                }
            })

            return {
                data: variants
            }
        } catch (error) {
            set.status = 500
            return {
                message: "internal server error"
            }
        }
    }, {
        params: t.Object({
            exerciseId: t.String()
        }),
        detail: {
            summary: "get exercise's variants",
            description: "get the exercise's id first"
        }
    })
    .post("/session", async () => {
        try {
            const
        } catch (error) {

        }
    })