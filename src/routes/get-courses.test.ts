import { expect, test } from "vitest"
import request from "supertest"
import { server } from "../app.ts"
import { makeCourse } from "../test/factories/make-course.ts"
import { randomUUID } from "node:crypto"

test("get course by id", async () => {
	await server.ready()
	const courseTitle = randomUUID()
	const course = await makeCourse(courseTitle)

	const response = await request(server.server).get(`/courses?search=${courseTitle}`)

	expect(response.status).toEqual(200)
	expect(response.body).toEqual({
		courses: [
			{
				id: course.id,
				title: courseTitle,
				enrollments: 0,
			},
		],
	})
})
