import { expect, test } from "vitest"
import request from "supertest"
import { server } from "../app.ts"
import { makeCourse } from "../test/factories/make-course.ts"

test("get course by id", async () => {
	await server.ready()
	const courseId = (await makeCourse()).id

	const response = await request(server.server).get(`/courses/${courseId}`)

	expect(response.status).toEqual(200)
	expect(response.body).toEqual({
		course: {
			id: expect.any(String),
			title: expect.any(String),
			description: null,
		},
	})
})
