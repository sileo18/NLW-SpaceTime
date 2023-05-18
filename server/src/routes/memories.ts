import { prisma } from "../lib/prisma";
import { z } from 'zod'
import fastify, { FastifyInstance } from "fastify";
import { request } from "http";

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map(memory => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...')
      }
    })

  })

  app.get('/memories/:id', async (request) => {

    // const { id } = request.params

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const memory = prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return memory

  })

  app.post('/memories', async (request) => {    

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),

      //coerce transforma qualquer null, 0, undef, string vazia em false      
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body);


    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: '672d8bb2-d191-40ff-8259-ae0b2d2d3950',
      },
    })

    return memory

  })

  app.put('/memories/:id', async (request) => {

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),

      //coerce transforma qualquer null, 0, undef, string vazia em false      
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

    const memory = await prisma.memory.update({
      where: {
        id,
      },

      data: {
        content,
        coverUrl,
        isPublic,
      }
    })

    return memory

  })

  app.delete('/memories/:id', async (request) => {

const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.memory.delete({
      where: {
        id,
      },
    })

    


  })


}