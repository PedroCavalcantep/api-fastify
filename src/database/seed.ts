import { fakerPT_BR as faker } from "@faker-js/faker"
import { db } from "./client.ts"
import { courses, enrollments, users } from "./schema.ts"

async function seed() {
	const userInsert = await db
		.insert(users)
		.values([
			{
				name: faker.person.fullName(),
				email: faker.internet.email(),
			},
			{
				name: faker.person.fullName(),
				email: faker.internet.email(),
			},
			{
				name: faker.person.fullName(),
				email: faker.internet.email(),
			},
			{
				name: faker.person.fullName(),
				email: faker.internet.email(),
			},
		])
		.returning()
	const coursesInsert = await db
		.insert(courses)
		.values([
			{
				title: faker.lorem.words(4),
			},
			{
				title: faker.lorem.words(4),
			},
			{
				title: faker.lorem.words(4),
			},
			{
				title: faker.lorem.words(4),
			},
		])
		.returning()
	const enrollmentsInsert = await db.insert(enrollments).values([
		{
			userId: userInsert[0].id,
			courseId: coursesInsert[0].id,
		},
		{
			userId: userInsert[2].id,
			courseId: coursesInsert[1].id,
		},
		{
			userId: userInsert[3].id,
			courseId: coursesInsert[3].id,
		},
	])
}

seed()
