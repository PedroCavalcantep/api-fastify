import { fakerPT_BR as faker } from "@faker-js/faker"
import { db } from "../../database/client.ts"
import { users } from "../../database/schema.ts"
import { randomUUID, verify } from "node:crypto"
import { hash } from "argon2"

export async function makeUser() {
	const passwordWithoutHash = randomUUID()

	const user = await db
		.insert(users)
		.values({
			email: faker.internet.email(),
			name: faker.person.fullName(),
			password: await hash(passwordWithoutHash),
		})
		.returning()
	console.log([passwordWithoutHash, await hash(passwordWithoutHash), user[0].password, verify()])
	return {
		user: user[0],
		passwordWithoutHash,
	}
}
