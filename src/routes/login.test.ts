import { expect, test } from "vitest"
import request from "supertest"
import { server } from "../app.ts"
import { fakerPT_BR as faker } from "@faker-js/faker"
import { makeUser } from "../test/factories/make-user.ts"

test("login", async () => {
	await server.ready()

	const { user, passwordWithoutHash } = await makeUser()
	console.log(user)

	const response = await request(server.server)
		.post("/sessions")
		.set("Content-Type", "application/json")
		.send({
			email: user.email,
			passoword: passwordWithoutHash,
		})
	expect(response.status).toEqual(200)
	expect(response.body).toEqual({
		message: "ok",
	})
})
