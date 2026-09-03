CREATE TYPE "exercise_level" AS ENUM('easy', 'medium', 'hard', 'custom');--> statement-breakpoint
CREATE TYPE "exercise_type" AS ENUM('arm', 'leg');--> statement-breakpoint
CREATE TABLE "exercise" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"type" "exercise_type",
	"repetitions" integer NOT NULL,
	"sets" integer NOT NULL,
	"rests" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercise_variation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"level" "exercise_level",
	"exercise_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE INDEX "exercise_variations_exerciseId_idx" ON "exercise_variation" ("exercise_id");--> statement-breakpoint
ALTER TABLE "exercise_variation" ADD CONSTRAINT "exercise_variation_exercise_id_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id");