import { expect, test } from "vitest"
import request from "supertest"
import { server } from "../app.ts"
import { fakerPT_BR as faker } from "@faker-js/faker"

test("cria um usuário com sucesso", async () => {
	await server.ready()
	const response = await request(server.server)
		.post("/courses")
		.set("Content-Type", "application/json")
		.send({
			title: faker.lorem.words(3),
		})
	expect(response.status).toEqual(201)
	expect(response.body).toEqual({
		id: expect.any(String),
	})
})
