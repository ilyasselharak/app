import { FastifyReply, FastifyRequest } from "fastify";

export async function getExampleHandler(req: FastifyRequest<{}>, reply: FastifyReply) {
  try {
    // const streets = await getStreetsInCity(query, { translate });

    return reply.code(200).send("ok");
  } catch (e) {
    return reply.code(500).send(e);
  }
}
