import { test, expect } from "vitest"
import { server } from "../app.ts"
import request from "supertest"
import { makeCourse } from "../test/factories/make-course.ts"
import supertest from "supertest"

test("delete a course by id", async () => {
	await server.ready()

	const course = await makeCourse()
	const result = await request(server.server).delete(`/course/${course.id}`)

	expect(result.status).toEqual(200)
	expect(result.body).toEqual({
		message: expect.any(String),
		course: {
			id: expect.any(String),
			title: expect.any(String),
		},
	})
})
