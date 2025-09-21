ALTER TABLE "users" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "enrollments_courseId_userId_index" ON "enrollments" USING btree ("courseId","userId");