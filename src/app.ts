import fastify from "fastify"
import { fastifySwagger } from "@fastify/swagger"
import scalarAPIReference from "@scalar/fastify-api-reference"
import {
	validatorCompiler,
	serializerCompiler,
	type ZodTypeProvider,
	jsonSchemaTransform,
} from "fastify-type-provider-zod"
import { createCourseRoute } from "./routes/create-course.ts"
import { getCourseByIdRoute } from "./routes/get-course-by-id.ts"
import { getCoursesRoute } from "./routes/get-courses.ts"
import { deleteCourseRoute } from "./routes/delete-course.ts"

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.register(fastifySwagger, {
	openapi: {
		info: {
			title: "desafio node.js",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
})
server.register(scalarAPIReference, {
	routePrefix: "/docs",
	configuration: {
		theme: "elysiajs",
	},
})

server.register(createCourseRoute)
server.register(getCourseByIdRoute)
server.register(getCoursesRoute)
server.register(deleteCourseRoute)

export { server }
